// imports
import { get } from '@/api/modules/fetcher'
import ExpenseModel from '@/api/models/expense.model'
import Pagination from '@/api/models/pagination.model'

// data
const EXPENSES_SEGMENT = '/expenses'

// main
const getAll = async (page?: number): Promise<Pagination<ExpenseModel>> =>
    await get<Pagination<ExpenseModel>>(EXPENSES_SEGMENT, { page: page || 1 })

const find = async (id: string): Promise<ExpenseModel> =>
    await get<ExpenseModel>(`${EXPENSES_SEGMENT}/${id}`)

// exports
export { getAll, find }
