import { z } from 'zod'

export const loginSchema = z.object({
  idInstance: z
    .string()
    .trim()
    .min(1, 'Введите idInstance')
    .regex(/^\d+$/, 'idInstance состоит только из цифр'),
  apiTokenInstance: z.string().trim().min(1, 'Введите apiTokenInstance'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
