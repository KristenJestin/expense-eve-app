// imports
import { handleActions, Action } from 'redux-actions'
import { LOGIN, LOGOUT } from './constants'
import { AuthModel, LoginPayload } from './props'

// props
type AuthState = {
    readonly loggedIn: boolean
    readonly userId?: string
    readonly token?: string
    readonly expireAt?: string
}

// state
const initialState: AuthState = {
    loggedIn: false,
}

// main
const reducer = handleActions<AuthState, AuthModel>(
    {
        [LOGIN]: (_, { payload }: Action<LoginPayload>) => ({
            loggedIn: true,
            ...payload,
        }),

        [LOGOUT]: () => ({
            loggedIn: false,
        }),
    },
    initialState
)

// exports
export default reducer
export type { AuthState }
