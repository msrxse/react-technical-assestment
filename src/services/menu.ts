import axios from 'axios'

import { Menu } from '@/types/menu'

export const getMenu = async () => {
  const response = await axios.get<Menu[]>('/menu')
  return response?.data
}
