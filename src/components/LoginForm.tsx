import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { loginRequest } from '@/services/api-login'
import { useAppStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from '@tanstack/react-router'
import useSWRMutation from 'swr/mutation'
import { z } from 'zod'
import { mutate } from 'swr'

const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.boolean().optional()
})

export default function LoginForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const addToken = useAppStore((state) => state.addToken)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false
    }
  })

  const { trigger, isMutating } = useSWRMutation('auth/login', loginRequest, {
    onSuccess: (data) => {
      if (data?.code === 200) {
        addToken(data?.data?.auth_token)
        toast({
          title: 'Login Success!',
          description: 'You will be redirected to dashboard',
          variant: 'success'
        })
        setTimeout(() => {
          navigate({
            to: '/'
          })
        }, 1000)
      } else {
        toast({
          title: data?.message,
          description: 'Please try again',
          variant: 'destructive'
        })
      }
    },
    onError: () => {
      toast({
        title: 'Login Failed!',
        description: 'Something went wrong, please try again',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    trigger({ username: values.username, password: values.password })
    mutate(
      (key) => typeof key === 'string' && key.startsWith('role-menu'),
      undefined,
      { revalidate: true }
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-left flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>
                  Password <span className="text-destructive">*</span>
                </FormLabel>
                <Link
                  to="/"
                  className="ml-auto font-normal text-xs text-muted-foreground hover:text-primary"
                  tabIndex={-1}
                >
                  Forgot Password?
                </Link>
              </div>
              <FormControl>
                <Input
                  className="focus-visible:ring-primary"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember Me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button disabled={isMutating} type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  )
}
