import { useTranslation } from 'react-i18next'
import { UserTable } from './components/UserTable'

export function UsersPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">{t('users.title')}</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-300">{t('users.subtitle')}</p>
      </div>
      <UserTable />
    </div>
  )
}
