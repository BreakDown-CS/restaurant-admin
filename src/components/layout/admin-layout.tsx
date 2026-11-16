import { Link, useLocation } from '@tanstack/react-router'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { ReactNode } from 'react'

const navItems: MenuProps['items'] = [
  { key: '/', label: <Link to="/">แดชบอร์ด</Link> },
  { key: '/menus', label: <Link to="/menus">เมนูอาหาร</Link> },
]

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = useLocation({ select: (location) => location.pathname })

  return (
    <Layout className="min-h-screen">
      <Layout.Sider breakpoint="lg" collapsedWidth={0}>
        <div className="p-4 text-lg font-semibold text-white">
          Restaurant Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={navItems}
        />
      </Layout.Sider>
      <Layout.Content className="p-8">{children}</Layout.Content>
    </Layout>
  )
}
