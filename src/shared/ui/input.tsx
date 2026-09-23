import type { InputHTMLAttributes } from 'react'
import { cn } from '#/shared/lib/utils.ts'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900',
        'outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-100',
        'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-accent-700/40',
        className,
      )}
      {...props}
    />
  )
}
