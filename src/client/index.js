/*eslint-env browser*/
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";

import { configureStore, saveLocalState, loadLocalState } from "./store/index";
import Root from "./containers/Root";

import $ from 'jquery'
if (!__SERVER__)
	window.$ = window.jQuery = $

if (!__SERVER__ && __DEV__) {
	window.localStorage.debug = 'baza:*'
}


// Check if server sent a dehydrated state
const initialState = window.INITIAL_STATE || {};

// Check if a localState is present
const localState = loadLocalState() || {};

// Combine the final state
const finalState = { ...localState, ...initialState };

// Initialize our store
const store = configureStore(finalState);

// Save a local copy whenever store changes
store.subscribe(() => {
	saveLocalState(store.getState());
});

// Usually you'd want to remove server copy of minimum css in SSR here
// you also can do your post initialization tasks here,
// 	 e.g. (re)initializing global libraries such as bootstrap/tooltip
const onRenderComplete = () => {
	console.timeEnd("react:rendered-in");
	console.log('renderCount: ', renderCounter)
};

// If you have multiple containers before actual router's <Switch> / <Route> kicks in
// You need to pass a ever changing prop. otherwise app won't show update
// This happens because until <Switch> / <Route> is encountered the container's prop remains unchanged,
// and the default `shouldComponentUpdate()` fails
var renderCounter = 0;
const renderApp = Component => {
	const renderFn = !!module.hot ? ReactDOM.render : ReactDOM.hydrate
	console.time("react:rendered-in");
	renderFn(
		<AppContainer>
			<BrowserRouter>
				<Component store={store} renderCounter={++renderCounter} />
			</BrowserRouter>
		</AppContainer>,
		document.getElementById("root"),
		onRenderComplete
	);
};

// Render the app for first time
renderApp(Root);

// [TODO: Add service worker support,
// 			partial work has been done,
// 			few configuration fixes needed since the last version of workbox-sw came out.]
//
// Install a service worker if eligible
// function registerSW(){ 	//eslint-disable-line
// 	var isRegistering = false;
// 	function register(){
// 		if (isRegistering)
// 			return
// 		isRegistering = true;
// 		console.info('SW: Registering...')
// 		navigator.serviceWorker.register('/sw.js')
// 			.then(result => {
// 				console.info('SW: Registration Success', result)
// 			})
// 			.catch(err => {
// 				console.warn('SW: Registration Failed')
// 				console.error(err)
// 			})
// 	}
//
// 	if ( ('serviceWorker' in window.navigator) ){
// 		window.addEventListener('load', register)
// 		window.setTimeout(register, 5000)
// 	}
//
// }
// registerSW();

// Re-render the app on hot updates
// module.hot is false in production, uglify considers this as `if (false)`  -> dead code
// and removes it from the final build
// You can employ similar tactics by using proper variables in DefinePlugin in your webpack config
if (module.hot) {
	module.hot.accept("./containers/Root", () => {
		renderApp(Root);
	});
}