/**
 * Контракт GREEN-API (REST, без SDK — см. shared/api/green-api/client.ts).
 * Формы ответов взяты из официальной документации:
 * https://green-api.com/v3/docs/api/sending/SendMessage/
 * https://green-api.com/v3/docs/api/receiving/technology-http-api/
 */

export interface InstanceCredentials {
  idInstance: string
  apiTokenInstance: string
}

export type StateInstance =
  'notAuthorized' | 'authorized' | 'blocked' | 'sleepMode' | 'starting'

export interface GetStateInstanceResponse {
  stateInstance: StateInstance
}

export interface SendMessageRequest {
  chatId: string
  message: string
}

export interface SendMessageResponse {
  idMessage: string
}

interface SenderData {
  chatId: string
  chatName?: string
  sender: string
  senderName?: string
}

interface TextMessageData {
  typeMessage: 'textMessage'
  textMessageData: { textMessage: string }
}

interface ExtendedTextMessageData {
  typeMessage: 'extendedTextMessage'
  extendedTextMessageData: { text: string }
}

/** Прочие типы сообщений (медиа, стикеры и т.д.) — вне задания, но приходят в очередь. */
interface OtherMessageData {
  typeMessage: Exclude<string, 'textMessage' | 'extendedTextMessage'>
}

type MessageData = TextMessageData | ExtendedTextMessageData | OtherMessageData

export interface IncomingMessageNotification {
  typeWebhook: 'incomingMessageReceived'
  timestamp: number
  idMessage: string
  senderData: SenderData
  messageData: MessageData
}

export interface OutgoingMessageNotification {
  typeWebhook: 'outgoingMessageStatus' | 'outgoingAPIMessageReceived'
  timestamp: number
  idMessage: string
  status?: string
  chatId?: string
  sendByApi?: boolean
  [key: string]: unknown
}

export type NotificationBody =
  | IncomingMessageNotification
  | OutgoingMessageNotification
  | { typeWebhook: string; [key: string]: unknown }

export interface ReceiveNotificationResponse {
  receiptId: number
  body: NotificationBody
}

export function isIncomingTextMessage(
  body: NotificationBody,
): body is IncomingMessageNotification {
  if (body.typeWebhook !== 'incomingMessageReceived') return false
  const messageData = (body as IncomingMessageNotification).messageData
  return (
    messageData.typeMessage === 'textMessage' ||
    messageData.typeMessage === 'extendedTextMessage'
  )
}

export function extractText(messageData: MessageData): string {
  if (messageData.typeMessage === 'textMessage') {
    return (messageData as TextMessageData).textMessageData.textMessage
  }
  if (messageData.typeMessage === 'extendedTextMessage') {
    return (messageData as ExtendedTextMessageData).extendedTextMessageData.text
  }
  return ''
}
