// imports
import { useState, useEffect } from 'react'

import ExpenseModel from '@/api/models/expense.model'
import * as service from '@/api/services/expenses.service'
import { Meta } from '@/api/models/pagination.model'

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
        if (!loading && (!meta || meta.next_page_url)) {
            setLoading(true)
            setPage((value) => value + 1)

            await getData()
            setLoading(false)
        }
    }

    const getData = async () => {
        const results = await service.getAll(page)
        setData((value) => (page && page > 1 ? [...value, ...results.data] : results.data))
        setMeta(results.meta)
    }

    useEffect(() => {
        getData()
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, loading, fetch: getData, next: nextData }
}

const useFindExpense = (
    id: string
): {
    data: ExpenseModel | undefined
    loading: boolean
} => {
    const [data, setData] = useState<ExpenseModel | undefined>()
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        const result = await service.find(id)
        setData(result)

        if (loading) setLoading(false)
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, loading }
}

// exports
export { useGetExpenses, useFindExpense }
