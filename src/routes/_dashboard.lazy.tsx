import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { useAppStore } from '@/store'
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const openSidebar = useAppStore((state) => state.openSidebar)

  return (
    <div className="text-sm 2xl:text-base md:text-base antialiased bg-body-cover bg-cover bg-center bg-fixed relative">
      <div className="bg-body-pattern bg-body-pattern-size bg-repeat h-full w-full absolute top-0 left-0 z-0"></div>
      <Header />
      <div className="flex min-h-screen overflow-hidden px-4 w-full">
        <Sidebar active={openSidebar} />
        <div
          className={`py-6 px-6 transition-all duration-300 w-full z-10 ${
            openSidebar ? 'ml-0' : 'ml-64'
          }`}
        >
          <Outlet />
          <div className="mt-8 pt-3 border-t border-border font-semibold text-meta text-sm">
            From Forest, by Forest, for Forest
          </div>
        </div>
      </div>
    </div>
  )
}
