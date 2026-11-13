import { env } from '@/lib/env'

export function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to Restaurant Admin</h1>
      <p className="mt-4 text-lg">API: {env.VITE_API_URL}</p>
    </div>
  )
}
