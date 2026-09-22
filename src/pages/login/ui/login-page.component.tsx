import { LoginForm } from '#/features/auth-login/ui/login-form.component.tsx'

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">MAX Chat</h1>
          <p className="mt-1 text-sm text-slate-500">Вход через GREEN-API</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
