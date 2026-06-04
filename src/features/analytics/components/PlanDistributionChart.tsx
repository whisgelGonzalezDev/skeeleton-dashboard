import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from '@/core/providers/ThemeProvider'
import type { PlanSlice } from '@/core/utils/mockData'

export function PlanDistributionChart({ data }: { data: PlanSlice[] }) {
  const { isDark } = useTheme()

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <ResponsiveContainer width="100%" height={200} className="max-w-[200px]">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number, name: string) => [`${v}%`, name]}
            contentStyle={{
              background: isDark ? '#18181b' : '#ffffff',
              border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
              borderRadius: 8,
              fontSize: 12,
              color: isDark ? '#fafafa' : '#18181b',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <ul className="w-full space-y-2">
        {data.map((slice) => (
          <li key={slice.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-zinc-600 dark:text-zinc-300">{slice.name}</span>
            <span className="ml-auto font-medium text-zinc-900 dark:text-white">
              {slice.value}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
