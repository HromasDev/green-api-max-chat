import { beforeEach, describe, expect, it } from 'vitest'
import { useChatStore } from './chat.store.ts'

const CHAT_ID = '79991234567@c.us'

beforeEach(() => {
  useChatStore.setState({ chats: [], messagesByChatId: {}, activeChatId: null })
})

describe('createChat', () => {
  it('добавляет новый чат и делает его активным', () => {
    useChatStore.getState().createChat(CHAT_ID, '+7 999 123-45-67')

    const { chats, activeChatId } = useChatStore.getState()
    expect(chats).toHaveLength(1)
    expect(chats[0].chatId).toBe(CHAT_ID)
    expect(activeChatId).toBe(CHAT_ID)
  })

  it('не дублирует чат при повторном вызове, только переключает активный', () => {
    useChatStore.getState().createChat(CHAT_ID, '+7 999 123-45-67')
    useChatStore.getState().setActiveChat(null as unknown as string)
    useChatStore.getState().createChat(CHAT_ID, '+7 999 123-45-67')

    expect(useChatStore.getState().chats).toHaveLength(1)
    expect(useChatStore.getState().activeChatId).toBe(CHAT_ID)
  })
})

describe('addMessage', () => {
  it('добавляет сообщение в чат', () => {
    useChatStore.getState().addMessage({
      id: '1',
      chatId: CHAT_ID,
      text: 'привет',
      direction: 'incoming',
      status: 'sent',
      timestamp: 1,
    })

    expect(useChatStore.getState().messagesByChatId[CHAT_ID]).toHaveLength(1)
  })

  it('игнорирует повторное уведомление с тем же id', () => {
    const message = {
      id: '1',
      chatId: CHAT_ID,
      text: 'привет',
      direction: 'incoming' as const,
      status: 'sent' as const,
      timestamp: 1,
    }

    useChatStore.getState().addMessage(message)
    useChatStore.getState().addMessage(message)

    expect(useChatStore.getState().messagesByChatId[CHAT_ID]).toHaveLength(1)
  })
})

describe('updateMessageStatus', () => {
  it('меняет статус конкретного сообщения, не трогая остальные', () => {
    useChatStore.getState().addMessage({
      id: '1',
      chatId: CHAT_ID,
      text: 'первое',
      direction: 'outgoing',
      status: 'sending',
      timestamp: 1,
    })
    useChatStore.getState().addMessage({
      id: '2',
      chatId: CHAT_ID,
      text: 'второе',
      direction: 'outgoing',
      status: 'sending',
      timestamp: 2,
    })

    useChatStore.getState().updateMessageStatus(CHAT_ID, '1', 'sent')

    const messages = useChatStore.getState().messagesByChatId[CHAT_ID]
    expect(messages.find((m) => m.id === '1')?.status).toBe('sent')
    expect(messages.find((m) => m.id === '2')?.status).toBe('sending')
  })
})
