import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient } from './app/providers/query-client.ts'
import { router } from './app/router.tsx'
import './app/styles.css'
import '#/shared/lib/theme.store.ts'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('#root не найден')

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
