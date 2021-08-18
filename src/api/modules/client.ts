// imports
import axios from 'axios'

// TODO: use env variables
// import { API_URL } from '@env'

// main
const client = axios.create({
    baseURL: 'http://192.168.0.100:3333',
    headers: {
        Authorization: 'Bearer NA.Uilrcp9s-VFqXwmXZUFfLhWnOoHcIdqNXYxXc6iT8-A6QlCcj9DKRZGr3eTk',
    },
})
// client.interceptors.request.use((config) => {
//     config.paramsSerializer = (params) =>
//         qs.stringify(params, {
//             serializeDate: (date: Date) => DateTime.fromJSDate(date).toISO(),
//         })
//     return config
// })

// exports
export default client
