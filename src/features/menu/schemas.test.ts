import { describe, expect, it } from 'vitest'
import { menuInputSchema } from './schemas'
import type { MenuInput } from './schemas'

const validMenu: MenuInput = {
  name: 'ข้าวผัดกุ้ง',
  price: 60,
  category: 'อาหารจานเดียว',
  isAvailable: true,
}

describe('menuInputSchema', () => {
  it('accepts a valid menu', () => {
    expect(menuInputSchema.safeParse(validMenu).success).toBe(true)
  })

  it('rejects an empty name with a Thai message', () => {
    const result = menuInputSchema.safeParse({ ...validMenu, name: '' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('กรุณากรอกชื่อเมนู')
  })

  it('rejects a negative price', () => {
    const result = menuInputSchema.safeParse({ ...validMenu, price: -1 })

    expect(result.error?.issues[0]?.message).toBe('ราคาห้ามติดลบ')
  })
})
