// imports
import reducer from './reducer'
import * as actions from './actions'

// exports
export const auth = { reducer, actions }
export type { AuthState } from './reducer'
