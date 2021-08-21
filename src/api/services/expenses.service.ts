// imports
import { DateTime } from 'luxon'

import { get, post, patch, _delete } from '@/api/modules/fetcher'
import ExpenseModel, { CreateInputs } from '@/api/models/expense.model'
import Pagination from '@/api/models/pagination.model'

// data
const EXPENSES_SEGMENT = '/expenses'

// main
const all = async (page?: number): Promise<Pagination<ExpenseModel>> =>
    await get<Pagination<ExpenseModel>>(EXPENSES_SEGMENT, { page: page || 1 })

const find = async (id: string): Promise<ExpenseModel> =>
    await get<ExpenseModel>(`${EXPENSES_SEGMENT}/${id}`)

const store = async (inputs: CreateInputs): Promise<ExpenseModel> => {
    const data = {
        title: inputs.title,
        cost: inputs.cost,
        at: DateTime.fromJSDate(inputs.date).toISO(),
    }
    return await post<ExpenseModel>(EXPENSES_SEGMENT, data)
}

const update = async (id: string, inputs: CreateInputs): Promise<ExpenseModel> => {
    const data = {
        title: inputs.title,
        cost: inputs.cost,
        at: DateTime.fromJSDate(inputs.date).toISO(),
    }
    return await patch<ExpenseModel>(`${EXPENSES_SEGMENT}/${id}`, data)
}

const destroy = async (id: string): Promise<void> => {
    await _delete(`${EXPENSES_SEGMENT}/${id}`)
}

// exports
export { all, store, find, update, destroy }
