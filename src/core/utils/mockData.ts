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
  email: 'admin@skeeleton.com',
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

export const MOCK_USERS: MockUser[] = [
  { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Alice Johnson',   email: 'alice.johnson@skeeleton.com',   role: 'Admin',  status: 'Active',   lastActive: 'Apr 27, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Bob Martínez',    email: 'bob.martinez@skeeleton.com',    role: 'Editor', status: 'Active',   lastActive: 'Apr 26, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Carol Smith',     email: 'carol.smith@skeeleton.com',     role: 'Viewer', status: 'Inactive', lastActive: 'Mar 15, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440004', name: 'David Chen',      email: 'david.chen@skeeleton.com',      role: 'Editor', status: 'Active',   lastActive: 'Apr 25, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440005', name: 'Emma Wilson',     email: 'emma.wilson@skeeleton.com',     role: 'Viewer', status: 'Active',   lastActive: 'Apr 24, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440006', name: 'Frank García',    email: 'frank.garcia@skeeleton.com',    role: 'Admin',  status: 'Active',   lastActive: 'Apr 27, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440007', name: 'Grace Lee',       email: 'grace.lee@skeeleton.com',       role: 'Editor', status: 'Inactive', lastActive: 'Feb 28, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440008', name: 'Henry Brown',     email: 'henry.brown@skeeleton.com',     role: 'Viewer', status: 'Active',   lastActive: 'Apr 22, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440009', name: 'Isabella Davis',  email: 'isabella.davis@skeeleton.com',  role: 'Viewer', status: 'Inactive', lastActive: 'Jan 10, 2026' },
  { id: '550e8400-e29b-41d4-a716-446655440010', name: 'James Taylor',    email: 'james.taylor@skeeleton.com',    role: 'Editor', status: 'Active',   lastActive: 'Apr 23, 2026' },
]
