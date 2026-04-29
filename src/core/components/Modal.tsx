import { type ReactNode, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

function ModalRoot({ open, onClose, children, size = 'md' }: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [open, handleEsc])

  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className={[
          'relative w-full rounded-lg',
          'border border-zinc-200 dark:border-zinc-800',
          'bg-white dark:bg-zinc-900',
          'shadow-lg',
          SIZE_CLASSES[size],
        ].join(' ')}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

function ModalHeader({
  children,
  onClose,
}: {
  children: ReactNode
  onClose?: () => void
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-5 py-4">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{children}</h2>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="flex h-6 w-6 items-center justify-center rounded text-zinc-400
                     hover:bg-zinc-100 dark:hover:bg-zinc-800
                     hover:text-zinc-700 dark:hover:text-zinc-300
                     transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

function ModalBody({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-4 text-sm text-zinc-600 dark:text-zinc-300">{children}</div>
  )
}

function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 px-5 py-4">
      {children}
    </div>
  )
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
})
