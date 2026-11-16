import { apiClient } from '@/lib/api-client'
import { menuItemSchema, menuListSchema } from '../schemas'
import type { MenuInput } from '../schemas'
import { z } from 'zod'

export const getMenus = () => apiClient.get('/menus', menuListSchema)
export const createMenu = (input: MenuInput) =>
  apiClient.post('/menus', menuItemSchema, input)
export const deleteMenu = (id: string) =>
  apiClient.delete(`/menus/${id}`, z.void())
