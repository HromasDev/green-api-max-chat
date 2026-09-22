import { chatTitle, useChatStore } from '#/entities/chat'
import { CreateChatForm } from '#/features/create-chat/ui/create-chat-form.component.tsx'
import { cn } from '#/shared/lib/utils.ts'

export function ChatSidebar() {
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const setActiveChat = useChatStore((state) => state.setActiveChat)

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <h1 className="text-lg font-semibold text-slate-900">MAX</h1>
      </div>

      <CreateChatForm />

      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 && (
          <p className="p-4 text-sm text-slate-400">
            Пока нет ни одного чата — создайте новый по номеру телефона.
          </p>
        )}
        {chats.map((chat) => (
          <button
            key={chat.chatId}
            onClick={() => setActiveChat(chat.chatId)}
            className={cn(
              'flex w-full flex-col gap-0.5 border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-50',
              chat.chatId === activeChatId && 'bg-emerald-50',
            )}
          >
            <span className="text-sm font-medium text-slate-900">
              {chatTitle(chat)}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
