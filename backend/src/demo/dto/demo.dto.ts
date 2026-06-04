import { z } from 'zod'

export const UserStatusSchema = z.enum(['active', 'pending', 'suspended'])
export const PlanSchema = z.enum(['Starter', 'Pro', 'Enterprise'])

export const DemoUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  plan: PlanSchema,
  status: UserStatusSchema,
  createdAt: z.string().datetime(),
})
export type DemoUser = z.infer<typeof DemoUserSchema>

export const KpiTrendSchema = z.enum(['up', 'down', 'flat'])

export const KpisSchema = z.object({
  mrr: z.object({
    value: z.number(),
    currency: z.string(),
    percentageChange: z.number(),
    trend: KpiTrendSchema,
  }),
  activeUsers: z.object({
    value: z.number().int(),
    percentageChange: z.number(),
    trend: KpiTrendSchema,
  }),
  conversionRate: z.object({
    value: z.number(),
    percentageChange: z.number(),
    trend: KpiTrendSchema,
  }),
  activeSubscriptions: z.object({
    value: z.number().int(),
    retentionRate: z.number(),
  }),
})

export const ActivityLogSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  user: z.string(),
  action: z.string(),
  severity: z.enum(['info', 'warning', 'success', 'error']),
})

export const ChartsDataSchema = z.object({
  revenueHistory: z.array(z.object({ month: z.string(), revenue: z.number() })),
  planDistribution: z.array(z.object({ name: z.string(), value: z.number(), color: z.string() })),
})

export const SystemAlertsSchema = z.object({
  success: z.object({ title: z.string(), message: z.string() }),
  warning: z.object({ title: z.string(), message: z.string() }),
  error: z.object({ title: z.string(), message: z.string() }),
})
