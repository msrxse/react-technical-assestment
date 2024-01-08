import { renderHook, waitFor } from '@testing-library/react'

import { createQueryHookWrapper } from '@/utils/test-utils'

import { useMatches } from './matches'

describe('useMatches', () => {
  it('should return matches', async () => {
    const { result } = renderHook(() => useMatches(), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(5)
  })
})
