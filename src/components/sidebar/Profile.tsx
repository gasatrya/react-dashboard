import profileDummy from '@/assets/img/profile.jpg'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { useAppStore } from '@/store'
import { useNavigate } from '@tanstack/react-router'
import { ChevronsUpDown, LogOut } from 'lucide-react'

export default function Profile() {
  const { toast } = useToast()
  const token = useAppStore((state) => state.token)
  const resetToken = useAppStore((state) => state.resetToken)
  const navigate = useNavigate()

  const handleLogout = () => {
    if (token) {
      resetToken()
      toast({
        title: 'Logout Succesful!',
        description: 'Bye bye 👋',
        variant: 'success'
      })
      setTimeout(() => {
        navigate({
          to: '/login'
        })
      }, 1000)
    }
  }

  return (
    <div className="border-t pt-3 mt-3">
      <Popover>
        <PopoverTrigger className="flex items-center text-sm h-full p-0 hover:text-primary">
          <img
            src={profileDummy}
            width={32}
            height={32}
            alt="Name"
            className="rounded-full mr-2"
            decoding="async"
          />
          <span className="font-medium mr-2">Hi, There</span>
          <span>
            <ChevronsUpDown size={16} />
          </span>
        </PopoverTrigger>
        <PopoverContent className="p-1 m-2 w-52" align="start" side="top">
          <div>
            <Button
              variant="link"
              type="button"
              className="flex items-center p-3 text-sm font-medium hover:text-primary w-full hover:no-underline text-foreground rounded-none"
              onClick={handleLogout}
            >
              Logout
              <LogOut size={16} className="ml-auto" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
