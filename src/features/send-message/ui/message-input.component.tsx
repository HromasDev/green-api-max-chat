import { type SubmitEvent, useState } from 'react'
import type { InstanceCredentials } from '#/shared/api/green-api/types.ts'
import { Button } from '#/shared/ui/button.tsx'
import { Input } from '#/shared/ui/input.tsx'
import { useSendMessage } from '../model/use-send-message.ts'

export function MessageInput({
  chatId,
  credentials,
}: {
  chatId: string
  credentials: InstanceCredentials
}) {
  const [text, setText] = useState('')
  const sendMessage = useSendMessage(credentials)

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    sendMessage.mutate({ chatId, text: trimmed })
    setText('')
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 border-t border-slate-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Сообщение"
        autoFocus
      />
      <Button type="submit" disabled={!text.trim()} className="shrink-0">
        Отправить
      </Button>
    </form>
  )
}
