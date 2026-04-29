import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from './hooks/useAuth'
import { useNotify } from '@/core/hooks/useNotify'
import { Button } from '@/core/components'
import { LanguageSelector } from '@/core/components'
import { ThemeToggle } from '@/core/components/ThemeToggle'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const notify = useNotify()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const from = (location.state as { from?: string })?.from ?? '/sales'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      notify.success('common.loginSuccess')
      navigate(from, { replace: true })
    } catch {
      setError(t('auth.invalidCredentials'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Top bar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
          skeeleton<span className="text-zinc-400">-base</span>
        </span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </header>

      {/* Form */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {t('auth.title')}
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{t('auth.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                className="w-full rounded border border-zinc-200 dark:border-zinc-700
                           bg-white dark:bg-zinc-900
                           px-3 py-2 text-sm
                           text-zinc-900 dark:text-zinc-100
                           placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                           focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20
                           focus:border-zinc-400 dark:focus:border-zinc-500
                           transition-shadow duration-150"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                {t('auth.password')}
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                className="w-full rounded border border-zinc-200 dark:border-zinc-700
                           bg-white dark:bg-zinc-900
                           px-3 py-2 text-sm
                           text-zinc-900 dark:text-zinc-100
                           placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                           focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20
                           focus:border-zinc-400 dark:focus:border-zinc-500
                           transition-shadow duration-150"
              />
            </div>

            {error && (
              <p className="rounded bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900 px-3 py-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              {t('auth.signIn')}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
            Demo: admin@skeeleton.com / password123
          </p>
        </div>
      </main>
    </div>
  )
}
