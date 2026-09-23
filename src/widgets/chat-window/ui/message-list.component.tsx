import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef } from 'react'
import { MessageBubble } from '#/entities/message/ui/message-bubble.component.tsx'
import type { ChatMessage } from '#/entities/message/model/message.ts'

export function MessageList({ messages }: { messages: Array<ChatMessage> }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 56,
    overscan: 8,
  })

  useEffect(() => {
    if (messages.length === 0) return
    virtualizer.scrollToIndex(messages.length - 1, { align: 'end' })
  }, [messages.length, virtualizer])

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="text-center text-sm text-slate-400">Сообщений пока нет</p>
      </div>
    )
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4">
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            ref={virtualizer.measureElement}
            data-index={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
            className="pb-2"
          >
            <MessageBubble message={messages[virtualItem.index]!} />
          </div>
        ))}
      </div>
    </div>
  )
}
