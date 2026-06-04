import { pgTable, varchar, timestamp, numeric, integer, text, index } from 'drizzle-orm/pg-core'

const tenantColumn = () => varchar('tenant_id', { length: 64 }).notNull()

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 64 }).primaryKey(),
    tenantId: tenantColumn(),
    name: varchar('name', { length: 200 }).notNull(),
    email: varchar('email', { length: 320 }).notNull(),
    plan: varchar('plan', { length: 32 }).notNull(),
    status: varchar('status', { length: 32 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    tenantIdx: index('users_tenant_idx').on(t.tenantId),
    tenantEmailIdx: index('users_tenant_email_idx').on(t.tenantId, t.email),
  }),
)

export const activityLogs = pgTable(
  'activity_logs',
  {
    id: varchar('id', { length: 64 }).primaryKey(),
    tenantId: tenantColumn(),
    timestamp: varchar('timestamp', { length: 64 }).notNull(),
    user: varchar('user', { length: 200 }).notNull(),
    action: text('action').notNull(),
    severity: varchar('severity', { length: 16 }).notNull(),
  },
  (t) => ({ tenantIdx: index('logs_tenant_idx').on(t.tenantId) }),
)

export const kpiSnapshots = pgTable(
  'kpi_snapshots',
  {
    id: varchar('id', { length: 64 }).primaryKey(),
    tenantId: tenantColumn(),
    metric: varchar('metric', { length: 64 }).notNull(),
    value: numeric('value', { precision: 18, scale: 4 }).notNull(),
    percentageChange: numeric('percentage_change', { precision: 6, scale: 2 }),
    trend: varchar('trend', { length: 8 }),
    capturedAt: timestamp('captured_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ tenantIdx: index('kpi_tenant_idx').on(t.tenantId) }),
)

export const revenueHistory = pgTable('revenue_history', {
  id: varchar('id', { length: 64 }).primaryKey(),
  tenantId: tenantColumn(),
  month: varchar('month', { length: 16 }).notNull(),
  revenue: integer('revenue').notNull(),
})
