import { cn } from '#/shared/lib/utils.ts'
import type { ChatMessage } from '../model/message.ts'

const formatTime = (timestamp: number): string =>
  new Date(timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isOutgoing = message.direction === 'outgoing'

  return (
    <div className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-3.5 py-2 text-[15px] leading-snug',
          isOutgoing
            ? 'rounded-br-sm bg-accent-600 text-white'
            : 'rounded-bl-sm bg-white text-slate-900 dark:bg-neutral-800 dark:text-neutral-100',
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <div
          className={cn(
            'mt-1 flex items-center justify-end gap-1 text-[11px]',
            isOutgoing ? 'text-accent-100' : 'text-slate-400',
          )}
        >
          <span>{formatTime(message.timestamp)}</span>
          {isOutgoing && message.status === 'sending' && (
            <span>·&nbsp;отправка…</span>
          )}
          {isOutgoing && message.status === 'failed' && (
            <span className="text-red-200">·&nbsp;ошибка</span>
          )}
        </div>
      </div>
    </div>
  )
}
