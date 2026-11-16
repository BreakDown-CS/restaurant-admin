import { useSuspenseQuery } from '@tanstack/react-query'
import { menuQueries } from '../api/menu.queries'
import { Table, Typography } from 'antd'
import { menuColumns } from './menu-columns'

export function MenuPage() {
  const { data: menus } = useSuspenseQuery(menuQueries.list())

  return (
    <div className="p-8">
      <Typography.Title level={2}>เมนูอาหาร</Typography.Title>
      <Table rowKey="id" columns={menuColumns} dataSource={menus} />
    </div>
  )
}
