import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/toaster'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
})
