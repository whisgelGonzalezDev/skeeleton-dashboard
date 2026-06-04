import { z } from 'zod'
import {
  ActivityLogSchema,
  ChartsDataSchema,
  DemoUserSchema,
  KpisSchema,
  SystemAlertsSchema,
} from './dto/demo.dto'

export const KPIS = KpisSchema.parse({
  mrr: { value: 14280.5, currency: 'USD', percentageChange: 12.3, trend: 'up' },
  activeUsers: { value: 1240, percentageChange: 8.5, trend: 'up' },
  conversionRate: { value: 3.42, percentageChange: -0.2, trend: 'down' },
  activeSubscriptions: { value: 312, retentionRate: 98.0 },
})

export const USERS = z.array(DemoUserSchema).parse([
  {
    id: 'usr_01',
    name: 'Carlos Mendoza',
    email: 'carlos.m@example.com',
    plan: 'Enterprise',
    status: 'active',
    createdAt: '2026-05-12T14:30:00Z',
  },
  {
    id: 'usr_02',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    plan: 'Pro',
    status: 'active',
    createdAt: '2026-05-18T09:15:00Z',
  },
  {
    id: 'usr_03',
    name: 'Marcus Vance',
    email: 'marcus@example.com',
    plan: 'Starter',
    status: 'pending',
    createdAt: '2026-05-22T18:45:00Z',
  },
  {
    id: 'usr_04',
    name: 'Sofía Vergara',
    email: 'sofia.v@example.com',
    plan: 'Pro',
    status: 'suspended',
    createdAt: '2026-01-05T11:20:00Z',
  },
])

export const ACTIVITY_LOGS = z.array(ActivityLogSchema).parse([
  {
    id: 'log_01',
    timestamp: '2 mins ago',
    user: 'Carlos Mendoza',
    action: 'Updated payment webhook permissions',
    severity: 'info',
  },
  {
    id: 'log_02',
    timestamp: '15 mins ago',
    user: 'System',
    action: 'Blocked login attempt from IP 192.168.1.105 (API Key Failure)',
    severity: 'warning',
  },
  {
    id: 'log_03',
    timestamp: '1 hour ago',
    user: 'CronJob',
    action: 'Automated PostgreSQL database backup completed successfully',
    severity: 'success',
  },
  {
    id: 'log_04',
    timestamp: '3 hours ago',
    user: 'Stripe Integration',
    action: 'New subscription processed: Plan Pro ($49/mo)',
    severity: 'success',
  },
])

export const CHARTS = ChartsDataSchema.parse({
  revenueHistory: [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 11000 },
    { month: 'Apr', revenue: 12400 },
    { month: 'May', revenue: 14280 },
  ],
  planDistribution: [
    { name: 'Starter ($19/mo)', value: 45, color: '#3b82f6' },
    { name: 'Pro ($49/mo)', value: 40, color: '#10b981' },
    { name: 'Enterprise ($199/mo)', value: 15, color: '#8b5cf6' },
  ],
})

export const ALERTS = SystemAlertsSchema.parse({
  success: {
    title: 'Configuration Saved',
    message: 'Environment variables changes will be applied on the next deployment.',
  },
  warning: {
    title: 'Storage Warning',
    message: 'Database log storage has reached 85% of its capacity.',
  },
  error: {
    title: 'Microservice Connection Failure',
    message: 'Error connecting to regions microservice. Retrying in 5 seconds...',
  },
})
