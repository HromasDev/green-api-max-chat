import { describe, expect, it } from 'vitest'
import { extractText, isIncomingTextMessage } from './types.ts'
import type { NotificationBody } from './types.ts'

describe('isIncomingTextMessage', () => {
  it('принимает textMessage', () => {
    const body: NotificationBody = {
      typeWebhook: 'incomingMessageReceived',
      timestamp: 0,
      idMessage: '1',
      senderData: { chatId: '79991234567@c.us', sender: '79991234567@c.us' },
      messageData: {
        typeMessage: 'textMessage',
        textMessageData: { textMessage: 'привет' },
      },
    }
    expect(isIncomingTextMessage(body)).toBe(true)
  })

  it('принимает extendedTextMessage', () => {
    const body: NotificationBody = {
      typeWebhook: 'incomingMessageReceived',
      timestamp: 0,
      idMessage: '1',
      senderData: { chatId: '79991234567@c.us', sender: '79991234567@c.us' },
      messageData: {
        typeMessage: 'extendedTextMessage',
        extendedTextMessageData: { text: 'привет' },
      },
    }
    expect(isIncomingTextMessage(body)).toBe(true)
  })

  it('отклоняет уведомления не о входящем сообщении', () => {
    const body: NotificationBody = {
      typeWebhook: 'outgoingMessageStatus',
      timestamp: 0,
      idMessage: '1',
    }
    expect(isIncomingTextMessage(body)).toBe(false)
  })

  it('отклоняет медиасообщения', () => {
    const body: NotificationBody = {
      typeWebhook: 'incomingMessageReceived',
      timestamp: 0,
      idMessage: '1',
      senderData: { chatId: '79991234567@c.us', sender: '79991234567@c.us' },
      messageData: { typeMessage: 'imageMessage' },
    }
    expect(isIncomingTextMessage(body)).toBe(false)
  })
})

describe('extractText', () => {
  it('достаёт текст из textMessage', () => {
    expect(
      extractText({
        typeMessage: 'textMessage',
        textMessageData: { textMessage: 'привет' },
      }),
    ).toBe('привет')
  })

  it('достаёт текст из extendedTextMessage', () => {
    expect(
      extractText({
        typeMessage: 'extendedTextMessage',
        extendedTextMessageData: { text: 'привет' },
      }),
    ).toBe('привет')
  })

  it('возвращает пустую строку для остальных типов', () => {
    expect(extractText({ typeMessage: 'imageMessage' })).toBe('')
  })
})
