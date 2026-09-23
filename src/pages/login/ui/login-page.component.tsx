import { LoginForm } from '#/features/auth-login/ui/login-form.component.tsx'
import { ThemeToggle } from '#/features/toggle-theme/ui/theme-toggle.component.tsx'

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-neutral-950">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white p-8 dark:bg-neutral-900">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-neutral-100">
            MAX Chat
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
            Вход через GREEN-API
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
