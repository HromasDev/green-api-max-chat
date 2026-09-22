import { Link } from '@tanstack/react-router'

export default function RouteNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-slate-600">
      <p>Страница не найдена</p>
      <Link to="/" className="text-emerald-600 underline">
        На главную
      </Link>
    </div>
  )
}
