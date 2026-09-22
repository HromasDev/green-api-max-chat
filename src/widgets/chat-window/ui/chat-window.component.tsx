import { useEffect, useRef } from 'react'
import { chatTitle, useChatStore } from '#/entities/chat'
import { MessageBubble } from '#/entities/message/ui/message-bubble.component.tsx'
import { MessageInput } from '#/features/send-message/ui/message-input.component.tsx'
import type { InstanceCredentials } from '#/shared/api/green-api/types.ts'

export function ChatWindow({
  credentials,
}: {
  credentials: InstanceCredentials
}) {
  const activeChatId = useChatStore((state) => state.activeChatId)
  const chats = useChatStore((state) => state.chats)
  const messages = useChatStore((state) =>
    activeChatId ? (state.messagesByChatId[activeChatId] ?? []) : [],
  )
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  if (!activeChatId) {
    return (
      <div className="flex flex-1 items-center justify-center text-slate-400">
        Выберите чат или создайте новый
      </div>
    )
  }

  const chat = chats.find((item) => item.chatId === activeChatId)

  return (
    <div className="flex flex-1 flex-col bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-5 py-3.5">
        <span className="font-medium text-slate-900">
          {chat ? chatTitle(chat) : activeChatId}
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-slate-400">
            Сообщений пока нет
          </p>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput chatId={activeChatId} credentials={credentials} />
    </div>
  )
}
