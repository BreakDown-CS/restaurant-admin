import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_ENABLE_MOCKS: z.stringbool().default(false),
})

const result = envSchema.safeParse(import.meta.env)

if (!result.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(result.error)}`,
  )
}

export const env = result.data
