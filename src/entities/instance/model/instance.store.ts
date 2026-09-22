import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InstanceCredentials } from '#/shared/api/green-api/types.ts'

interface InstanceState {
  credentials: InstanceCredentials | null
  setCredentials: (credentials: InstanceCredentials) => void
  logout: () => void
}

/**
 * idInstance/apiTokenInstance живут только в localStorage браузера
 * пользователя — сервера-бэкенда в задании нет, а хранить учётные данные
 * GREEN-API где-то нужно, чтобы не вводить их при каждом обновлении страницы.
 */
export const useInstanceStore = create<InstanceState>()(
  persist(
    (set) => ({
      credentials: null,
      setCredentials: (credentials) => set({ credentials }),
      logout: () => set({ credentials: null }),
    }),
    { name: 'green-api-instance' },
  ),
)
