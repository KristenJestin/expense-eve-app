// main
interface AuthModel {
    logged_in: boolean
    user_id?: string
    token?: string
    expire_at?: string
}

interface LoginPayload {
    user_id?: string
    token?: string
    expire_at?: string
}
interface LogoutPayload {}

// exports
export type { AuthModel, LoginPayload, LogoutPayload }
