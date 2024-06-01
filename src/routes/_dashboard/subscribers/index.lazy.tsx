import PageHeader from '@/components/PageHeader'
import SubscribersTable from '@/components/SubscribersTable'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/subscribers/')({
  component: Subscribers,
})

function Subscribers() {
  return (
    <>
      <PageHeader
        page="Subscribers"
        desc="View and manage subscription status for all subscribers"
        parent="Tools & Settings"
      />
      <SubscribersTable />
    </>
  )
}
