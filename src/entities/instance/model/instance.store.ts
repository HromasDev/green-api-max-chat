import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InstanceCredentials } from '#/shared/api/green-api/types.ts'

interface InstanceState {
  credentials: InstanceCredentials | null
  setCredentials: (credentials: InstanceCredentials) => void
  logout: () => void
}

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
