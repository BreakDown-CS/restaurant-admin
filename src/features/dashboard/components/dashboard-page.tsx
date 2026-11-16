import { Link } from '@tanstack/react-router'

export function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to Restaurant Admin</h1>
      <Link to="/menus" className="mt-4 inline-block text-blue-600 underline">
        ดูเมนูอาหาร →
      </Link>
    </div>
  )
}
