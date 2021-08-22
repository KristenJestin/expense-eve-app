// imports
import { post } from '@/api/modules/fetcher'
import Auth, { LoginInputs } from '@/api/models/auth.model'

// data
const SEGMENT = '/auth'

// main
const login = async (data: LoginInputs): Promise<Auth> => await post<Auth>(SEGMENT, data)

// exports
export { login }
