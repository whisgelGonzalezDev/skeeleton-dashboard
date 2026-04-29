import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardSkeleton, Badge } from '@/core/components'
import {
  simulateApiDelay,
  MOCK_SALES_STATS,
  MOCK_ACTIVITY,
  type SaleStat,
  type SalesDashboardData,
} from '@/core/utils/mockData'

function fetchSalesDashboard(): Promise<SalesDashboardData> {
  return simulateApiDelay({ stats: MOCK_SALES_STATS, activity: MOCK_ACTIVITY })
}

export function SalesDashboardPage() {
  const { t } = useTranslation()
  const { data, isPending } = useQuery({
    queryKey: ['sales', 'dashboard'],
    queryFn: fetchSalesDashboard,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">{t('sales.title')}</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-300">{t('sales.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : data?.stats.map((stat) => (
              <StatCard key={stat.labelKey} stat={stat} vsLabel={t('sales.vsLastMonth')} />
            ))}
      </div>

      <Card padding="none">
        <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">{t('sales.recentActivity')}</h2>
        </div>

        {isPending ? (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className="h-3 w-2/5 rounded skeleton-shimmer" />
                <div className="ml-auto h-3 w-14 rounded skeleton-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {data?.activity.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={item.badge} />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.event}</span>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{item.time}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

function StatCard({ stat, vsLabel }: { stat: SaleStat; vsLabel: string }) {
  const { t } = useTranslation()
  const positive = stat.change >= 0
  const Icon = stat.icon
  const TrendIcon = positive ? TrendingUp : TrendingDown

  return (
    <Card>
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t(stat.labelKey)}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500">
          <Icon size={16} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{stat.value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        <TrendIcon size={12} className={positive ? 'text-emerald-500' : 'text-red-500'} />
        <span className={`text-xs font-medium ${positive ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300'}`}>
          {positive ? '+' : ''}
          {stat.change}%
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{vsLabel}</span>
      </div>
    </Card>
  )
}
