import { useQuery } from '@tanstack/react-query'
import { simulateApiDelay, MOCK_USERS, type MockUser } from '@/core/utils/mockData'

function fetchUsers(): Promise<MockUser[]> {
  return simulateApiDelay(MOCK_USERS)
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
