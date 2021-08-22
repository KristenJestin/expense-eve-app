import { object, string } from 'yup'

// main
interface Auth {
    type: string
    token: string
    expired_at: string
    user_id: string
}

type LoginInputs = {
    email: string
    password: string
}

const loginSchema = object().shape({
    email: string().required().max(255), //.email(),
    password: string().required().max(255),
})

// exports
export default Auth
export type { LoginInputs }
export { loginSchema }
