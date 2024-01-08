import { useQuery } from '@tanstack/react-query'

import { getMatches } from '@/services/matches'

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
  })

}
