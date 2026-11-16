import { Space, Tag } from 'antd'
import type { TableColumnsType } from 'antd'
import type { MenuItem } from '../schemas'
import { formatPrice } from '@/lib/format'
import { DeleteMenuButton } from './delete-menu-button'
import { EditMenuButton } from './edit-menu-button'

export const menuColumns: TableColumnsType<MenuItem> = [
  { title: 'ชื่อเมนู', dataIndex: 'name' },
  { title: 'หมวดหมู่', dataIndex: 'category' },
  {
    title: 'ราคา',
    dataIndex: 'price',
    align: 'right',
    render: (price: number) => formatPrice(price),
  },
  {
    title: 'สถานะ',
    dataIndex: 'isAvailable',
    align: 'center',
    render: (isAvailable: boolean) => {
      return isAvailable ? (
        <Tag color="green">พร้อมขาย</Tag>
      ) : (
        <Tag color="red">หมด</Tag>
      )
    },
  },
  {
    key: 'actions',
    align: 'right',
    render: (_, menu) => (
      <Space>
        <EditMenuButton menu={menu} />
        <DeleteMenuButton menu={menu} />
      </Space>
    ),
  },
]
