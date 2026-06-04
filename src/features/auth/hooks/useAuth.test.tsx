import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'
import { DEMO_CREDENTIALS } from '@/core/utils/mockData'

describe('useAuth', () => {
  it('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('logs in with valid admin credentials', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login(DEMO_CREDENTIALS.admin.email, DEMO_CREDENTIALS.admin.password)
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user?.role).toBe('admin')
    expect(result.current.user?.email).toBe(DEMO_CREDENTIALS.admin.email)
  })

  it('logs in the viewer account with the viewer role', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login(DEMO_CREDENTIALS.viewer.email, DEMO_CREDENTIALS.viewer.password)
    })

    expect(result.current.user?.role).toBe('viewer')
  })

  it('rejects invalid credentials', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await expect(
        result.current.login(DEMO_CREDENTIALS.admin.email, 'wrong-password'),
      ).rejects.toThrow('invalid_credentials')
    })

    expect(result.current.isAuthenticated).toBe(false)
  })

  it('restores an existing session from localStorage', () => {
    localStorage.setItem(
      'skeeleton_session',
      JSON.stringify({
        id: '1',
        name: 'Admin User',
        email: DEMO_CREDENTIALS.admin.email,
        role: 'admin',
      }),
    )

    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(true)
  })
})
