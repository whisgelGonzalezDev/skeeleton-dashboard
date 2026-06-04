import { useQuery } from '@tanstack/react-query'
import {
  simulateApiDelay,
  MOCK_KPIS,
  MOCK_CHARTS,
  MOCK_ACTIVITY_LOGS,
  type DemoKpis,
  type DemoActivityLog,
  type RevenuePoint,
  type PlanSlice,
} from '@/core/utils/mockData'

export interface AnalyticsData {
  kpis: DemoKpis
  revenueHistory: RevenuePoint[]
  planDistribution: PlanSlice[]
  logs: DemoActivityLog[]
}

function fetchAnalytics(): Promise<AnalyticsData> {
  return simulateApiDelay({
    kpis: MOCK_KPIS,
    revenueHistory: MOCK_CHARTS.revenueHistory,
    planDistribution: MOCK_CHARTS.planDistribution,
    logs: MOCK_ACTIVITY_LOGS,
  })
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  })
}
