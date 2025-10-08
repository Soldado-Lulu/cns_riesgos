import {z} from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3).max(120),
  email: z.string().email().max(120),
  password: z.string().min(6).max(120),
})