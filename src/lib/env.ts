import { z } from 'zod'

// 1. บอก zod ว่า env ต้องหน้าตาแบบไหน
const envSchema = z.object({
  VITE_API_URL: z.url(), // ต้องเป็น URL
})

// 2. ตรวจของจริง
const result = envSchema.safeParse(import.meta.env)

// 3. ถ้าไม่ผ่าน → พังทันที พร้อมบอกว่าผิดตรงไหน
if (!result.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(result.error)}`,
  )
}

// 4. export ค่าที่ผ่านการตรวจแล้ว
export const env = result.data
