// imports
import { useState, useEffect } from 'react'

import ExpenseModel from '@/api/models/expense.model'
import { get } from '@/api/modules/fetcher'
import Pagination from '@/api/models/pagination.model'

// main
const useGetExpenses = (page?: number): [ExpenseModel[], boolean, () => Promise<void>] => {
    const [data, setData] = useState<ExpenseModel[]>([])
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        const results = await get<Pagination<ExpenseModel>>('/expenses', { page: page || 1 })
        setData(results.data)
        if (loading) setLoading(false)
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [data, loading, getData]
}

// exports
export { useGetExpenses }
