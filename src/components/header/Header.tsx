import { useAppStore } from '@/store'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import forestLogo from '../../assets/img/f-logo.png'
import { Button } from '../ui/button'
import Profile from './Profile'

export default function Header() {
  const openSidebar = useAppStore((state) => state.openSidebar)
  const setOpenSidebar = useAppStore((state) => state.setOpenSidebar)

  return (
    <header className="bg-background grid grid-cols-12 sticky left-0 top-0 h-14 w-full z-20 shadow-sm">
      <div className="col-start-1 col-end-3">
        <Button
          type="button"
          variant="link"
          className="h-full py-2 px-4 flex items-center gap-1 font-semibold text-sm hover:no-underline text-foreground hover:text-primary"
          onClick={() => {
            setOpenSidebar(!openSidebar)
          }}
        >
          <Menu size={18} />
          {openSidebar ? 'Show Menu' : 'Collapse Menu'}
        </Button>
      </div>

      <div className="flex items-center justify-center px-4 col-start-3 col-end-11">
        <Link to="/" className="flex items-center">
          <img
            src={forestLogo}
            alt="VAS Indonesia"
            width={25}
            height={29}
            className="mr-4"
            decoding="async"
          />
          <span className="text-primary font-extrabold">VAS GATEWAY</span>
        </Link>
      </div>

      <Profile />
    </header>
  )
}
