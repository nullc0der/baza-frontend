import React from 'react'
import classnames from 'classnames'

const MapSection = props => {
    const cx = classnames(props.className, 'map-section')

    return (
        <div className={cx} id={props.id}>
            <div className="container page-section">
                <h3 className="text-center mb-5">
                    {' '}
                    Donations from around the world{' '}
                </h3>
                <div className="row">Map Rendered Here</div>
            </div>
        </div>
    )
}

export default MapSection
