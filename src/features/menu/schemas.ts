import { z } from 'zod'

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { error: 'กรุณากรอกชื่อเมนู' }),
  price: z.number().nonnegative({ error: 'ราคาห้ามติดลบ' }),
  category: z.string().min(1, { error: 'กรุณาระบุหมวดหมู่' }),
  isAvailable: z.boolean(),
})

export const menuListSchema = z.array(menuItemSchema)
export type MenuItem = z.infer<typeof menuItemSchema>

export const menuInputSchema = menuItemSchema.omit({ id: true })
export type MenuInput = z.infer<typeof menuInputSchema>
