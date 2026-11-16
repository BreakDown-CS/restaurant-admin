import { App, Button, Popconfirm } from 'antd'
import { useDeleteMenu } from '../api/use-delete-menu'
import type { MenuItem } from '../schemas'

interface DeleteMenuButtonProps {
  menu: MenuItem
}

export function DeleteMenuButton({ menu }: DeleteMenuButtonProps) {
  const { message } = App.useApp()
  const deleteMenu = useDeleteMenu()

  const confirmDelete = () => {
    deleteMenu.mutate(menu.id, {
      onSuccess: () => message.success(`ลบ "${menu.name}" แล้ว`),
      onError: () => message.error('ลบเมนูไม่สำเร็จ'),
    })
  }

  return (
    <Popconfirm
      title="ลบเมนูนี้"
      description={`ต้องการลบ "${menu.name}" ใช่ไหม`}
      okText="ลบ"
      cancelText="ยกเลิก"
      okButtonProps={{ danger: true }}
      onConfirm={confirmDelete}
    >
      <Button danger size="small" loading={deleteMenu.isPending}>
        ลบ
      </Button>
    </Popconfirm>
  )
}
