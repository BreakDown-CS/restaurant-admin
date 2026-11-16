import { z } from 'zod'

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { error: 'กรุณากรอกชื่อเมนู' }),
  price: z.number().nonnegative(),
  category: z.string(),
  isAvailable: z.boolean(),
})

export const menuListSchema = z.array(menuItemSchema)

export type MenuItem = z.infer<typeof menuItemSchema>
