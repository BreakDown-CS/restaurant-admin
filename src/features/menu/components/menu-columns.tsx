import { Tag } from 'antd'
import type { TableColumnsType } from 'antd'
import type { MenuItem } from '../schemas'
import { formatPrice } from '@/lib/format'

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
]
