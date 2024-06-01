export interface ApiResponse<T> {
  status: boolean
  message: string
  code: number
  data: T
}

export interface PaginationData<T> {
  currentPage: number
  dataPerPage: number
  total: number
  data: T[]
}
