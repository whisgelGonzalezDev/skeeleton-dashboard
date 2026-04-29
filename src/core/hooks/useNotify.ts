import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useNotify() {
  const { t } = useTranslation()

  const success = useCallback((key: string) => toast.success(t(key)), [t])
  const error = useCallback((key: string) => toast.error(t(key)), [t])
  const info = useCallback((key: string) => toast.info(t(key)), [t])

  return { success, error, info }
}
