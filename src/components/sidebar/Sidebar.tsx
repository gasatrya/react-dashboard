import { ScrollArea } from '@/components/ui/scroll-area'
import { Link } from '@tanstack/react-router'
import { Cpu } from 'lucide-react'
import Menu from './Menu'

export default function Sidebar({ active }: { active: boolean }) {
  return (
    <aside
      className={`w-64 text-sm 2xl:text-base transition-transform duration-300 fixed ${
        active ? '-translate-x-full ' : ''
      }`}
    >
      <ScrollArea className="h-screen">
        <div className="p-6 pl-0 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="uppercase text-xs font-medium tracking-wider">
              Service Overview
            </h2>
            <ul>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 font-semibold hover:text-primary"
                >
                  <Cpu size={17} />
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="uppercase text-xs font-medium tracking-wider">
              Service Management
            </h2>
            <Menu />
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
