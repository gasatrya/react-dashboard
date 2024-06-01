'use client'

import profileDummy from '@/assets/img/profile.jpg'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { useAppStore } from '@/store'
import { ChevronsUpDown, LogOut, UserCircle2 } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'

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
        variant: 'success',
      })
      setTimeout(() => {
        navigate({
          to: '/login',
        })
      }, 1000)
    }
  }

  return (
    <div className="ml-auto relative col-start-11 col-end-13 flex items-center">
      <Popover>
        <PopoverTrigger className="flex items-center text-sm h-full py-2 px-4 hover:text-primary">
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
        <PopoverContent className="w-40 p-1" align="start" alignOffset={-20}>
          <div>
            <Link
              className="flex items-center p-3 text-sm font-medium hover:text-primary"
              to="/"
            >
              Profile
              <UserCircle2 size={16} className="ml-auto" />
            </Link>
          </div>
          <div>
            <Button
              variant="link"
              type="button"
              className="flex items-center p-3 text-sm font-medium hover:text-primary last:border-t w-full hover:no-underline text-foreground rounded-none"
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
