import React, {Component} from 'react'
import { Provider } from 'react-redux'

import {ConnectedRouter} from 'react-router-redux'

// Base styles
import './Root.scss'


import App from 'containers/App'

export default class Root extends Component {
	render(){
		return (
			<Provider store={this.props.store}>
				<ConnectedRouter history={this.props.history}>
					<App renderCounter={this.props.renderCounter}/>
				</ConnectedRouter>
			</Provider>
		)
	}
}
