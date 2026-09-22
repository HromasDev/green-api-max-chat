import { createFileRoute, redirect } from '@tanstack/react-router'
import { useInstanceStore } from '#/entities/instance'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const isLoggedIn = useInstanceStore.getState().credentials !== null
    throw redirect({ to: isLoggedIn ? '/chat' : '/login' })
  },
})
