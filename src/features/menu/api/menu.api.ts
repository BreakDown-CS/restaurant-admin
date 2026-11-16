import { apiClient } from '@/lib/api-client'
import { menuItemSchema, menuListSchema } from '../schemas'
import type { MenuInput } from '../schemas'

export const getMenus = () => apiClient.get('/menus', menuListSchema)
export const createMenu = (input: MenuInput) =>
  apiClient.post('/menus', menuItemSchema, input)
