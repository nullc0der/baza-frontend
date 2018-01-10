import React, {Component} from 'react'
import classnames from 'classnames'

import './SearchPropertiesForm.scss'

import InputField from 'components/ui/InputField'

export default class SearchPropertiesForm extends Component {
	static propTypes = {

	}

	render(){

		const {
			className
		} = this.props

		const cx = classnames(
			'search-properties-form flex-horizontal align-items-center',
			className
		)

		return (
			<form action='#' method='GET' className={cx}>
				<InputField
					className='location-input-field'
					icon={<i className='fa fa-map-marker'/>}
					placeholder='Enter Location'/>
				<div className='divider'/>
				<InputField
					className='filters-input-field'
					icon={<i className='fa fa-angle-down'/>}
					placeholder='Enter Location'/>
				<button className='btn btn-link btn-search'>
					<i className='fa fa-search'/>
				</button>
			</form>
		)
	}
}