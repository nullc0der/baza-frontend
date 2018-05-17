/* global __DEV__, __SERVER__ */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'

import debounce from 'lodash/debounce'

// Store will use this key to check localstorage
const LOCAL_KEY = 'kanto-state'

// This is the timeout for debounced store save
const STORE_TIMEOUT = 3000

const debug = require('debug')('baza:store')

export var store

function _saveLocalState(providedState = {}) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(providedState))
    debug('State synced to local')
}

export const saveLocalState = debounce(_saveLocalState, STORE_TIMEOUT, {
    trailing: true
})

export function loadLocalState() {
    const _state = localStorage.getItem(LOCAL_KEY)
    if (typeof _state === 'string' && _state[0] === '{')
        return JSON.parse(_state)
    return {}
}

export function removeLocalState() {
    localStorage.removeItem(LOCAL_KEY)
}

export function configureStore(initialState = {}, history) {
    // Include all middlewares here
    const middlewares = [thunk, routerMiddleware(history)]

    // Devtools for development mode on client
    const devTools =
        !__SERVER__ && window.devToolsExtension
            ? window.devToolsExtension()
            : function(f) {
                  return f
              }

    // Composed store enhancer
    const composed = compose(applyMiddleware(...middlewares), devTools)

    // Create the store
    store = createStore(rootReducer, initialState, composed)

    // Easier debugging in dev mode
    if (process.env.NODE_ENV === 'development' && !__SERVER__) {
        window._STORE = store
    }

    // Handle hot updates
    if (__DEV__ && module.hot) {
        module.hot.accept('./rootReducer', () => {
            store.replaceReducer(rootReducer)
        })
    }

    debug('Store Configured')

    return store
}
