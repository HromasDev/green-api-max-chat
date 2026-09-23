import { useNavigate } from '@tanstack/react-router'
import { useChatStore } from '#/entities/chat'
import { useInstanceStore } from '#/entities/instance'
import { useReceiveMessages } from '#/features/receive-messages/model/use-receive-messages.ts'
import { ThemeToggle } from '#/features/toggle-theme/ui/theme-toggle.component.tsx'
import { ChatSidebar } from '#/widgets/chat-sidebar/ui/chat-sidebar.component.tsx'
import { ChatWindow } from '#/widgets/chat-window/ui/chat-window.component.tsx'

export function ChatPage() {
  const credentials = useInstanceStore((state) => state.credentials)
  const logout = useInstanceStore((state) => state.logout)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const navigate = useNavigate()

  useReceiveMessages(credentials)

  if (!credentials) return null

  const onLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900">
        <span className="text-xs text-slate-400">
          idInstance: {credentials.idInstance}
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={onLogout}
            className="cursor-pointer text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
          >
            Выйти
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar activeOnMobile={activeChatId === null} />
        <ChatWindow
          credentials={credentials}
          activeOnMobile={activeChatId !== null}
        />
      </div>
    </div>
  )
}
