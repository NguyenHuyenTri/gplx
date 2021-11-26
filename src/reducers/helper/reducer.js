import { IPagingResult } from '../../api/core'

export const CRUDReducer = () => {
  return {
    data: [],
    loading: false,
    pagination: {
      page: 1,
      limit: 20,
    },
  }
}
