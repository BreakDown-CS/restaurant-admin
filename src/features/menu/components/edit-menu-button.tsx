import { useState } from 'react'
import { Button } from 'antd'
import { MenuFormModal } from './menu-form-modal'
import type { MenuItem } from '../schemas'

interface EditMenuButtonProps {
  menu: MenuItem
}

export function EditMenuButton({ menu }: EditMenuButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <Button size="small" onClick={() => setIsFormOpen(true)}>
        แก้ไข
      </Button>
      {isFormOpen && (
        <MenuFormModal menu={menu} onClose={() => setIsFormOpen(false)} />
      )}
    </>
  )
}
