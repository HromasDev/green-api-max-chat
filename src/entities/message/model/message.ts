export interface ChatMessage {
  id: string
  chatId: string
  text: string
  direction: 'outgoing' | 'incoming'
  /** 'sent' — оптимистично добавлено до ответа API; 'delivered' — sendMessage вернул idMessage. */
  status: 'sending' | 'sent' | 'failed'
  timestamp: number
}
