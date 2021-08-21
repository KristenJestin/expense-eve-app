// imports
import client from './client'

// main
const get = async <T>(path: string, params?: Record<string, string | number>): Promise<T> => {
    const { data: result } = await client.get(path, { params })
    return result
}

const post = async <T>(path: string, data: Record<string, string | number>): Promise<T> => {
    const { data: result } = await client.post<T>(path, data)
    return result
}

const patch = async <T>(path: string, data: Record<string, string | number>): Promise<T> => {
    const { data: result } = await client.patch<T>(path, data)
    return result
}

const _delete = async (path: string): Promise<void> => {
    await client.delete(path)
}

// exports
export { get, post, patch, _delete }
