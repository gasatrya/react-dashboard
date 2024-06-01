import { DataTable } from '@/components/DataTable'
import Wrapper from '@/components/Wrapper'
import { Button } from '@/components/ui/button'
import { useFilters } from '@/hooks/useFilters'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import { SWR_OPTIONS } from '@/utils/constant'
import fetcher from '@/utils/fetch'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { ArrowUpDown, X } from 'lucide-react'
import useSWR from 'swr'

interface SubscribersResponse {
  status: boolean
  message: string
  code: number
  data: SubscribersData
}

interface SubscribersData {
  currentPage: number
  dataPerPage: number
  subscribers: Subscriber[]
  total: number
}

interface Subscriber {
  id: number
  msisdn: string
  operator: string
  service: string
  regDate: string
  unregDate: string | null
  status: string
}

export default function SubscribersTable() {
  const { limit, index, onPaginationChange, pagination } = usePagination()
  const { filters, onColumnFiltersChange, filterId, filterValue } =
    useFilters('msisdn')
  const { sorting, onSortingChange, field, order } = useSorting(
    'regDate',
    'ASC'
  )
  const pageIndex: number = filterValue ? 1 : index + 1 // reset page index if filter value is present.

  const { data, isLoading, mutate } = useSWR<SubscribersResponse>(
    `subscriber-service?page=${pageIndex}&limit=${limit}&telco=TS&sortOrder=${order}&sortBy=${field}${filterValue ? `&${filterId}=${filterValue}` : ''}`,
    fetcher,
    SWR_OPTIONS
  )
  const columnsData: Subscriber[] = data?.data?.subscribers || []
  const rowCount: number = data?.data?.total || 0

  const columns: ColumnDef<Subscriber>[] = [
    {
      accessorKey: 'msisdn',
      header: 'MSISDN',
    },
    {
      accessorKey: 'operator',
      header: 'Operator',
    },
    {
      accessorKey: 'service',
      header: 'Service',
    },
    {
      accessorKey: 'regDate',
      cell: (props) =>
        dayjs(props.row.original.regDate).format('DD MMM YYYY' + ' hh:mm A'),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="p-0 hover:bg-transparent"
          >
            Reg Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'unregDate',
      header: 'Unreg Date',
      cell: (props) =>
        props.row.original.unregDate && props.row.original.unregDate !== 'null'
          ? dayjs(props.row.original.unregDate).format(
              'DD MMM YYYY' + ' hh:mm A'
            )
          : 'N/A',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (props) => (
        <span
          className={
            props.row.original.status === 'ACTIVE'
              ? 'text-primary'
              : 'text-destructive'
          }
        >
          {props.row.original.status}
        </span>
      ),
    },
    {
      accessorKey: 'blacklist',
      header: 'Blacklist',
      cell: (props) => (
        <Button
          size="sm"
          variant={
            props.row.original.status === 'ACTIVE' ? 'secondary' : 'destructive'
          }
          className="rounded-full h-5 w-5 p-0"
          onClick={() => {
            fetcher(`subscriber-service/blacklist/${props.row.original.id}`, {
              method: 'DELETE',
            })
              .then(() => {
                mutate()
              })
              .catch((err) => {
                console.log(err)
              })
          }}
          disabled={props.row.original.status === 'BLACKLISTED'}
        >
          <X size={12} />
        </Button>
      ),
    },
  ]

  return (
    <Wrapper title="List of Subscribers">
      <DataTable
        columns={columns}
        data={columnsData}
        rowCount={rowCount}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        isLoading={isLoading}
        columnFilters={filters}
        onColumnFiltersChange={onColumnFiltersChange}
        filterId={filterId}
        onSortingChange={onSortingChange}
        sorting={sorting}
      />
    </Wrapper>
  )
}
