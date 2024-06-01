import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SWR_OPTIONS } from '@/utils/constant'
import fetcher from '@/utils/fetch'
import {
  Braces,
  CalendarDays,
  Flag,
  GalleryHorizontalEnd,
  LoaderCircle,
  Settings,
  Users,
} from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import useSWR from 'swr'
import { useToast } from '../ui/use-toast'

interface MenuType {
  code: number
  data: MenuData[]
  message: string
  status: boolean
}

interface MenuData {
  id: number
  title: string
  icon: JSX.Element
  submenu: SubmenuType[]
}

interface SubmenuType {
  id: number
  title: string
  icon: string | null
}

export default function Menu() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { data: menu, isLoading } = useSWR<MenuType>('role-menu', fetcher, {
    ...SWR_OPTIONS,
    onSuccess: (data) => {
      if (data?.code !== 200) {
        toast({
          title: data?.message,
          description: 'You will be redirected to the login page',
          variant: 'destructive',
        })
        setTimeout(() => {
          navigate({
            to: '/login',
          })
        }, 1000)
      }
    },
  })

  return (
    <div className="flex flex-col gap-4">
      {isLoading && (
        <div className="flex gap-x-2 text-primary">
          Loading menu <LoaderCircle size={20} className="animate-spin" />
        </div>
      )}
      <Accordion type="single" collapsible>
        {menu?.data?.map((item) => {
          let Icon = item.icon
          if (item.title === 'Scheduler') {
            Icon = <CalendarDays size={17} />
          } else if (item.title === 'Content') {
            Icon = <GalleryHorizontalEnd size={17} />
          } else if (item.title === 'Tools & Settings') {
            Icon = <Settings size={17} />
          } else if (item.title === 'Reports & Monitoring') {
            Icon = <Flag size={17} />
          } else if (item.title === 'Users Management') {
            Icon = <Users size={17} />
          } else {
            Icon = <Braces size={17} />
          }

          return (
            <AccordionItem
              value={`${item.id}`}
              key={item.id}
              className="border-none"
            >
              <AccordionTrigger className="py-2 justify-normal last-of-type:[&_svg]:ml-auto gap-2">
                {Icon}
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul id={`menu-${item.id}`} className="ml-7 [&_li]:py-1">
                  {item.submenu.map((item, index) => {
                    const url = `/${item.title
                      .replace(/\s+/g, '-')
                      .toLowerCase()}`

                    return (
                      <li key={index}>
                        <Link to={url} className="hover:text-primary">
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
