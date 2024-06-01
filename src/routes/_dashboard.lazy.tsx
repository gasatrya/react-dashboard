import FloatingOpenMenu from '@/components/FloatingOpenMenu'
import Sidebar from '@/components/sidebar/Sidebar'
import { useAppStore } from '@/store'
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard')({
  component: DashboardLayout
})

function DashboardLayout() {
  const openSidebar = useAppStore((state) => state.openSidebar)

  return (
    <div className="text-sm 2xl:text-base md:text-base antialiased relative">
      <div className="bg-body-pattern bg-body-pattern-size bg-repeat h-full w-full absolute top-0 left-0 z-0"></div>
      {/* <Header /> */}
      <div className="flex min-h-screen overflow-hidden w-full bg-background">
        <Sidebar active={openSidebar} />
        <div
          className={`p-10 transition-all duration-300 w-full z-10 ${
            openSidebar ? 'ml-0' : 'ml-72'
          }`}
        >
          <Outlet />
        </div>
      </div>

      <FloatingOpenMenu />
    </div>
  )
}
