import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import {ConnectedRouter} from 'react-router-redux'

// Base styles
import './Root.scss'
import App from 'containers/App'

class Root extends Component {
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

export default hot(module)(Root)