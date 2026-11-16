import { createFileRoute } from '@tanstack/react-router'
import { MenuPage, menuQueries } from '@/features/menu'

export const Route = createFileRoute('/menus')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(menuQueries.list()),
  component: MenuPage,
})
