import {
  createBrowserRouter,
  type RouteObject,
} from 'react-router-dom'
import { DashboardLayout } from '@/layout/DashboardLayout'
import { LoginPage } from '@/features/auth/LoginPage'
import { SalesDashboardPage } from '@/features/sales/SalesDashboardPage'
import { UsersPage } from '@/features/users/UsersPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ErrorBoundary } from '@/core/components'
import { NotFoundPage } from '@/core/components'

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
      <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">{title}</p>
      <p className="text-xs text-zinc-300 dark:text-zinc-600">Feature coming soon</p>
    </div>
  )
}

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Placeholder title="Home" />,
  },
  {
    path: '/analytics',
    element: <Placeholder title="Analytics" />,
  },
  {
    path: '/sales',
    element: (
      <ErrorBoundary>
        <SalesDashboardPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '/users',
    element: (
      <ErrorBoundary>
        <UsersPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '/settings',
    element: <Placeholder title="Settings" />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: protectedRoutes,
  },
])
