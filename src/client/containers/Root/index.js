import React, {Component} from 'react'
import { Provider } from 'react-redux'


// Base styles
import './Root.scss'


import App from 'containers/App'

export default class Root extends Component {
	render(){
		return (
			<Provider store={this.props.store}>
				<App renderCounter={this.props.renderCounter}/>
			</Provider>
		)
	}
}
