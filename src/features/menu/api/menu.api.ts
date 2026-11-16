import { apiClient } from '@/lib/api-client'
import { menuListSchema } from '../schemas'

export const getMenus = () => apiClient.get('/menus', menuListSchema)
