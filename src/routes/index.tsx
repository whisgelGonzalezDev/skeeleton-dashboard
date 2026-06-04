/* eslint-disable react-refresh/only-export-components -- route module exports the router config alongside helpers by design */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { DashboardLayout } from '@/layout/DashboardLayout'
import { LoginPage } from '@/features/auth/LoginPage'
import { SalesDashboardPage } from '@/features/sales/SalesDashboardPage'
import { UsersPage } from '@/features/users/UsersPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ErrorBoundary } from '@/core/components'
import { NotFoundPage } from '@/core/components'

// Lazy-loaded so the charting library (recharts) ships in its own chunk and
// only downloads when the user opens the analytics view.
const AnalyticsPage = lazy(() =>
  import('@/features/analytics/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })),
)

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
      <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">{title}</p>
      <p className="text-xs text-zinc-300 dark:text-zinc-600">Feature coming soon</p>
    </div>
  )
}

function RouteFallback() {
  return (
    <div className="flex h-64 items-center justify-center">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
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
    element: (
      <ErrorBoundary>
        <Suspense fallback={<RouteFallback />}>
          <AnalyticsPage />
        </Suspense>
      </ErrorBoundary>
    ),
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
