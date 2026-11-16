import { zodResolver } from '@hookform/resolvers/zod'
import { App, Form, Input, InputNumber, Modal, Switch } from 'antd'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/form/form-field'
import { useCreateMenu } from '../api/use-create-menu'
import { menuInputSchema } from '../schemas'
import type { MenuInput } from '../schemas'

const emptyMenu: MenuInput = {
  name: '',
  price: 0,
  category: '',
  isAvailable: true,
}

interface MenuFormModalProps {
  open: boolean
  onClose: () => void
}

export function MenuFormModal({ open, onClose }: MenuFormModalProps) {
  const { message } = App.useApp()
  const createMenu = useCreateMenu()
  const { control, handleSubmit, reset } = useForm<MenuInput>({
    resolver: zodResolver(menuInputSchema),
    defaultValues: emptyMenu,
  })

  const close = () => {
    reset()
    onClose()
  }

  const submit = handleSubmit((values) => {
    createMenu.mutate(values, {
      onSuccess: () => {
        message.success('เพิ่มเมนูแล้ว')
        close()
      },
      onError: () => message.error('เพิ่มเมนูไม่สำเร็จ'),
    })
  })

  return (
    <Modal
      title="เพิ่มเมนู"
      open={open}
      okText="บันทึก"
      cancelText="ยกเลิก"
      confirmLoading={createMenu.isPending}
      onOk={() => void submit()}
      onCancel={close}
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
            <Switch checked={field.value} onChange={field.onChange} />
          )}
        </FormField>
      </Form>
    </Modal>
  )
}
