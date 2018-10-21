import React from 'react'
import classnames from 'classnames'

import RoadMap from 'components/RoadMap'

const RoadmapSection = props => {
    const cx = classnames(props.className, 'roadmap-section')

    return (
        <div className={cx} id={props.id}>
            <div className="container page-section">
                <h3 className="text-center mb-5">Roadmap</h3>
                <div className="row">
                    <RoadMap />
                </div>
            </div>
        </div>
    )
}

export default RoadmapSection
