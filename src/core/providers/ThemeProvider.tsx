import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Toaster } from 'sonner'

type Theme = 'light' | 'dark'

const THEME_KEY = 'skeeleton_theme'

interface ThemeCtx {
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeCtx>({ isDark: false, toggle: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

function resolveTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(resolveTheme)

  // Keep a ref in sync so toggle never captures a stale value
  const themeRef = useRef(theme)
  themeRef.current = theme

  // Sync DOM on mount (handles the case where the FOUC script already did it)
  useEffect(() => {
    applyTheme(theme)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Apply DOM change immediately on every theme change after mount
  const toggle = useCallback(() => {
    const next: Theme = themeRef.current === 'dark' ? 'light' : 'dark'
    applyTheme(next)                        // immediate — no waiting for useEffect
    localStorage.setItem(THEME_KEY, next)   // persist immediately
    setTheme(next)                          // schedule React re-render
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark: theme === 'dark', toggle }}>
      {children}
      <Toaster position="bottom-right" theme={theme} richColors closeButton />
    </ThemeContext.Provider>
  )
}
