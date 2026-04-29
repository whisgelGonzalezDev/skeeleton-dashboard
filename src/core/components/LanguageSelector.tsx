import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'
import { SUPPORTED_LANGUAGES, type SupportedLocale } from '@/core/i18n/config'

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ??
    SUPPORTED_LANGUAGES[0]

  const handleSelect = (code: SupportedLocale) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded px-2 py-1.5
                   text-zinc-500 dark:text-zinc-400
                   hover:bg-zinc-100 dark:hover:bg-zinc-800
                   hover:text-zinc-700 dark:hover:text-zinc-200
                   transition-colors duration-150
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
      >
        <Globe size={16} className="shrink-0" />
        <span className="text-xs font-medium tracking-wide">
          {current.code.toUpperCase()}
        </span>
        <ChevronDown
          size={12}
          className={`shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-1 w-44 rounded-lg py-1 z-50
                     border border-zinc-200 dark:border-zinc-800
                     bg-white dark:bg-zinc-900
                     shadow-card"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === current.code}
              onClick={() => handleSelect(lang.code)}
              className={[
                'flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-100',
                lang.code === current.code
                  ? 'bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100',
              ].join(' ')}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === current.code && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
