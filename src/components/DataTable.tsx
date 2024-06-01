'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  LoaderCircle,
  Search,
} from 'lucide-react'
import { Button } from './ui/button'
import { DebouncedInput } from './ui/inputDebounce'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean

  rowCount?: number
  onPaginationChange?: OnChangeFn<PaginationState>
  pagination?: PaginationState

  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
  filterId: string

  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,

  rowCount,
  onPaginationChange,
  pagination,

  columnFilters,
  onColumnFiltersChange,
  filterId,

  sorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // sorting
    manualSorting: true,
    onSortingChange: onSortingChange,

    // pagination
    onPaginationChange: onPaginationChange,
    manualPagination: true,
    rowCount: rowCount,
    autoResetPageIndex: false,

    // filtering
    onColumnFiltersChange: onColumnFiltersChange,
    manualFiltering: true,

    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  return (
    <>
      <div className="flex items-center py-4 gap-2">
        <div className="relative flex justify-end items-center">
          <DebouncedInput
            placeholder={`Search by ${filterId}`}
            value={
              (table.getColumn(filterId)?.getFilterValue() as string) ?? ''
            }
            onChange={(value) =>
              table.getColumn(filterId)?.setFilterValue(value)
            }
            className="focus-visible:ring-primary"
          />
          <Search size={20} className="text-border absolute right-2" />
        </div>
        <Button className="flex gap-2 flex-row ml-auto">
          <Download size={18} />
          Download Excel
        </Button>
      </div>
      <div className="rounded-md border">
        <div>
          {isLoading ? (
            <div className="pt-10 flex gap-2 justify-center text-primary">
              Loading data <LoaderCircle size={20} className="animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-secondary">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex items-center justify-center space-x-2 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage()
              setTimeout(
                () => window.scrollTo({ top: 150, behavior: 'smooth' }),
                500
              )
            }}
            disabled={!table.getCanPreviousPage()}
            className="flex gap-x-1 items-center"
          >
            <ChevronLeft size={18} /> Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              table.nextPage()
              setTimeout(
                () => window.scrollTo({ top: 150, behavior: 'smooth' }),
                500
              )
            }}
            disabled={!table.getCanNextPage()}
            className="flex gap-x-1 items-center"
          >
            Next <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </>
  )
}
