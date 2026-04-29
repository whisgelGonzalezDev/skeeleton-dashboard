import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

function ErrorFallback({
  error,
  onReset,
}: {
  error: Error | null
  onReset: () => void
}) {
  const { t } = useTranslation()

  return (
    <div
      className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg
                 border border-zinc-200 dark:border-zinc-800
                 bg-white dark:bg-zinc-900 p-8 text-center"
    >
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {t('errors.somethingWentWrong')}
      </p>
      {error?.message && (
        <p className="max-w-sm text-xs text-zinc-400 dark:text-zinc-500 font-mono">
          {error.message}
        </p>
      )}
      <button
        onClick={onReset}
        className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400
                   underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100
                   transition-colors"
      >
        {t('errors.tryAgain')}
      </button>
    </div>
  )
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorFallback
            error={this.state.error}
            onReset={() => this.setState({ hasError: false, error: null })}
          />
        )
      )
    }
    return this.props.children
  }
}
