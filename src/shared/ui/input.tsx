import type { InputHTMLAttributes } from 'react'
import { cn } from '#/shared/lib/utils.ts'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm',
        'outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100',
        className,
      )}
      {...props}
    />
  )
}
