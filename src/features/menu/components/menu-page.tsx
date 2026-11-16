import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Button, Flex, Table, Typography } from 'antd'
import { menuQueries } from '../api/menu.queries'
import { menuColumns } from './menu-columns'
import { MenuFormModal } from './menu-form-modal'

export function MenuPage() {
  const { data: menus } = useSuspenseQuery(menuQueries.list())
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-4">
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          เมนูอาหาร
        </Typography.Title>
        <Button type="primary" onClick={() => setIsFormOpen(true)}>
          เพิ่มเมนู
        </Button>
      </Flex>
      <Table rowKey="id" columns={menuColumns} dataSource={menus} />
      {isFormOpen && <MenuFormModal onClose={() => setIsFormOpen(false)} />}
    </>
  )
}
