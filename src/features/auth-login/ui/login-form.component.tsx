import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useInstanceStore } from '#/entities/instance'
import { Button } from '#/shared/ui/button.tsx'
import { Input } from '#/shared/ui/input.tsx'
import { loginSchema, type LoginFormValues } from '../model/login-schema.ts'
import { useLogin } from '../model/use-login.ts'

export function LoginForm() {
  const setCredentials = useInstanceStore((state) => state.setCredentials)
  const login = useLogin()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: (credentials) => {
        setCredentials(credentials)
        navigate({ to: '/chat' })
      },
    })
  })

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="idInstance"
          className="text-sm font-medium text-slate-700 dark:text-neutral-300"
        >
          idInstance
        </label>
        <Input
          id="idInstance"
          placeholder="1101000001"
          {...register('idInstance')}
        />
        {errors.idInstance && (
          <p className="text-xs text-red-600">{errors.idInstance.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="apiTokenInstance"
          className="text-sm font-medium text-slate-700 dark:text-neutral-300"
        >
          apiTokenInstance
        </label>
        <Input
          id="apiTokenInstance"
          type="password"
          placeholder="d0e0e8c8c8b74d0…"
          {...register('apiTokenInstance')}
        />
        {errors.apiTokenInstance && (
          <p className="text-xs text-red-600">
            {errors.apiTokenInstance.message}
          </p>
        )}
      </div>

      {login.isError && (
        <p className="text-sm text-red-600">{login.error.message}</p>
      )}

      <Button type="submit" disabled={login.isPending}>
        {login.isPending ? 'Проверка…' : 'Войти'}
      </Button>
    </form>
  )
}
