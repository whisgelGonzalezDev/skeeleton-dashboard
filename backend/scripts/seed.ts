import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { activityLogs, kpiSnapshots, revenueHistory, users } from '../src/db/schema'
import { ACTIVITY_LOGS, CHARTS, KPIS, USERS } from '../src/demo/demo.fixtures'

const TENANT_ID = 'demo-tenant'

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const db = drizzle(pool)

  console.log('› Cleaning previous demo rows for tenant', TENANT_ID)
  await db.delete(users)
  await db.delete(activityLogs)
  await db.delete(kpiSnapshots)
  await db.delete(revenueHistory)

  console.log('› Seeding users')
  await db.insert(users).values(
    USERS.map((u) => ({
      id: u.id,
      tenantId: TENANT_ID,
      name: u.name,
      email: u.email,
      plan: u.plan,
      status: u.status,
      createdAt: new Date(u.createdAt),
    })),
  )

  console.log('› Seeding activity logs')
  await db.insert(activityLogs).values(ACTIVITY_LOGS.map((l) => ({ ...l, tenantId: TENANT_ID })))

  console.log('› Seeding KPI snapshots')
  await db.insert(kpiSnapshots).values([
    {
      id: 'kpi_mrr',
      tenantId: TENANT_ID,
      metric: 'mrr',
      value: String(KPIS.mrr.value),
      percentageChange: String(KPIS.mrr.percentageChange),
      trend: KPIS.mrr.trend,
    },
    {
      id: 'kpi_active_users',
      tenantId: TENANT_ID,
      metric: 'activeUsers',
      value: String(KPIS.activeUsers.value),
      percentageChange: String(KPIS.activeUsers.percentageChange),
      trend: KPIS.activeUsers.trend,
    },
    {
      id: 'kpi_conversion',
      tenantId: TENANT_ID,
      metric: 'conversionRate',
      value: String(KPIS.conversionRate.value),
      percentageChange: String(KPIS.conversionRate.percentageChange),
      trend: KPIS.conversionRate.trend,
    },
    {
      id: 'kpi_subscriptions',
      tenantId: TENANT_ID,
      metric: 'activeSubscriptions',
      value: String(KPIS.activeSubscriptions.value),
      percentageChange: null,
      trend: null,
    },
  ])

  console.log('› Seeding revenue history')
  await db.insert(revenueHistory).values(
    CHARTS.revenueHistory.map((r, i) => ({
      id: `rev_${i}`,
      tenantId: TENANT_ID,
      month: r.month,
      revenue: r.revenue,
    })),
  )

  console.log('✔ Seed complete')
  await pool.end()
}

main().catch((err) => {
  console.error('✘ Seed failed:', err)
  process.exit(1)
})
