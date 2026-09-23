import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useChatStore } from '#/entities/chat'
import { phoneToChatId } from '#/shared/lib/phone.ts'
import { Button } from '#/shared/ui/button.tsx'
import { Input } from '#/shared/ui/input.tsx'
import { phoneSchema, type PhoneFormValues } from '../model/phone-schema.ts'

export function CreateChatForm() {
  const createChat = useChatStore((state) => state.createChat)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PhoneFormValues>({ resolver: zodResolver(phoneSchema) })

  const onSubmit = handleSubmit(({ phone }) => {
    createChat(phoneToChatId(phone), phone)
    reset()
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 border-b border-slate-200 p-3 dark:border-neutral-800"
    >
      <div className="flex gap-2">
        <Input placeholder="+7 999 123-45-67" {...register('phone')} />
        <Button type="submit" className="shrink-0">
          Новый чат
        </Button>
      </div>
      {errors.phone && (
        <p className="text-xs text-red-600">{errors.phone.message}</p>
      )}
      <p className="text-xs text-slate-400">
        Для Telegram-бота: он не может написать первым — попросите получателя
        сначала написать боту, чат появится в списке сам.
      </p>
    </form>
  )
}
