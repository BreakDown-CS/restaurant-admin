import { zodResolver } from '@hookform/resolvers/zod'
import { App, Form, Input, InputNumber, Modal, Switch } from 'antd'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/form/form-field'
import { useCreateMenu } from '../api/use-create-menu'
import { menuInputSchema } from '../schemas'
import type { MenuInput, MenuItem } from '../schemas'
import { useUpdateMenu } from '../api/use-update-menu'

const emptyMenu: MenuInput = {
  name: '',
  price: 0,
  category: '',
  isAvailable: true,
}

interface MenuFormModalProps {
  menu?: MenuItem
  onClose: () => void
}

export function MenuFormModal({ menu, onClose }: MenuFormModalProps) {
  const { message } = App.useApp()
  const createMenu = useCreateMenu()
  const updateMenu = useUpdateMenu()
  const { control, handleSubmit } = useForm<MenuInput>({
    resolver: zodResolver(menuInputSchema),
    defaultValues: menu ?? emptyMenu,
  })

  const callbacks: { onSuccess: () => void; onError: () => void } = {
    onSuccess: () => {
      message.success(menu ? 'บันทึกการแก้ไขแล้ว' : 'เพิ่มเมนูแล้ว')
      onClose()
    },
    onError: () => message.error('บันทึกไม่สำเร็จ'),
  }

  const submit = handleSubmit((values) => {
    if (menu) {
      updateMenu.mutate({ id: menu.id, input: values }, callbacks)
    } else {
      createMenu.mutate(values, callbacks)
    }
  })

  return (
    <Modal
      open
      title={menu ? 'แก้ไขเมนู' : 'เพิ่มเมนู'}
      okText="บันทึก"
      cancelText="ยกเลิก"
      confirmLoading={createMenu.isPending || updateMenu.isPending}
      onOk={() => void submit()}
      onCancel={onClose}
    >
      <Form layout="vertical" component={false}>
        <FormField control={control} name="name" label="ชื่อเมนู">
          {(field) => <Input {...field} />}
        </FormField>
        <FormField control={control} name="price" label="ราคา">
          {(field) => (
            <InputNumber {...field} min={0} prefix="฿" className="w-full" />
          )}
        </FormField>
        <FormField control={control} name="category" label="หมวดหมู่">
          {(field) => <Input {...field} />}
        </FormField>
        <FormField control={control} name="isAvailable" label="พร้อมขาย">
          {(field) => (
            <Switch
              id={field.id}
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        </FormField>
      </Form>
    </Modal>
  )
}
