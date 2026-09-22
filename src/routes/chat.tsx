import { createFileRoute, redirect } from '@tanstack/react-router'
import { useInstanceStore } from '#/entities/instance'
import { ChatPage } from '#/pages/chat/ui/chat-page.component.tsx'

export const Route = createFileRoute('/chat')({
  beforeLoad: () => {
    if (useInstanceStore.getState().credentials === null) {
      throw redirect({ to: '/login' })
    }
  },
  component: ChatPage,
})
