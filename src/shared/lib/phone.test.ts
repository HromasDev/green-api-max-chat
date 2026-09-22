import { describe, expect, it } from 'vitest'
import { isValidPhone, phoneToChatId } from './phone.ts'

describe('phoneToChatId', () => {
  it('оставляет только цифры и добавляет суффикс @c.us', () => {
    expect(phoneToChatId('+7 (999) 123-45-67')).toBe('79991234567@c.us')
  })

  it('не трогает уже нормализованный номер', () => {
    expect(phoneToChatId('79991234567')).toBe('79991234567@c.us')
  })
})

describe('isValidPhone', () => {
  it('принимает номер в 11 цифр', () => {
    expect(isValidPhone('+7 999 123-45-67')).toBe(true)
  })

  it('отклоняет слишком короткий номер', () => {
    expect(isValidPhone('12345')).toBe(false)
  })

  it('отклоняет пустую строку', () => {
    expect(isValidPhone('')).toBe(false)
  })
})
