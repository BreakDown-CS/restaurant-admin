import { useMutation, useQueryClient } from '@tanstack/react-query'
import { menuQueries } from './menu.queries'
import { deleteMenu } from './menu.api'

export function useDeleteMenu() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMenu,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: menuQueries.all() }),
  })
}
