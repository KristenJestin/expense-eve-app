// imports
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducers, actions } from './modules'

// main
const middleware = applyMiddleware(thunk)

/**
 * Create app store.
 */
const createStore = (data: Object = {}) => _createStore(combineReducers(reducers), data, middleware)

// exports
export type { RootStates } from './modules'
export { createStore, actions }
