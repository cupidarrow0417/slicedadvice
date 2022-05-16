import { createStore, applyMiddleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '../utils/reduxPersistStorage'

/**
 * If we're in development mode, we'll wrap our middleware with redux-devtools/extension's
 * composeWithDevTools. Otherwise, we'll just use applyMiddleware
 * @param {any} middleware - An array of middleware functions.
 * @returns A function that takes a reducer and returns a store.
 */
const bindMiddleware = (middleware: any) => {

    //if in dev mode, wrap with redux-devtools/extension
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('@redux-devtools/extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }

    //else, in production.
    return applyMiddleware(...middleware)
}

/**
 * If the action type is HYDRATE, it will merge the state with the payload. Otherwise, it will run the
 * reducers
 * @param {any} state - The current state of the store.
 * @param {any} action - The action object that was dispatched.
 * @returns The reducer function is being returned.
 */
const rootReducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    } else {
        return reducers(state, action)
    }
}

// Redux persist config
const persistConfig = {
    key: 'root',
    storage
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * It creates a store that uses the reducer and middleware we defined
 * @returns A store object.
 */
const initStore = () => {
    return createStore(persistedReducer, bindMiddleware([thunkMiddleware]))
}

//https://stackoverflow.com/a/67656911/16435056 to add Typescript functionality 
//to Redux store
const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware]))
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper(initStore)