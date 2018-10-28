import React, { Component } from 'react'
import classnames from 'classnames'

class MapSection extends Component {
    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'map-section')

        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="text-center mb-5">
                        Donations from around the world
                    </h3>
                    <div className="map-container" />
                </div>
            </div>
        )
    }
}

export default MapSection
