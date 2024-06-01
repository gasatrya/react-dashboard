import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/')({
  component: Index
})

function Index() {
  return <div>Dashboard</div>
}
