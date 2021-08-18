// imports
import client from './client'

// main
const get = async <T>(path: string, params?: Record<string, string | number>): Promise<T> => {
    const { data } = await client.get(path, { params })
    return data
}

// exports
export { get }
