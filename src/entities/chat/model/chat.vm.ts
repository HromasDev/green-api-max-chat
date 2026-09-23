export interface ChatVm {
  chatId: string
  phone: string
  createdAt: number
}

export function chatTitle(chat: ChatVm): string {
  return chat.phone
}
