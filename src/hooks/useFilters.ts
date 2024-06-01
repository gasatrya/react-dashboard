import { ColumnFiltersState } from '@tanstack/react-table'
import { useState } from 'react'

export function useFilters(id: string = 'id', value: string = '') {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: id, value: value },
  ])

  return {
    filters: columnFilters,
    onColumnFiltersChange: setColumnFilters,
    filterId: columnFilters.length ? columnFilters[0].id : id,
    filterValue: columnFilters.length ? columnFilters[0].value : value,
  }
}
