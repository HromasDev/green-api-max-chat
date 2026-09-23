import { ArrowLeft } from 'lucide-react'
import { chatTitle, useChatStore } from '#/entities/chat'
import { MessageInput } from '#/features/send-message/ui/message-input.component.tsx'
import type { InstanceCredentials } from '#/shared/api/green-api/types.ts'
import { cn } from '#/shared/lib/utils.ts'
import { MessageList } from './message-list.component.tsx'

const EMPTY_MESSAGES: ReturnType<
  typeof useChatStore.getState
>['messagesByChatId'][string] = []

export function ChatWindow({
  credentials,
  activeOnMobile,
}: {
  credentials: InstanceCredentials
  activeOnMobile: boolean
}) {
  const activeChatId = useChatStore((state) => state.activeChatId)
  const chats = useChatStore((state) => state.chats)
  const setActiveChat = useChatStore((state) => state.setActiveChat)
  const messages = useChatStore((state) =>
    activeChatId
      ? (state.messagesByChatId[activeChatId] ?? EMPTY_MESSAGES)
      : EMPTY_MESSAGES,
  )

  if (!activeChatId) {
    return (
      <div className="hidden flex-1 items-center justify-center bg-slate-100 text-slate-400 md:flex dark:bg-neutral-950">
        Выберите чат или создайте новый
      </div>
    )
  }

  const chat = chats.find((item) => item.chatId === activeChatId)

  return (
    <div
      className={cn(
        'w-full flex-1 flex-col bg-slate-100 md:flex dark:bg-neutral-950',
        activeOnMobile ? 'flex' : 'hidden',
      )}
    >
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-3.5 md:px-5 dark:border-neutral-800 dark:bg-neutral-900">
        <button
          type="button"
          className="cursor-pointer rounded-md p-1.5 text-slate-500 hover:bg-slate-100 md:hidden dark:hover:bg-neutral-800"
          onClick={() => setActiveChat(null)}
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="font-medium text-slate-900 dark:text-neutral-100">
          {chat ? chatTitle(chat) : activeChatId}
        </span>
      </div>

      <MessageList messages={messages} />

      <MessageInput chatId={activeChatId} credentials={credentials} />
    </div>
  )
}
