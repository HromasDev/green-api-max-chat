import { useMutation } from '@tanstack/react-query'
import { useChatStore } from '#/entities/chat'
import { sendMessage } from '#/shared/api/green-api/client.ts'
import type { InstanceCredentials } from '#/shared/api/green-api/types.ts'

export function useSendMessage(credentials: InstanceCredentials) {
  const addMessage = useChatStore((state) => state.addMessage)
  const updateMessageStatus = useChatStore((state) => state.updateMessageStatus)

  return useMutation({
    mutationFn: async ({ chatId, text }: { chatId: string; text: string }) => {
      const localId = crypto.randomUUID()
      addMessage({
        id: localId,
        chatId,
        text,
        direction: 'outgoing',
        status: 'sending',
        timestamp: Date.now(),
      })

      try {
        await sendMessage(credentials, { chatId, message: text })
        updateMessageStatus(chatId, localId, 'sent')
      } catch (error) {
        updateMessageStatus(chatId, localId, 'failed')
        throw error
      }
    },
  })
}
