import { beforeEach, describe, expect, it } from 'vitest'
import { useInstanceStore } from './instance.store.ts'

beforeEach(() => {
  useInstanceStore.setState({ credentials: null })
})

describe('instance store', () => {
  it('сохраняет учётные данные', () => {
    const credentials = { idInstance: '123', apiTokenInstance: 'token' }
    useInstanceStore.getState().setCredentials(credentials)

    expect(useInstanceStore.getState().credentials).toEqual(credentials)
  })

  it('logout сбрасывает учётные данные', () => {
    useInstanceStore
      .getState()
      .setCredentials({ idInstance: '123', apiTokenInstance: 'token' })

    useInstanceStore.getState().logout()

    expect(useInstanceStore.getState().credentials).toBeNull()
  })
})
