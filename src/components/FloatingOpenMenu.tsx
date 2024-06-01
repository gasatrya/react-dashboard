import { useAppStore } from '@/store'
import { Button } from './ui/button'
import { PanelRightClose } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

export default function FloatingOpenMenu() {
  const { openSidebar, setOpenSidebar } = useAppStore(
    useShallow((state) => ({
      openSidebar: state.openSidebar,
      setOpenSidebar: state.setOpenSidebar
    }))
  )

  return (
    openSidebar && (
      <Button
        className="fixed bottom-5 left-5 z-20 flex gap-x-2"
        onClick={() => {
          setOpenSidebar(!openSidebar)
        }}
      >
        <PanelRightClose size={18} strokeWidth={1.5} />
        Show Menu
      </Button>
    )
  )
}
