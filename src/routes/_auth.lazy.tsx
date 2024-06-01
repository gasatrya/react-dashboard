import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="text-sm 2xl:text-base md:text-base antialiased bg-body-cover bg-cover bg-center bg-fixed relative">
      <div className="bg-body-pattern bg-body-pattern-size bg-repeat h-full w-full absolute top-0 left-0 z-0"></div>
      <Outlet />
    </div>
  )
}
