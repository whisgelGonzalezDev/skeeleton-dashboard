import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '@/core/providers/ThemeProvider'
import type { RevenuePoint } from '@/core/utils/mockData'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const { isDark } = useTheme()
  const axis = isDark ? '#71717a' : '#a1a1aa'
  const grid = isDark ? '#27272a' : '#f4f4f5'
  const stroke = isDark ? '#34d399' : '#10b981'

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity={0.25} />
            <stop offset="100%" stopColor={stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={grid} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: axis, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: axis, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) => currency.format(v)}
          width={64}
        />
        <Tooltip
          formatter={(v: number) => [currency.format(v), 'Revenue']}
          contentStyle={{
            background: isDark ? '#18181b' : '#ffffff',
            border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
            borderRadius: 8,
            fontSize: 12,
            color: isDark ? '#fafafa' : '#18181b',
          }}
          cursor={{ stroke: axis, strokeDasharray: '4 4' }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={stroke}
          strokeWidth={2}
          fill="url(#revenueFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
