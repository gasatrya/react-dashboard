import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 25,
    pageIndex: 0,
  })
  const { pageSize, pageIndex } = pagination

  return {
    limit: pageSize,
    index: pageIndex,
    onPaginationChange: setPagination,
    pagination,
  }
}
