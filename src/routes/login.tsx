import { createFileRoute, redirect } from '@tanstack/react-router'
import { useInstanceStore } from '#/entities/instance'
import { LoginPage } from '#/pages/login/ui/login-page.component.tsx'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (useInstanceStore.getState().credentials !== null) {
      throw redirect({ to: '/chat' })
    }
  },
  component: LoginPage,
})
