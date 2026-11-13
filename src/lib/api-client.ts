import { env } from '@/lib/env'
import { ApiError } from '@/lib/api-error'
import type { z } from 'zod'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
}

async function request<TSchema extends z.ZodType>(
  path: string,
  schema: TSchema,
  { method = 'GET', body }: RequestOptions = {},
): Promise<z.output<TSchema>> {
  const headers = new Headers({ Accept: 'application/json' })
  if (body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${env.VITE_API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText)
  }

  const data: unknown =
    response.status === 204 ? undefined : await response.json()

  return schema.parse(data)
}

export const apiClient = {
  get: <TSchema extends z.ZodType>(path: string, schema: TSchema) =>
    request(path, schema),

  post: <TSchema extends z.ZodType>(
    path: string,
    schema: TSchema,
    body?: unknown,
  ) => request(path, schema, { method: 'POST', body }),

  put: <TSchema extends z.ZodType>(
    path: string,
    schema: TSchema,
    body?: unknown,
  ) => request(path, schema, { method: 'PUT', body }),

  patch: <TSchema extends z.ZodType>(
    path: string,
    schema: TSchema,
    body?: unknown,
  ) => request(path, schema, { method: 'PATCH', body }),

  delete: <TSchema extends z.ZodType>(path: string, schema: TSchema) =>
    request(path, schema, { method: 'DELETE' }),
}
