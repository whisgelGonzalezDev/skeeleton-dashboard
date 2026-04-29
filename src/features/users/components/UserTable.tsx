import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { useUsers } from '../api/getUsers'
import type { UserRole, UserStatus } from '@/core/utils/mockData'

const ROLES: UserRole[] = ['Admin', 'Editor', 'Viewer']

const ROLE_STYLES: Record<UserRole, string> = {
  Admin:  'text-amber-700 bg-amber-50 border border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-900',
  Editor: 'text-sky-700 bg-sky-50 border border-sky-200 dark:text-sky-400 dark:bg-sky-950 dark:border-sky-900',
  Viewer: 'text-zinc-600 bg-zinc-100 border border-zinc-200 dark:text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700',
}

function StatusDot({ status }: { status: UserStatus }) {
  const active = status === 'Active'
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
      <span className={`text-xs font-medium ${active ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
        {status}
      </span>
    </span>
  )
}

function SkeletonRow() {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800">
      {[55, 70, 30, 25, 40].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className="h-3.5 rounded skeleton-shimmer"
            style={{ width: `${w}%` }}
          />
        </td>
      ))}
    </tr>
  )
}

const COL_KEYS = ['name', 'email', 'role', 'status', 'lastActive'] as const

export function UserTable() {
  const { t } = useTranslation()
  const { data: users, isPending } = useUsers()

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('')

  const filtered = useMemo(() => {
    if (!users) return []
    const term = search.toLowerCase()
    return users.filter((u) => {
      const matchText = u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
      const matchRole = roleFilter === '' || u.role === roleFilter
      return matchText && matchRole
    })
  }, [users, search, roleFilter])

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('users.searchPlaceholder')}
            className="w-full rounded border border-zinc-200 dark:border-zinc-700
                       bg-white dark:bg-zinc-900
                       pl-8 pr-3 py-2 text-sm
                       text-zinc-900 dark:text-zinc-100
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                       focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20
                       focus:border-zinc-400 dark:focus:border-zinc-500
                       transition-shadow duration-150"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | '')}
          className="rounded border border-zinc-200 dark:border-zinc-700
                     bg-white dark:bg-zinc-900
                     px-3 py-2 text-sm
                     text-zinc-700 dark:text-zinc-300
                     focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20
                     focus:border-zinc-400 dark:focus:border-zinc-500
                     transition-shadow duration-150 sm:w-44"
        >
          <option value="">{t('users.allRoles')}</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60">
                {COL_KEYS.map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                  >
                    {t(`users.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-400 dark:text-zinc-500">
                    {t('users.noResults')}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-zinc-100 dark:border-zinc-800 last:border-0
                               hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40
                               transition-colors duration-100"
                  >
                    <td className="px-4 py-3.5 font-medium text-zinc-900 dark:text-zinc-100">{user.name}</td>
                    <td className="px-4 py-3.5 text-zinc-500 dark:text-zinc-400">{user.email}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${ROLE_STYLES[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusDot status={user.status} />
                    </td>
                    <td className="px-4 py-3.5 text-zinc-500 dark:text-zinc-400">{user.lastActive}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
