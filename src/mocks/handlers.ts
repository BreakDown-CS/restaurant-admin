import { HttpResponse, http } from 'msw'
import { menuInputSchema } from '@/features/menu/schemas'
import type { MenuItem } from '@/features/menu/schemas'
import { env } from '@/lib/env'

const menus: MenuItem[] = [
  {
    id: '1',
    name: 'Menu Item 1',
    price: 10.99,
    category: 'Category 1',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Menu Item 2',
    price: 15.99,
    category: 'Category 2',
    isAvailable: false,
  },
  {
    id: '3',
    name: 'Menu Item 3',
    price: 8.99,
    category: 'Category 1',
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Menu Item 4',
    price: 12.99,
    category: 'Category 3',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Menu Item 5',
    price: 9.99,
    category: 'Category 2',
    isAvailable: false,
  },
]

export const handlers = [
  http.get(`${env.VITE_API_URL}/menus`, () => HttpResponse.json(menus)),

  http.post(`${env.VITE_API_URL}/menus`, async ({ request }) => {
    const result = menuInputSchema.safeParse(await request.json())

    if (!result.success) {
      return HttpResponse.json({ message: 'Invalid menu' }, { status: 400 })
    }

    const menu: MenuItem = { id: crypto.randomUUID(), ...result.data }
    menus.push(menu)

    return HttpResponse.json(menu, { status: 201 })
  }),

  http.delete(`${env.VITE_API_URL}/menus/:id`, ({ params }) => {
    const index = menus.findIndex((menu) => menu.id === params.id)

    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }

    menus.splice(index, 1)

    return new HttpResponse(null, { status: 204 })
  }),
]
