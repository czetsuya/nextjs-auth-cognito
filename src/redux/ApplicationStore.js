import {useMemo} from 'react'
import {applyMiddleware, compose, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import rootReducer from './Reducers'
import { persistCombineReducers } from 'redux-persist'

let middleware = null
let store
const middlewares = [thunk, promise]
const startingState = {
    authContext: null
}

const isProductionMode = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production';

if (isProductionMode) {
    middleware = compose(applyMiddleware(...middlewares))

} else {
    middleware = composeWithDevTools(
        applyMiddleware(...middlewares)
    )
}

const makeStore = preloadedState => {
    return createStore(
        persistCombineReducers(
            {
                key: 'sparqr.com',
                storage,
                whitelist: ['authContext']
            },
            rootReducer,
        ),
        preloadedState,
        middleware
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') {
        return _store
    }
    // Create the store once in the client
    if (!store) {
        store = _store
    }

    return _store
}

export const useStore = (initialState) => {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
