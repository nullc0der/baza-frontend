import React, {Component} from 'react'
import classnames from 'classnames'

import './InputField.scss'

export default class InputField extends Component {

	static propTypes = {

	}

	render(){

		const {
			className,
			placeholder,
			icon = null,
			iconInLeft = false,
		} = this.props

		const cx = classnames('ui-input-field', {
			'icon-in-left': iconInLeft
		}, className)

		return (
			<div className={cx}>
				<input
					className='ui-input-field-input form-control'
					placeholder={placeholder}/>
				<span className='ui-input-field-icon'>
					{icon}
				</span>
			</div>
		)
	}
}
