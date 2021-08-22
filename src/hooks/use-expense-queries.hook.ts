// imports
import { useState, useEffect } from 'react'

import ExpenseModel, { CreateInputs } from '@/api/models/expense.model'
import * as service from '@/api/services/expenses.service'
import { Meta } from '@/api/models/pagination.model'

// main
const useGetExpenses = (): {
    data: ExpenseModel[]
    loading: boolean
    refresh: () => Promise<void>
    refreshing: boolean
    next: () => Promise<void>
} => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState<ExpenseModel[]>([])
    const [meta, setMeta] = useState<Meta | undefined>(undefined)
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        const results = await service.all(page)
        setData((value) => (page && page > 1 ? [...value, ...results.data] : results.data))
        setMeta(results.meta)
    }

    const next = async () => {
        if (loading) return

        if (!meta || meta.next_page_url) {
            setLoading(true)
            setPage((value) => value + 1)

            await getData()
            setLoading(false)
        }
    }

    const refresh = async () => {
        if (loading) return

        setRefreshing(true)
        setPage(1)
        await getData()
        setRefreshing(false)
    }

    useEffect(() => {
        getData()
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, loading, refresh, refreshing, next }
}

const useFindExpense = (
    id: string
): {
    data: ExpenseModel | undefined
    loading: boolean
    fetch: () => Promise<void>
} => {
    const [data, setData] = useState<ExpenseModel | undefined>()
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        if (loading && data) return

        setLoading(true)

        const result = await service.find(id)
        setData(result)

        setLoading(false)
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, loading, fetch: getData }
}

const useStoreExpense = () => {
    const [loading, setLoading] = useState(false)

    const store = async (inputs: CreateInputs) => {
        setLoading(true)
        const result = await service.store(inputs)
        setLoading(false)

        return result
    }

    return { loading, store }
}

const useUpdateExpense = (id: string) => {
    const [loading, setLoading] = useState(false)

    const update = async (inputs: CreateInputs) => {
        setLoading(true)
        const result = await service.update(id, inputs)
        setLoading(false)

        return result
    }

    return { loading, update }
}

const useDeleteExpense = (id: string) => {
    const [loading, setLoading] = useState(false)

    const destroy = async () => {
        setLoading(true)
        await service.destroy(id)
        setLoading(false)
    }

    return { loading, destroy }
}

// exports
export { useGetExpenses, useFindExpense, useStoreExpense, useUpdateExpense, useDeleteExpense }
