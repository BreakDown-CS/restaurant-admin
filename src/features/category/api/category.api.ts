import { apiClient } from '@/lib/api-client'
import { categoryListSchema } from '../schemas'

export const getCategories = () =>
  apiClient.get('/categories', categoryListSchema)
