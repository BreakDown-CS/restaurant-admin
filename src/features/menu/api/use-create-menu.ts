import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMenu } from './menu.api'
import { menuQueries } from './menu.queries'

export function useCreateMenu() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMenu,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: menuQueries.all() }),
  })
}
