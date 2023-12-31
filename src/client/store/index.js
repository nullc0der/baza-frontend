/* global __DEV__, __SERVER__ */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'

import debounce from 'lodash/debounce'

// This is the timeout for debounced store save
const STORE_TIMEOUT = 1000

const debug = require('debug')('baza:store')

export var store

function _saveLocalUIState(keyName = 'baza-ui', providedState = {}) {
    localStorage.setItem(keyName, JSON.stringify(providedState))
    debug('UI state synced to local')
}

export const saveLocalUIState = debounce(_saveLocalUIState, STORE_TIMEOUT, {
    trailing: true
})

function _saveLocalAuthState(keyName = 'baza-auth', providedState = {}) {
    localStorage.setItem(keyName, JSON.stringify(providedState))
    debug('Auth state synced to local')
}

export const saveLocalAuthState = debounce(_saveLocalAuthState, STORE_TIMEOUT, {
    trailing: true
})

export function loadLocalState(keyName = 'baza-ui') {
    const _state = localStorage.getItem(keyName)
    if (typeof _state === 'string' && _state[0] === '{')
        return JSON.parse(_state)
    return {}
}

export function removeLocalState(keyName = 'baza-ui') {
    localStorage.removeItem(keyName)
}

export function configureStore(initialState = {}, history) {
    // Include all middlewares here
    const middlewares = [thunk, routerMiddleware(history)]

    // Devtools for development mode on client
    const devTools =
        !__SERVER__ && window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : function(f) {
                  return f
              }

    // Composed store enhancer
    const composed = compose(
        applyMiddleware(...middlewares),
        devTools
    )

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
