// imports
import { useState, useEffect } from 'react'

import ExpenseModel from '@/api/models/expense.model'
import { get } from '@/api/modules/fetcher'
import Pagination, { Meta } from '@/api/models/pagination.model'

// main
const useGetExpenses = (): {
    data: ExpenseModel[]
    loading: boolean
    fetch: () => Promise<void>
    next: () => Promise<void>
} => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState<ExpenseModel[]>([])
    const [meta, setMeta] = useState<Meta | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    const nextData = async () => {
        setPage((value) => value + 1)
        await new Promise((r) => setTimeout(r, 5000))

        if (!meta || page < meta?.current_page) {
            setLoading(true)
            await getData()
        }
    }

    const getData = async () => {
        const results = await get<Pagination<ExpenseModel>>('/expenses', { page: page || 1 })
        setData((value) => (page && page > 1 ? [...value, ...results.data] : results.data))
        setMeta(results.meta)

        if (loading) setLoading(false)
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, loading, fetch: getData, next: nextData }
}

// exports
export { useGetExpenses }
