import { renderHook, waitFor } from '@testing-library/react'

import { createQueryHookWrapper } from '@/utils/test-utils'

import { useMenu } from './menu'

describe('useMenu', () => {
  it('should return menu', async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(8)
  })
})
