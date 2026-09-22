import { useEffect } from 'react'
import { useChatStore } from '#/entities/chat'
import {
  deleteNotification,
  receiveNotification,
} from '#/shared/api/green-api/client.ts'
import {
  extractText,
  isIncomingTextMessage,
  type InstanceCredentials,
} from '#/shared/api/green-api/types.ts'

/**
 * technology-http-api: очередь уведомлений вычитывается самим клиентом
 * поллингом, а не пушится сервером. Каждое полученное уведомление обязано
 * быть удалено (deleteNotification) — иначе GREEN-API выдаст его повторно.
 *
 * Не TanStack Query: это не запрос данных на экран, а фоновый бесконечный
 * цикл с side-эффектом (запись в стор) на каждой итерации — обычный эффект
 * подходит лучше, чем натягивание поллинга на кэш запросов.
 */
export function useReceiveMessages(credentials: InstanceCredentials | null) {
  const addMessage = useChatStore((state) => state.addMessage)
  const createChat = useChatStore((state) => state.createChat)

  useEffect(() => {
    if (!credentials) return

    const controller = new AbortController()
    let stopped = false

    async function poll() {
      while (!stopped) {
        try {
          const notification = await receiveNotification(
            credentials!,
            controller.signal,
          )

          if (!notification) continue

          const { receiptId, body } = notification

          if (isIncomingTextMessage(body)) {
            const chatId = body.senderData.chatId
            // Входящее сообщение может быть первым касанием с этим номером —
            // заводим чат в списке, если пользователь ещё не создавал его сам.
            createChat(
              chatId,
              body.senderData.senderName ?? chatId.replace('@c.us', ''),
            )
            addMessage({
              id: body.idMessage,
              chatId,
              text: extractText(body.messageData),
              direction: 'incoming',
              status: 'sent',
              timestamp: body.timestamp * 1000,
            })
          }

          await deleteNotification(credentials!, receiptId)
        } catch (error) {
          if ((error as { name?: string }).name === 'AbortError') return
          // Сеть моргнула или GREEN-API временно недоступен — короткая пауза
          // вместо мгновенного busy-loop запросов в стену.
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }
    }

    void poll()

    return () => {
      stopped = true
      controller.abort()
    }
  }, [credentials, addMessage, createChat])
}
