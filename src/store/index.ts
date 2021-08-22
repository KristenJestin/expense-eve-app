// imports
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { reducers, actions } from './modules'

// config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 20000,
    transforms: [
        encryptTransform({
            // TODO: use env variable
            secretKey: 'my-super-secret-key',
        }),
    ],
}

// main
const middleware = applyMiddleware(thunk)

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers))

// exports
export type { RootStates } from './modules'
export { createStore, actions, persistedReducer }
export default () => {
    const store = createStore(persistedReducer, {}, middleware)
    // TODO: use make better typing
    /* @ts-ignore */
    const persistor = persistStore(store)
    return { store, persistor }
}
