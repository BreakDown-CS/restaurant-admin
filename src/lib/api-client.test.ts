import { HttpResponse, http } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '@/mocks/server'
import { apiClient } from './api-client'
import { ApiError } from './api-error'
import { env } from './env'
import { z, ZodError } from 'zod'

const itemUrl = `${env.VITE_API_URL}/items`
const itemSchema = z.object({ id: z.string() })
const ok = (data: unknown) => ({ success: true, message: 'Success', data })

describe('apiClient', () => {
  it('returns the parsed data on success', async () => {
    server.use(http.get(itemUrl, () => HttpResponse.json(ok({ id: '1' }))))

    await expect(apiClient.get('/items', itemSchema)).resolves.toEqual({
      id: '1',
    })
  })

  it('sends the body as JSON', async () => {
    let receivedBody: unknown
    server.use(
      http.post(itemUrl, async ({ request }) => {
        receivedBody = await request.json()
        return HttpResponse.json(ok({ id: '2' }), { status: 201 })
      }),
    )

    await apiClient.post('/items', itemSchema, { name: 'ข้าวผัด' })

    expect(receivedBody).toEqual({ name: 'ข้าวผัด' })
  })

  it('accepts 204 No Content with z.void()', async () => {
    server.use(
      http.delete(
        `${itemUrl}/1`,
        () => new HttpResponse(null, { status: 204 }),
      ),
    )

    await expect(
      apiClient.delete('/items/1', z.void()),
    ).resolves.toBeUndefined()
  })

  it('reads code and details from the error envelope', async () => {
    server.use(
      http.get(itemUrl, () =>
        HttpResponse.json(
          {
            success: false,
            message: 'Invalid input',
            error: { code: 'VALIDATION_FAILED', details: { name: 'required' } },
          },
          { status: 400 },
        ),
      ),
    )

    const error = await apiClient.get('/items', itemSchema).catch((e) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({
      status: 400,
      message: 'Invalid input',
      code: 'VALIDATION_FAILED',
      details: { name: 'required' },
    })
  })

  it('still throws ApiError when the error body is not our envelope', async () => {
    server.use(http.get(itemUrl, () => new HttpResponse(null, { status: 502 })))

    const error = await apiClient.get('/items', itemSchema).catch((e) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 502, code: 'UNKNOWN_ERROR' })
  })

  it('throws ZodError when data has the wrong shape', async () => {
    server.use(http.get(itemUrl, () => HttpResponse.json(ok({ id: 1 }))))

    await expect(apiClient.get('/items', itemSchema)).rejects.toBeInstanceOf(
      ZodError,
    )
  })
})
