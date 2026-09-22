import { useInstanceStore } from '#/entities/instance'
import { useReceiveMessages } from '#/features/receive-messages/model/use-receive-messages.ts'
import { ChatSidebar } from '#/widgets/chat-sidebar/ui/chat-sidebar.component.tsx'
import { ChatWindow } from '#/widgets/chat-window/ui/chat-window.component.tsx'

export function ChatPage() {
  const credentials = useInstanceStore((state) => state.credentials)
  const logout = useInstanceStore((state) => state.logout)

  useReceiveMessages(credentials)

  if (!credentials) return null

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
        <span className="text-xs text-slate-400">
          idInstance: {credentials.idInstance}
        </span>
        <button
          onClick={logout}
          className="text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          Выйти
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <ChatWindow credentials={credentials} />
      </div>
    </div>
  )
}
