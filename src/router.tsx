import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'

export function getRouter() {
  // ตัว "ตู้เย็น" มีอันเดียวทั้งแอป
  const queryClient = new QueryClient({
    defaultOptions: {
      // ข้อมูลยังนับว่า "สด" อยู่ 1 นาที ระหว่างนั้นจะไม่เรียก API ซ้ำ
      queries: { staleTime: 60_000 },
    },
  })

  const router = createTanStackRouter({
    routeTree,
    // ส่ง queryClient เข้า router เพื่อให้ loader ของทุก route ใช้ได้
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    // ครอบทั้งแอปด้วย Provider เพื่อให้ component ทุกตัวใช้ query ได้
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
