import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { DataTableToolbarProps } from '@/types/table-types'
import { Download, Search } from 'lucide-react'
import { Button } from './ui/button'
import { DebouncedInput } from './ui/inputDebounce'
import { DataTableViewOptions } from './DataTableViewOptions'
import { DataTableFacetedFilter } from './DataTableFacetedFilter'

export default function DataTableToolbar<TData>({
  table,
  title,
  rowCount,
  filterId,
  addNew,
  isTitle,
  isDownload,
  isSearch
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center py-2 gap-2">
      <div className="flex flex-col gap-x-2">
        {isTitle && <p className="text-lg font-semibold">{title}</p>}
        <p className="text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {rowCount}
        </p>
      </div>
      <div className="flex items-center py-2 gap-2 justify-end ml-auto">
        {isDownload && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  size="sm"
                  className="text-foreground h-8"
                >
                  <Download size={18} strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Excel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {isSearch && (
          <div className="relative flex justify-end items-center">
            <Search
              size={18}
              className="text-muted-foreground absolute left-2"
            />
            <DebouncedInput
              placeholder={`Search by`}
              value={
                (table.getColumn('name' || '')?.getFilterValue() as string) ??
                ''
              }
              onChange={(value) =>
                table.getColumn('name' || '')?.setFilterValue(value)
              }
              className="focus-visible:ring-primary h-8 pl-9"
            />
          </div>
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={[
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Blacklisted', value: 'BLACKLISTED' }
            ]}
          />
        )}
        <DataTableViewOptions table={table} />
        {addNew}
      </div>
    </div>
  )
}
