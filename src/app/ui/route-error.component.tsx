import type { ErrorComponentProps } from '@tanstack/react-router'

export default function RouteError({ error }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : 'Неизвестная ошибка'
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-slate-600">
      <p>Что-то пошло не так</p>
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  )
}
