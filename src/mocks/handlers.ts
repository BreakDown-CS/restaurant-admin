import { HttpResponse, http } from 'msw'
import type { z } from 'zod'
import { menuInputSchema } from '@/features/menu/schemas'
import type { MenuItem } from '@/features/menu/schemas'
import { env } from '@/lib/env'

const ok = (data: unknown, status = 200) =>
  HttpResponse.json({ success: true, message: 'Success', data }, { status })

const fail = (
  status: number,
  code: string,
  message: string,
  details?: Record<string, string>,
) =>
  HttpResponse.json(
    { success: false, message, error: { code, details } },
    { status },
  )

const toDetails = (error: z.ZodError) =>
  Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0]), issue.message]),
  )

const notFound = () => fail(404, 'NOT_FOUND', 'Menu not found')

const menus: MenuItem[] = [
  {
    id: crypto.randomUUID(),
    name: 'ข้าวกะเพราหมูสับ',
    price: 59.5,
    category: 'อาหารจานเดียว',
    isAvailable: true,
  },
  {
    id: crypto.randomUUID(),
    name: 'ต้มยำกุ้งน้ำข้น',
    price: 150,
    category: 'ต้ม/แกง',
    isAvailable: true,
  },
  {
    id: crypto.randomUUID(),
    name: 'ส้มตำไทย',
    price: 45,
    category: 'ยำ/ตำ',
    isAvailable: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'ชาไทยเย็น',
    price: 35,
    category: 'เครื่องดื่ม',
    isAvailable: true,
  },
]

export const handlers = [
  http.get(`${env.VITE_API_URL}/menus`, () => ok(menus)),

  http.post(`${env.VITE_API_URL}/menus`, async ({ request }) => {
    const result = menuInputSchema.safeParse(await request.json())

    if (!result.success) {
      return fail(
        400,
        'VALIDATION_FAILED',
        'Invalid input',
        toDetails(result.error),
      )
    }

    const menu: MenuItem = { id: crypto.randomUUID(), ...result.data }
    menus.push(menu)

    return ok(menu, 201)
  }),

  http.delete(`${env.VITE_API_URL}/menus/:id`, ({ params }) => {
    const index = menus.findIndex((menu) => menu.id === params.id)

    if (index === -1) {
      return notFound()
    }

    menus.splice(index, 1)

    return new HttpResponse(null, { status: 204 })
  }),

  http.put(`${env.VITE_API_URL}/menus/:id`, async ({ params, request }) => {
    const index = menus.findIndex((menu) => menu.id === params.id)

    if (index === -1) {
      return notFound()
    }

    const result = menuInputSchema.safeParse(await request.json())

    if (!result.success) {
      return fail(
        400,
        'VALIDATION_FAILED',
        'Invalid input',
        toDetails(result.error),
      )
    }

    const menu: MenuItem = { id: menus[index].id, ...result.data }
    menus[index] = menu
    return ok(menu)
  }),
]
