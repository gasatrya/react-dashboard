import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { DataTableProps } from '@/types/table-types'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react'
import DataTableToolbar from './DataTableToolbar'
import { Button } from './ui/button'

export function DataTable<TData, TValue>({
  // table data
  columns,
  data,

  // pagination
  isPagination = true,
  rowCount,
  onPaginationChange,
  pagination,

  // search
  isSearch = true,
  columnFilters,
  onColumnFiltersChange,
  filterId,

  // sorting
  sorting,
  onSortingChange,

  // others
  addNew,
  isTitle = true,
  title,
  isLoading,
  isDownload = true
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
      pagination
    }
  })

  return (
    <>
      <DataTableToolbar
        table={table}
        title={title}
        rowCount={rowCount}
        filterId={filterId}
        isTitle={isTitle}
        isDownload={isDownload}
        isSearch={isSearch}
        addNew={addNew}
      />

      <div className="rounded-md border">
        <div>
          {isLoading ? (
            <div className="pt-10 flex gap-2 justify-center text-primary">
              Loading data
              <LoaderCircle size={20} className="animate-spin" />
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

        {isPagination && (
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
        )}
      </div>
    </>
  )
}
