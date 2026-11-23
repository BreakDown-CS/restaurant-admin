import { env } from '@/lib/env'
import { ApiError } from '@/lib/api-error'
import { z } from 'zod'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const successEnvelopeSchema = z.object({ data: z.unknown() })

const errorEnvelopeSchema = z.object({
  message: z.string(),
  error: z.object({
    code: z.string(),
    details: z.record(z.string(), z.string()).optional(),
  }),
})

async function toApiError(response: Response): Promise<ApiError> {
  const body: unknown = await response.json().catch(() => undefined)
  const result = errorEnvelopeSchema.safeParse(body)

  if (!result.success) {
    return new ApiError(response.status, response.statusText)
  }

  const { message, error } = result.data
  return new ApiError(response.status, message, error.code, error.details)
}

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
    throw await toApiError(response)
  }

  if (response.status === 204) {
    return schema.parse(undefined)
  }

  const { data } = successEnvelopeSchema.parse(await response.json())
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
