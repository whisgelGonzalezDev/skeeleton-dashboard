import { describe, it, expect } from 'vitest'
import { simulateApiDelay, MOCK_USERS, DEMO_USERS_RAW, DEMO_CREDENTIALS } from './mockData'

describe('simulateApiDelay', () => {
  it('resolves with the same data it was given', async () => {
    const payload = { hello: 'world' }
    await expect(simulateApiDelay(payload)).resolves.toBe(payload)
  })
})

describe('MOCK_USERS', () => {
  it('maps every demo row', () => {
    expect(MOCK_USERS).toHaveLength(DEMO_USERS_RAW.length)
  })

  it('maps the Enterprise plan to the Admin role', () => {
    const carlos = MOCK_USERS.find((u) => u.id === 'usr_01')
    expect(carlos?.role).toBe('Admin')
  })

  it('normalizes a pending status to Inactive', () => {
    const marcus = MOCK_USERS.find((u) => u.id === 'usr_03')
    expect(marcus?.status).toBe('Inactive')
  })
})

describe('DEMO_CREDENTIALS', () => {
  it('uses the @skeeleton.dev domain consistently', () => {
    expect(DEMO_CREDENTIALS.admin.email).toContain('@skeeleton.dev')
    expect(DEMO_CREDENTIALS.viewer.email).toContain('@skeeleton.dev')
  })
})
