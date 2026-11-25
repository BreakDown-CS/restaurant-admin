import { queryOptions } from '@tanstack/react-query'
import { getCategories } from './category.api'

export const categoryQueries = {
  all: () => ['categories'] as const,

  list: () =>
    queryOptions({
      queryKey: [...categoryQueries.all(), 'list'],
      queryFn: getCategories,
    }),
}
