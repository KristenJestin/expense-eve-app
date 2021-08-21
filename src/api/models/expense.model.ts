// imports
import { object, string, number, date } from 'yup'
import { DateTime } from 'luxon'

// main
interface Expense {
    id: string
    user_id: string
    title: string
    cost: string
    at: string

    created_at: string
    updated_at: string
}

type CreateInputs = {
    title: string
    cost: number
    date: Date
}

const createSchema = object().shape({
    title: string().required().max(255),
    cost: number().required().min(0.15),
    date: date().required().max(DateTime.local().toJSDate()),
})

// exports
export default Expense
export type { CreateInputs }
export { createSchema }
