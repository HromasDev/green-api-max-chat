import { useMutation } from '@tanstack/react-query'
import {
  getStateInstance,
  GreenApiError,
} from '#/shared/api/green-api/client.ts'
import type { InstanceCredentials } from '#/shared/api/green-api/types.ts'

/**
 * Логин здесь не «вход в аккаунт» (GREEN-API stateless и не выдаёт сессий) —
 * это проверка, что idInstance/apiTokenInstance вообще валидны и инстанс
 * авторизован в MAX, прежде чем пускать пользователя в чат.
 */
export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: InstanceCredentials) => {
      const { stateInstance } = await getStateInstance(credentials)
      if (stateInstance !== 'authorized') {
        throw new GreenApiError(
          0,
          stateInstance === 'notAuthorized'
            ? 'Инстанс не авторизован в MAX. Отсканируйте QR-код в личном кабинете GREEN-API.'
            : `Инстанс сейчас недоступен (статус: ${stateInstance}).`,
        )
      }
      return credentials
    },
  })
}
