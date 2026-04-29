import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/core/providers/ThemeProvider'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-8 w-8 items-center justify-center rounded text-zinc-500
                 hover:bg-zinc-100 dark:hover:bg-zinc-800
                 hover:text-zinc-700 dark:hover:text-zinc-300
                 transition-colors duration-150"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
