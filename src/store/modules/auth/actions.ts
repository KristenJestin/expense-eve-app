// imports
import { createAction } from 'redux-actions'

import * as types from './constants'
import { LoginPayload, LogoutPayload } from './props'

// main
const login = createAction<LoginPayload>(types.LOGIN)
const logout = createAction<LogoutPayload>(types.LOGOUT)

// exports
export { login, logout }
