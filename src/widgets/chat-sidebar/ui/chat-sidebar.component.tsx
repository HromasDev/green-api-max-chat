import { chatTitle, useChatStore } from '#/entities/chat'
import { CreateChatForm } from '#/features/create-chat/ui/create-chat-form.component.tsx'
import { cn } from '#/shared/lib/utils.ts'
import { useSidebarResize } from '../model/use-sidebar-resize.ts'

export function ChatSidebar({ activeOnMobile }: { activeOnMobile: boolean }) {
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const setActiveChat = useChatStore((state) => state.setActiveChat)
  const { width, onPointerDown, onPointerMove, onPointerUp } =
    useSidebarResize()

  return (
    <aside
      style={{ '--sidebar-width': `${width}px` } as React.CSSProperties}
      className={cn(
        'relative w-full shrink-0 flex-col border-r border-slate-200 bg-white md:flex md:w-[var(--sidebar-width)]',
        'dark:border-neutral-800 dark:bg-neutral-900',
        activeOnMobile ? 'flex' : 'hidden',
      )}
    >
      <div className="border-b border-slate-200 p-4 dark:border-neutral-800">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-neutral-100">
          MAX
        </h1>
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
              'flex w-full cursor-pointer flex-col gap-0.5 border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:border-neutral-800 dark:hover:bg-neutral-800',
              chat.chatId === activeChatId &&
                'bg-accent-50 dark:bg-neutral-800',
            )}
          >
            <span className="text-sm font-medium text-slate-900 dark:text-neutral-100">
              {chatTitle(chat)}
            </span>
          </button>
        ))}
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="absolute top-0 right-0 hidden h-full w-1 cursor-col-resize touch-none hover:bg-accent-500/40 md:block"
      />
    </aside>
  )
}
