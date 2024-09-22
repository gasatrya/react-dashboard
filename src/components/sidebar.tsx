import { Button } from '@/components/ui/button'
import fetcher from '@/lib/fetcher'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { MenuItem } from '@/types/menu'
import {
  BarChart,
  Cpu,
  FileText,
  PanelLeftClose,
  Settings,
  Users,
} from 'lucide-react'
import useSWR from 'swr'

export default function Sidebar({ active }: { active: boolean }) {
  const { data: menuItems, error } = useSWR<MenuItem[], Error>(
    'http://localhost:3000/menu',
    fetcher,
  )
  const sidebarOpen = useAppStore((state) => state.sidebarOpen)
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen)

  return (
    <aside
      className={cn(
        'w-72 text-sm 2xl:text-base transition-transform duration-300 fixed py px-3 bg-secondary/50 h-dvh overflow-y-auto border-r',
        active ? '-translate-x-full ' : '',
      )}
    >
      <div className="flex flex-col gap-y-4 h-full">
        <header className="px-2 py-4 flex justify-between items-center border-b">
          <h1 className="text-primary font-bold text-2xl">LOGO</h1>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeftClose size={20} strokeWidth={1.5} />
          </Button>
        </header>

        <nav className="flex flex-col gap-4">
          <ul className="space-y-1">
            {error && <div>Error loading menu</div>}
            {!menuItems && <div>Loading...</div>}
            {menuItems &&
              menuItems.map((item) => {
                let Icon = item.icon
                if (item.name === 'Dashboard') {
                  Icon = <Cpu size={20} strokeWidth={1.5} />
                } else if (item.name === 'Users') {
                  Icon = <Users size={20} strokeWidth={1.5} />
                } else if (item.name === 'Analytics') {
                  Icon = <BarChart size={20} strokeWidth={1.5} />
                } else if (item.name === 'Reports') {
                  Icon = <FileText size={20} strokeWidth={1.5} />
                } else if (item.name === 'Settings') {
                  Icon = <Settings size={20} strokeWidth={1.5} />
                }

                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-x-2.5 font-medium hover:text-primary py-2.5 px-3 hover:bg-secondary rounded-md text-sm"
                    >
                      {Icon}
                      {item.name}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
