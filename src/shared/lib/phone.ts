export function phoneToChatId(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '')
  return `${digits}@c.us`
}

export function isValidPhone(rawPhone: string): boolean {
  const digits = rawPhone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}
