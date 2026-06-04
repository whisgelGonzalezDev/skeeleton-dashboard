import { useTranslation } from 'react-i18next'
import { TrendingUp, TrendingDown, DollarSign, Users, Percent, CreditCard } from 'lucide-react'
import { Card, CardSkeleton, Badge } from '@/core/components'
import type { BadgeVariant, DemoActivityLog, LogSeverity } from '@/core/utils/mockData'
import { useAnalytics } from './api/getAnalytics'
import { RevenueChart } from './components/RevenueChart'
import { PlanDistributionChart } from './components/PlanDistributionChart'

const SEVERITY_VARIANT: Record<LogSeverity, BadgeVariant> = {
  info: 'info',
  warning: 'warning',
  success: 'success',
  error: 'danger',
}

const compact = new Intl.NumberFormat('en-US')
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function AnalyticsPage() {
  const { t } = useTranslation()
  const { data, isPending } = useAnalytics()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {t('analytics.title')}
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-300">{t('analytics.subtitle')}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isPending || !data ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <KpiCard
              label={t('analytics.mrr')}
              value={currency.format(data.kpis.mrr.value)}
              change={data.kpis.mrr.percentageChange}
              icon={DollarSign}
              vsLabel={t('analytics.vsLastMonth')}
            />
            <KpiCard
              label={t('analytics.activeUsers')}
              value={compact.format(data.kpis.activeUsers.value)}
              change={data.kpis.activeUsers.percentageChange}
              icon={Users}
              vsLabel={t('analytics.vsLastMonth')}
            />
            <KpiCard
              label={t('analytics.conversionRate')}
              value={`${data.kpis.conversionRate.value}%`}
              change={data.kpis.conversionRate.percentageChange}
              icon={Percent}
              vsLabel={t('analytics.vsLastMonth')}
            />
            <KpiCard
              label={t('analytics.activeSubscriptions')}
              value={compact.format(data.kpis.activeSubscriptions.value)}
              icon={CreditCard}
              footer={`${data.kpis.activeSubscriptions.retentionRate}% ${t('analytics.retention')}`}
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card padding="none" className="lg:col-span-2">
          <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t('analytics.revenueTrend')}
            </h2>
          </div>
          <div className="p-5">
            {isPending || !data ? (
              <div className="h-[260px] rounded skeleton-shimmer" />
            ) : (
              <RevenueChart data={data.revenueHistory} />
            )}
          </div>
        </Card>

        <Card padding="none">
          <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t('analytics.planDistribution')}
            </h2>
          </div>
          <div className="p-5">
            {isPending || !data ? (
              <div className="h-[200px] rounded skeleton-shimmer" />
            ) : (
              <PlanDistributionChart data={data.planDistribution} />
            )}
          </div>
        </Card>
      </div>

      {/* Activity log */}
      <Card padding="none">
        <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
            {t('analytics.activityLog')}
          </h2>
        </div>
        {isPending || !data ? (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className="h-3 w-3/5 rounded skeleton-shimmer" />
                <div className="ml-auto h-3 w-16 rounded skeleton-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {data.logs.map((log) => (
              <LogRow key={log.id} log={log} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

function KpiCard({
  label,
  value,
  change,
  icon: Icon,
  vsLabel,
  footer,
}: {
  label: string
  value: string
  change?: number
  icon: React.ElementType
  vsLabel?: string
  footer?: string
}) {
  const positive = (change ?? 0) >= 0
  const TrendIcon = positive ? TrendingUp : TrendingDown

  return (
    <Card>
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500">
          <Icon size={16} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-1.5">
        {change !== undefined ? (
          <>
            <TrendIcon size={12} className={positive ? 'text-emerald-500' : 'text-red-500'} />
            <span
              className={`text-xs font-medium ${positive ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300'}`}
            >
              {positive ? '+' : ''}
              {change}%
            </span>
            {vsLabel && <span className="text-xs text-zinc-400 dark:text-zinc-500">{vsLabel}</span>}
          </>
        ) : (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">{footer}</span>
        )}
      </div>
    </Card>
  )
}

function LogRow({ log }: { log: DemoActivityLog }) {
  return (
    <li className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
      <div className="flex min-w-0 items-center gap-3">
        <Badge variant={SEVERITY_VARIANT[log.severity]} className="capitalize">
          {log.severity}
        </Badge>
        <div className="min-w-0">
          <p className="truncate text-sm text-zinc-700 dark:text-zinc-300">{log.action}</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">{log.user}</p>
        </div>
      </div>
      <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-500">{log.timestamp}</span>
    </li>
  )
}
