import axios from 'axios'

import { Match } from '@/types/matches'

export const getMatches = async () => {
  const response = await axios.get<Match[]>('/matches')
  return response?.data
}
