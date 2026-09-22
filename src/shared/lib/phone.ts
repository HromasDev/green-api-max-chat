/**
 * GREEN-API строит идентификатор чата из телефона получателя одинаково для
 * всех каналов (WhatsApp, Telegram, MAX): цифры номера в международном
 * формате + суффикс `@c.us`. Плюс, пробелы и прочие разделители роли не
 * играют — сервер ждёт только цифры перед `@`.
 *
 * Если у вашего инстанса MAX окажется другой суффикс — поменять нужно только
 * здесь, это единственное место, которое знает формат chatId.
 */
export function phoneToChatId(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '')
  return `${digits}@c.us`
}

export function isValidPhone(rawPhone: string): boolean {
  const digits = rawPhone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}
