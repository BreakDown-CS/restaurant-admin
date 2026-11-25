import { z } from 'zod'

const MAX_PRICE = 99_999_999.99

export const menuItemSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(1, { error: 'กรุณากรอกชื่อเมนู' })
    .max(100, { error: 'ชื่อเมนูยาวได้ไม่เกิน 100 ตัวอักษร' }),
  price: z
    .number()
    .nonnegative({ error: 'ราคาห้ามติดลบ' })
    .multipleOf(0.01, { error: 'ราคามีทศนิยมได้ไม่เกิน 2 ตำแหน่ง' })
    .max(MAX_PRICE, { error: 'ราคาสูงเกินไป' }),
  categoryId: z.string().min(1, { error: 'กรุณาเลือกหมวดหมู่' }),
  category: z.string(),
  isAvailable: z.boolean(),
})

export const menuListSchema = z.array(menuItemSchema)
export type MenuItem = z.infer<typeof menuItemSchema>

export const menuInputSchema = menuItemSchema.omit({ id: true, category: true })
export type MenuInput = z.infer<typeof menuInputSchema>
