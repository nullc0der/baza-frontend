import React from 'react'
import classnames from 'classnames'

import './ContentWithImage.scss'

const ContentWithImage = (props)=> {

	const cx = classnames('ui-content-with-image', {
		'in-right': props.inRight
	})

	const contentClass = classnames('col-5', {
		'ml-auto': !props.inRight,
		'mr-auto': props.inRight
	})

	return (
		<div className={cx}>
			<div
				className='section-image'
				style={{
					backgroundImage: `url('${props.image}')`
				}}>
			</div>
			<div className='section-content container'>
				<div className='row'>
					<div className={contentClass}>
						{props.children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContentWithImage