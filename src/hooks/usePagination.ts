import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'

export function usePagination(size: number = 10): {
  limit: number
  index: number
  onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>
  pagination: PaginationState
} {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: size,
    pageIndex: 0
  })
  const { pageSize, pageIndex } = pagination

  return {
    limit: pageSize,
    index: pageIndex,
    onPaginationChange: setPagination,
    pagination
  }
}
