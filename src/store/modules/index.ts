// imports
import { AuthState, auth } from './auth'

// main
/**
 * Root states.
 */
type RootStates = {
    auth: AuthState
}

/**
 * Root reducers.
 */
const reducers = {
    auth: auth.reducer,
}

/**
 * Root actions.
 */
const actions = {
    user: auth.actions,
}

// exports
export type { RootStates }
export { reducers, actions }
export { auth }
