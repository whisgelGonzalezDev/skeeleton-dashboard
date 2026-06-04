import { useState, useCallback } from 'react'
import { DEMO_CREDENTIALS } from '@/core/utils/mockData'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'viewer'
}

const SESSION_KEY = 'skeeleton_session'

/**
 * Demo accounts, keyed by email. Credentials come from the single source of
 * truth in `mockData.ts`. Replace this lookup with a real API call (see
 * SKEELETON.md) when wiring a backend.
 */
const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  [DEMO_CREDENTIALS.admin.email]: {
    password: DEMO_CREDENTIALS.admin.password,
    user: {
      id: '1',
      name: 'Admin User',
      email: DEMO_CREDENTIALS.admin.email,
      role: 'admin',
    },
  },
  [DEMO_CREDENTIALS.viewer.email]: {
    password: DEMO_CREDENTIALS.viewer.password,
    user: {
      id: '2',
      name: 'Analyst User',
      email: DEMO_CREDENTIALS.viewer.email,
      role: 'viewer',
    },
  },
}

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function simulateApi(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    await simulateApi()

    const account = DEMO_ACCOUNTS[email.trim().toLowerCase()]
    if (account && account.password === password) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(account.user))
      setUser(account.user)
      return
    }

    throw new Error('invalid_credentials')
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  return { user, login, logout, isAuthenticated: user !== null }
}
