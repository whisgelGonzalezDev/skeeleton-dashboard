import { useState, useCallback } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'viewer'
}

const SESSION_KEY = 'skeeleton_session'
const MOCK_EMAIL = 'admin@skeeleton.com'
const MOCK_PASSWORD = 'password123'

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

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const mockUser: AuthUser = {
        id: '1',
        name: 'Admin User',
        email,
        role: 'admin',
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(mockUser))
      setUser(mockUser)
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
