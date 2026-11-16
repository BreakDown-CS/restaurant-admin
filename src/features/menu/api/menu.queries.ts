import { getMenus } from './menu.api'
import { queryOptions } from '@tanstack/react-query'

export const menuQueries = {
  all: () => ['menus'] as const,

  list: () =>
    queryOptions({
      queryKey: [...menuQueries.all(), 'list'],
      queryFn: getMenus,
    }),
}
