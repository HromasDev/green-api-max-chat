import { z } from 'zod'
import { isValidPhone } from '#/shared/lib/phone.ts'

export const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Введите номер телефона')
    .refine(
      isValidPhone,
      'Номер должен содержать от 10 до 15 цифр вместе с кодом страны',
    ),
})

export type PhoneFormValues = z.infer<typeof phoneSchema>
