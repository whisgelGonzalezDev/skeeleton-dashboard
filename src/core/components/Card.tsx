import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-lg border border-zinc-200 dark:border-zinc-800',
        'bg-white dark:bg-zinc-900',
        'shadow-card',
        paddingClasses[padding],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={[
        'rounded-lg border border-zinc-200 dark:border-zinc-800',
        'bg-white dark:bg-zinc-900',
        'shadow-card p-5',
        className,
      ].join(' ')}
    >
      <div className="space-y-3">
        <div className="h-3 w-1/3 rounded skeleton-shimmer" />
        <div className="h-7 w-1/2 rounded skeleton-shimmer" />
        <div className="h-3 w-2/3 rounded skeleton-shimmer" />
      </div>
    </div>
  )
}
