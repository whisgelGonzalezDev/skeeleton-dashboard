import { Injectable, NotFoundException } from '@nestjs/common'
import { ACTIVITY_LOGS, ALERTS, CHARTS, KPIS, USERS } from './demo.fixtures'

function simulateLatency<T>(payload: T, min = 250, max = 900): Promise<T> {
  const delay = Math.floor(Math.random() * (max - min) + min)
  return new Promise((resolve) => setTimeout(() => resolve(payload), delay))
}

@Injectable()
export class DemoService {
  getKpis() {
    return simulateLatency(KPIS)
  }

  getUsers(filters?: { status?: string; plan?: string }) {
    const list = USERS.filter((u) => {
      if (filters?.status && u.status !== filters.status) return false
      if (filters?.plan && u.plan !== filters.plan) return false
      return true
    })
    return simulateLatency(list)
  }

  async getUserById(id: string) {
    const user = USERS.find((u) => u.id === id)
    if (!user) throw new NotFoundException(`User ${id} not found`)
    return simulateLatency(user)
  }

  getActivityLogs() {
    return simulateLatency(ACTIVITY_LOGS)
  }

  getCharts() {
    return simulateLatency(CHARTS)
  }

  getAlerts() {
    return simulateLatency(ALERTS)
  }
}
