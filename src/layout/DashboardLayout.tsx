import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Home,
  BarChart2,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  PanelLeft,
  X,
} from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useNotify } from '@/core/hooks/useNotify'
import { LanguageSelector } from '@/core/components'
import { ThemeToggle } from '@/core/components/ThemeToggle'

interface NavItem {
  to: string
  labelKey: string
  icon: React.ElementType
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', labelKey: 'nav.home', icon: Home },
  { to: '/analytics', labelKey: 'nav.analytics', icon: BarChart2 },
  { to: '/sales', labelKey: 'nav.sales', icon: ShoppingCart },
  { to: '/users', labelKey: 'nav.users', icon: Users },
  { to: '/settings', labelKey: 'nav.settings', icon: Settings },
]

const NAV_LINK_BASE =
  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-100'

const NAV_LINK_ACTIVE = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'

const NAV_LINK_INACTIVE =
  'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'

export function DashboardLayout() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const notify = useNotify()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    notify.info('common.logoutSuccess')
    navigate('/auth/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside
        className={[
          'flex flex-col border-r border-zinc-200 dark:border-zinc-800',
          'bg-white dark:bg-zinc-900',
          'transition-all duration-200',
          collapsed ? 'w-16' : 'w-60',
        ].join(' ')}
      >
        {/* Sidebar header */}
        <div className="flex h-14 items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-4">
          {!collapsed && (
            <span className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight truncate">
              skeeleton<span className="text-zinc-400">-base</span>
            </span>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex h-7 w-7 items-center justify-center rounded
                       text-zinc-400 dark:text-zinc-500
                       hover:bg-zinc-100 dark:hover:bg-zinc-800
                       hover:text-zinc-700 dark:hover:text-zinc-300
                       transition-colors ml-auto"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeft size={16} /> : <X size={16} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {NAV_ITEMS.map(({ to, labelKey, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [NAV_LINK_BASE, isActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE].join(' ')
              }
              title={collapsed ? t(labelKey) : undefined}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span className="truncate">{t(labelKey)}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 p-2">
          {!collapsed && user && (
            <div className="px-3 py-2 mb-1">
              <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={[
              NAV_LINK_BASE,
              'w-full text-zinc-500 dark:text-zinc-400',
              'hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400',
            ].join(' ')}
            title={collapsed ? t('nav.logout') : undefined}
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>{t('nav.logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6">
          {user ? (
            <span className="text-sm font-medium text-zinc-900 dark:text-white">{user.name}</span>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
