import { SortingState } from '@tanstack/react-table'
import { useState } from 'react'

export function useSorting(
  initialField: string = 'id',
  initialOrder: 'ASC' | 'DESC' = 'DESC'
): {
  sorting: SortingState
  onSortingChange: React.Dispatch<React.SetStateAction<SortingState>>
  order: 'ASC' | 'DESC'
  field: string
} {
  const [sorting, setSorting] = useState<SortingState>([
    { id: initialField, desc: initialOrder === 'DESC' }
  ])

  const order = !sorting.length
    ? initialOrder
    : sorting[0].desc
      ? 'DESC'
      : 'ASC'
  const field = sorting.length ? sorting[0].id : initialField

  return {
    sorting,
    onSortingChange: setSorting,
    order,
    field
  }
}
