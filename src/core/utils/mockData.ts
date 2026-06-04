import type { ElementType } from 'react'
import { DollarSign, ShoppingCart, Users, Percent } from 'lucide-react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

export interface SaleStat {
  labelKey: string
  value: string
  change: number
  icon: ElementType
}

export interface ActivityItem {
  id: number
  event: string
  time: string
  badge: BadgeVariant
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'admin' | 'viewer'
  avatarInitials: string
}

export interface DashboardMetrics {
  period: string
  totalRevenue: number
  totalOrders: number
  newCustomers: number
  conversionRate: number
}

export interface SalesDashboardData {
  stats: SaleStat[]
  activity: ActivityItem[]
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: '1',
  name: 'Admin User',
  email: 'admin@skeeleton.dev',
  role: 'admin',
  avatarInitials: 'AU',
}

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  period: 'April 2026',
  totalRevenue: 148320,
  totalOrders: 3842,
  newCustomers: 621,
  conversionRate: 4.7,
}

export const MOCK_SALES_STATS: SaleStat[] = [
  { labelKey: 'sales.totalRevenue', value: '$148,320', change: 12.4, icon: DollarSign },
  { labelKey: 'sales.totalOrders', value: '3,842', change: 8.1, icon: ShoppingCart },
  { labelKey: 'sales.newCustomers', value: '621', change: -3.2, icon: Users },
  { labelKey: 'sales.conversionRate', value: '4.7%', change: 0.5, icon: Percent },
]

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 1, event: 'Order #10421 placed', time: '2 min ago', badge: 'success' },
  { id: 2, event: 'Refund issued for #10398', time: '18 min ago', badge: 'warning' },
  { id: 3, event: 'New customer: Sarah M.', time: '41 min ago', badge: 'info' },
  { id: 4, event: 'Order #10420 shipped', time: '1 hr ago', badge: 'success' },
  { id: 5, event: 'Order #10415 cancelled', time: '3 hr ago', badge: 'danger' },
]

export function simulateApiDelay<T>(data: T): Promise<T> {
  const delay = Math.random() * 1000 + 500
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

export type UserRole = 'Admin' | 'Editor' | 'Viewer'
export type UserStatus = 'Active' | 'Inactive'

export interface MockUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastActive: string
}

export type DemoPlan = 'Starter' | 'Pro' | 'Enterprise'
export type DemoStatus = 'active' | 'pending' | 'suspended'

// Plan → role and status mapping used to fit the prompt dataset
// into the existing UserTable schema without breaking its contract.
const PLAN_TO_ROLE: Record<DemoPlan, UserRole> = {
  Enterprise: 'Admin',
  Pro: 'Editor',
  Starter: 'Viewer',
}

function statusToInternal(s: DemoStatus): UserStatus {
  return s === 'active' ? 'Active' : 'Inactive'
}

function isoToShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface DemoUserRow {
  id: string
  name: string
  email: string
  plan: DemoPlan
  status: DemoStatus
  createdAt: string
}

// Source of truth from the demo dataset (PART 2 of the master prompt).
// Kept in this shape so backend payloads can be mapped without a second copy.
export const DEMO_USERS_RAW: DemoUserRow[] = [
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
]

export const MOCK_USERS: MockUser[] = DEMO_USERS_RAW.map((u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: PLAN_TO_ROLE[u.plan],
  status: statusToInternal(u.status),
  lastActive: isoToShortDate(u.createdAt),
}))

// ---------------------------------------------------------------------------
// Demo credentials, KPIs, activity, charts and system alerts
// (mirror of backend fixtures so the frontend can render without the API up).
// ---------------------------------------------------------------------------

export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@skeeleton.dev',
    password: 'skeeleton2026',
    role: 'SuperAdmin' as const,
    permissions: ['all'] as const,
  },
  viewer: {
    email: 'analyst@skeeleton.dev',
    password: 'readOnly2026',
    role: 'Viewer' as const,
    permissions: ['read:dashboard', 'read:reports'] as const,
  },
}

export type KpiTrend = 'up' | 'down' | 'flat'

export interface DemoKpis {
  mrr: { value: number; currency: string; percentageChange: number; trend: KpiTrend }
  activeUsers: { value: number; percentageChange: number; trend: KpiTrend }
  conversionRate: { value: number; percentageChange: number; trend: KpiTrend }
  activeSubscriptions: { value: number; retentionRate: number }
}

export const MOCK_KPIS: DemoKpis = {
  mrr: { value: 14280.5, currency: 'USD', percentageChange: 12.3, trend: 'up' },
  activeUsers: { value: 1240, percentageChange: 8.5, trend: 'up' },
  conversionRate: { value: 3.42, percentageChange: -0.2, trend: 'down' },
  activeSubscriptions: { value: 312, retentionRate: 98.0 },
}

export type LogSeverity = 'info' | 'warning' | 'success' | 'error'

export interface DemoActivityLog {
  id: string
  timestamp: string
  user: string
  action: string
  severity: LogSeverity
}

export const MOCK_ACTIVITY_LOGS: DemoActivityLog[] = [
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
]

export interface RevenuePoint {
  month: string
  revenue: number
}
export interface PlanSlice {
  name: string
  value: number
  color: string
}

export const MOCK_CHARTS: { revenueHistory: RevenuePoint[]; planDistribution: PlanSlice[] } = {
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
}

export interface SystemAlert {
  title: string
  message: string
}

export const MOCK_SYSTEM_ALERTS: {
  success: SystemAlert
  warning: SystemAlert
  error: SystemAlert
} = {
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
}
