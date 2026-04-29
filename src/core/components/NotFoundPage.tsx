import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center space-y-3">
        <p className="text-7xl font-semibold tracking-tight text-zinc-200 dark:text-zinc-800 select-none">
          404
        </p>
        <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {t('errors.notFound')}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t('errors.notFoundSubtitle')}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 inline-block text-sm font-medium text-zinc-600 dark:text-zinc-400
                     underline underline-offset-2
                     hover:text-zinc-900 dark:hover:text-zinc-100
                     transition-colors"
        >
          {t('errors.goBack')}
        </button>
      </div>
    </div>
  )
}
