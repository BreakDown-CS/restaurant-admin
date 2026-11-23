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

describe('menuInputSchema price', () => {
  it.each([0, 59.5, 10.55, 99_999_999.99])('accepts %s', (price) => {
    expect(menuInputSchema.safeParse({ ...validMenu, price }).success).toBe(
      true,
    )
  })

  it('rejects more than 2 decimal places', () => {
    const result = menuInputSchema.safeParse({ ...validMenu, price: 10.555 })

    expect(result.error?.issues[0]?.message).toBe('ราคามีทศนิยมได้ไม่เกิน 2 ตำแหน่ง')
  })

  it('rejects a price above the database limit', () => {
    const result = menuInputSchema.safeParse({
      ...validMenu,
      price: 100_000_000,
    })

    expect(result.error?.issues[0]?.message).toBe('ราคาสูงเกินไป')
  })
})

describe('menuInputSchema text', () => {
  it('rejects a name that is only spaces', () => {
    const result = menuInputSchema.safeParse({ ...validMenu, name: '   ' })

    expect(result.error?.issues[0]?.message).toBe('กรุณากรอกชื่อเมนู')
  })

  it('trims spaces like the backend', () => {
    const result = menuInputSchema.safeParse({ ...validMenu, name: ' ข้าวผัด ' })

    expect(result.data?.name).toBe('ข้าวผัด')
  })
})
