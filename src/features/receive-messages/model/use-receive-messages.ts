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

          if (!notification) {
            // Страховка от busy-loop: сервер не всегда честно держит receiveTimeout.
            await new Promise((resolve) => setTimeout(resolve, 1000))
            continue
          }

          const { receiptId, body } = notification

          if (isIncomingTextMessage(body)) {
            const chatId = body.senderData.chatId
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
