import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '#/entities/message/model/message.ts'
import type { ChatVm } from './chat.vm.ts'

interface ChatState {
  chats: Array<ChatVm>
  messagesByChatId: Record<string, Array<ChatMessage>>
  activeChatId: string | null

  createChat: (chatId: string, phone: string) => void
  setActiveChat: (chatId: string) => void
  addMessage: (message: ChatMessage) => void
  updateMessageStatus: (
    chatId: string,
    messageId: string,
    status: ChatMessage['status'],
  ) => void
}

/**
 * GREEN-API не отдаёт историю переписки в MAX по REST — только очередь новых
 * уведомлений (technology-http-api). Поэтому вся история — то, что реально
 * прошло через это приложение, — держится и переживает перезагрузку страницы
 * только благодаря persist в localStorage.
 */
export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      messagesByChatId: {},
      activeChatId: null,

      createChat: (chatId, phone) => {
        if (get().chats.some((chat) => chat.chatId === chatId)) {
          set({ activeChatId: chatId })
          return
        }
        set((state) => ({
          chats: [...state.chats, { chatId, phone, createdAt: Date.now() }],
          activeChatId: chatId,
        }))
      },

      setActiveChat: (chatId) => set({ activeChatId: chatId }),

      addMessage: (message) =>
        set((state) => {
          const existing = state.messagesByChatId[message.chatId] ?? []
          // Дедупликация: одно и то же входящее уведомление может прийти
          // повторно, если deleteNotification не успел отработать вовремя.
          if (existing.some((item) => item.id === message.id)) return state
          return {
            messagesByChatId: {
              ...state.messagesByChatId,
              [message.chatId]: [...existing, message],
            },
          }
        }),

      updateMessageStatus: (chatId, messageId, status) =>
        set((state) => {
          const existing = state.messagesByChatId[chatId] ?? []
          return {
            messagesByChatId: {
              ...state.messagesByChatId,
              [chatId]: existing.map((message) =>
                message.id === messageId ? { ...message, status } : message,
              ),
            },
          }
        }),
    }),
    { name: 'green-api-chats' },
  ),
)
