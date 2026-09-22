export interface ChatVm {
  chatId: string
  /** Номер получателя в исходном виде, как ввёл пользователь — для отображения в шапке. */
  phone: string
  createdAt: number
}

/** chatId вида `79991234567@c.us` → `+7 999 123-45-67`-подобное человеко-читаемое представление не требуется заданием, оставляем номер как ввели. */
export function chatTitle(chat: ChatVm): string {
  return chat.phone
}
