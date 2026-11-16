import { useMutation, useQueryClient } from '@tanstack/react-query'
import { menuQueries } from './menu.queries'
import { updateMenu } from './menu.api'

export function useUpdateMenu() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMenu,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: menuQueries.all() }),
  })
}
