import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url(),
})

const result = envSchema.safeParse(import.meta.env)

if (!result.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(result.error)}`,
  )
}

export const env = result.data
