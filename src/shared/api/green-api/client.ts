import type {
  GetStateInstanceResponse,
  InstanceCredentials,
  ReceiveNotificationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from './types.ts'

/**
 * Без SDK green-api: методов задания (SendMessage, receiveNotification,
 * deleteNotification, плюс getStateInstance для проверки учётных данных на
 * логин-форме) четыре, обёртка над fetch тоньше, чем интеграция пакета.
 */
export class GreenApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'GreenApiError'
    this.status = status
  }
}

const BASE_URL = 'https://api.green-api.com'

function instanceUrl(
  { idInstance, apiTokenInstance }: InstanceCredentials,
  method: string,
): string {
  return `${BASE_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`
}

async function request<T>(
  url: string,
  init?: RequestInit,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response
  try {
    response = await fetch(url, { ...init, signal })
  } catch (cause) {
    if ((cause as { name?: string }).name === 'AbortError') throw cause
    throw new GreenApiError(0, 'Нет соединения с GREEN-API')
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new GreenApiError(response.status, text || `HTTP ${response.status}`)
  }

  // 204 у deleteNotification/some ответов без тела.
  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}

export function getStateInstance(
  credentials: InstanceCredentials,
  signal?: AbortSignal,
): Promise<GetStateInstanceResponse> {
  return request(
    instanceUrl(credentials, 'getStateInstance'),
    undefined,
    signal,
  )
}

export function sendMessage(
  credentials: InstanceCredentials,
  body: SendMessageRequest,
): Promise<SendMessageResponse> {
  return request(instanceUrl(credentials, 'sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

/**
 * Технология HTTP API: клиент сам вычитывает очередь входящих уведомлений
 * поллингом. Ответ — `null`, если очередь пуста прямо сейчас (не ошибка).
 */
export function receiveNotification(
  credentials: InstanceCredentials,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse | null> {
  return request(
    instanceUrl(credentials, 'receiveNotification'),
    undefined,
    signal,
  )
}

/**
 * Обязателен после каждой обработки: непрочитанные уведомления не исчезают
 * сами и будут выданы повторно при следующем receiveNotification.
 */
export function deleteNotification(
  credentials: InstanceCredentials,
  receiptId: number,
): Promise<{ result: boolean }> {
  return request(
    `${instanceUrl(credentials, 'deleteNotification')}/${receiptId}`,
    { method: 'DELETE' },
  )
}
