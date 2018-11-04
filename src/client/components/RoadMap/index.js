import React, { Component } from 'react'
import classnames from 'classnames'
import TrackVisibility from 'react-on-screen'
// import RoadMapLadder from './RoadmapLadder'
import RoadMapGrid from './RoadmapGrid'

export default class RoadMapSection extends Component {
    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'milestone-section')

        return (
            <TrackVisibility once partialVisibility>
                {({ isVisible }) =>
                    <div className={cx} id={id}>
                        <div className="container">
                            <RoadMapGrid gridClassName={isVisible ? 'will-animate' : ''} />
                        </div>
                        {/* <div className="bg-poker-pattern" /> */}
                    </div>
                }
            </TrackVisibility>
        )
    }
}
