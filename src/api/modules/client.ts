// imports
import axios from 'axios'

import { logout as logoutDispatch } from '@/store/modules/auth/actions'

// TODO: use env variables
// import { API_URL } from '@env'

// main
const client = axios.create({
    baseURL: 'http://192.168.0.100:3333',
    headers: {
        'Content-Type': 'application/json',
    },
})

const setupInterceptors = (store: any) => {
    // TODO: use type for store var
    client.interceptors.request.use(
        (config) => {
            const { token } = store.getState().auth
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    client.interceptors.response.use(
        (res) => res,
        async (error) => {
            const { response } = error

            if (response.status === 401) {
                store.dispatch(logoutDispatch({}))
            }

            return Promise.reject(error)
        }
    )
}

// exports
export default client
export { setupInterceptors }
