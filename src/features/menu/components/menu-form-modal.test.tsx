import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { MenuFormModal } from './menu-form-modal'
import type { MenuItem } from '../schemas'

describe('MenuFormModal', () => {
  it('shows the schema messages when saving an empty form', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderWithProviders(<MenuFormModal onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'บันทึก' }))

    expect(await screen.findByText('กรุณากรอกชื่อเมนู')).toBeInTheDocument()
    expect(screen.getByText('กรุณาระบุหมวดหมู่')).toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('creates a menu and closes', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderWithProviders(<MenuFormModal onClose={onClose} />)

    await user.type(screen.getByLabelText('ชื่อเมนู'), 'ข้าวมันไก่')
    await user.clear(screen.getByLabelText('ราคา'))
    await user.type(screen.getByLabelText('ราคา'), '50')
    await user.type(screen.getByLabelText('หมวดหมู่'), 'อาหารจานเดียว')
    await user.click(screen.getByRole('button', { name: 'บันทึก' }))

    await waitFor(() => expect(onClose).toHaveBeenCalledOnce())
  })

  it('fills the form with the menu being edited', () => {
    const menu: MenuItem = {
      id: 'm1',
      name: 'ต้มยำกุ้ง',
      price: 120,
      category: 'ต้ม/แกง',
      isAvailable: true,
    }

    renderWithProviders(<MenuFormModal menu={menu} onClose={vi.fn()} />)

    expect(screen.getByLabelText('ชื่อเมนู')).toHaveValue('ต้มยำกุ้ง')
    expect(screen.getByText('แก้ไขเมนู')).toBeInTheDocument()
  })
})
