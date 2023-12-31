/*eslint-env browser*/
import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
// import { AppContainer } from 'react-hot-loader'
// import { BrowserRouter } from "react-router-dom";

import { configureStore, loadLocalState, saveLocalUIState } from './store/index'

import { createBrowserHistory as createHistory } from 'history'
// import {ConnectedRouter} from 'react-router-redux'

import Root from './containers/Root'

import { createMatomoInstance } from 'context/Matomo'

import Config from 'utils/config'

// Create Initial History Object
const history = createHistory()

// Check if server sent a dehydrated state
const initialState = window.INITIAL_STATE || {}

// Check if a localState is present
const uiState = loadLocalState() || {}

const authState = loadLocalState('baza-auth') || {}

// Combine the final state
const finalState = { ...authState, ...uiState, ...initialState }

// Initialize our store
const store = configureStore(finalState, history)

//Save a local copy whenever store changes
store.subscribe(() => {
    const {
        Common,
        Auth,
        Messenger,
        Donations,
        GroupNews,
        GroupPost,
        UserWebWallet,
        ...others
    } = store.getState()
    saveLocalUIState('baza-ui', others)
})

const matomoInstance = createMatomoInstance({
    urlBase: 'https://matomo.ekata.io',
    siteId: Config.get('MATOMO_SITE_ID'),
    linkTracking: false,
})

// Usually you'd want to remove server copy of minimum css in SSR here
// you also can do your post initialization tasks here,
// 	 e.g. (re)initializing global libraries such as bootstrap/tooltip
const onRenderComplete = () => {
    console.timeEnd('react:rendered-in')
    console.log('renderCount: ', renderCounter)
    // if (process.env.NODE_ENV === 'production') window.Raven = Raven
}

// If you have multiple containers before actual router's <Switch> / <Route> kicks in
// You need to pass a ever changing prop. otherwise app won't show update
// This happens because until <Switch> / <Route> is encountered the container's prop remains unchanged,
// and the default `shouldComponentUpdate()` fails
var renderCounter = 0
const renderApp = (Component) => {
    const renderFn = !!module.hot ? ReactDOM.render : ReactDOM.hydrate
    console.time('react:rendered-in')
    renderFn(
        <Component
            history={history}
            store={store}
            renderCounter={++renderCounter}
            matomoInstance={matomoInstance}
        />,
        document.getElementById('root'),
        onRenderComplete
    )
}

// Render the app for first time
renderApp(Root)

// Configure Sentry in production
if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://71a017bc7bc94c0b859a265b55294e5f@sentry.io/1210544',
    })
    // Install a service worker if eligible
    function registerSW() {
        //eslint-disable-line
        var isRegistering = false
        function register() {
            if (isRegistering) return
            isRegistering = true
            console.info('SW: Registering...')
            navigator.serviceWorker
                .register('/sw.js')
                .then((result) => {
                    console.info('SW: Registration Success')
                })
                .catch((err) => {
                    console.warn('SW: Registration Failed')
                    console.error(err)
                })
        }

        if ('serviceWorker' in window.navigator) {
            window.addEventListener('load', register)
            window.setTimeout(register, 5000)
        }
    }
    registerSW()
}

// Re-render the app on hot updates
// module.hot is false in production, uglify considers this as `if (false)`  -> dead code
// and removes it from the final build
// You can employ similar tactics by using proper variables in DefinePlugin in your webpack config
// if (module.hot) {
//     module.hot.accept('./containers/Root', () => {
//         renderApp(Root)
//     })
// }
