import { routeTree } from '#/routeTree.gen'
import { createRouter } from '@tanstack/react-router'
import RouteError from './ui/route-error.component.tsx'
import RouteNotFound from './ui/route-not-found.component.tsx'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultErrorComponent: RouteError,
  defaultNotFoundComponent: RouteNotFound,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
