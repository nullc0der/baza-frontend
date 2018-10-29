import React, { Component } from 'react'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import countryCodes from './country-codes'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography
} from 'react-simple-maps'

import { Tooltip, actions } from 'redux-tooltip'

function excludeGeographies(geography) {
    return !['ATA'].includes(geography.iso)
}

function prepareGeographies(geography) {
    const country = countryCodes.filter(c => c.code == geography.id).shift() //eslint-disable-line
    if (!country) {
        return geography
    }

    geography.iso = country.iso
    geography.name = country.name

    return geography
}

class MapSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 1200,
            height: 675,
            tooltipVisible: false,
            tooltipX: 0,
            tooltipY: 0
        }

        this._handleMove = debounce(this.handleMove, 17) // ~60fps
        this._handleLeave = debounce(this.handleLeave, 17)
    }

    componentDidMount = () => {
        setTimeout(this.fixDimensions, 500)
    }

    fixDimensions = () => {
        const bounds = this.mapContainer.getBoundingClientRect()
        const update = {}

        if (this.state.width !== bounds.width) {
            update.width = bounds.width < 1200 ? bounds.width : 1200
        }

        if (this.state.height !== bounds.height) {
            update.height = bounds.height
        }

        this.setState(update)
    }

    handleMove = (geography, evt) => {
        const tooltipX = evt.clientX
        const tooltipY = evt.clientY + window.pageYOffset
        this.setState({
            tooltipVisible: true,
            tooltipX,
            tooltipY,
            tooltipContent: geography.name
        })
    }

    handleLeave = () => {
        this.setState({ tooltipVisible: false })
    }

    renderTooltip = () => {
        const {
            tooltipVisible,
            tooltipX,
            tooltipY,
            tooltipContent
        } = this.state
        if (!tooltipVisible) {
            return null
        }

        return (
            <div
                className="map-tooltip"
                style={{ top: tooltipY, left: tooltipX }}>
                {tooltipContent}
            </div>
        )
    }

    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'map-section')

        const { width, height } = this.state

        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="text-center mb-5">
                        Donations from around the world
                    </h3>
                    <div
                        className="map-container text-center"
                        ref={node => {
                            this.mapContainer = node
                        }}>
                        <ComposableMap
                            height={height}
                            width={width}
                            projection="times"
                            projectionConfig={{
                                scale: 235
                            }}>
                            <ZoomableGroup zoom={1} center={[0, 10]}>
                                <Geographies geography="/public/worldmap.topo.json">
                                    {(geographies, projection) =>
                                        geographies
                                            .map(prepareGeographies)
                                            .filter(excludeGeographies)
                                            .map(geography => (
                                                <Geography
                                                    key={geography.id}
                                                    geography={geography}
                                                    projection={projection}
                                                    onMouseMove={
                                                        this._handleMove
                                                    }
                                                    onMouseLeave={
                                                        this._handleLeave
                                                    }
                                                    style={{
                                                        default: {
                                                            fill:
                                                                'rgba(253, 200, 0, 0.5)',
                                                            stroke:
                                                                'rgba(255, 255, 255, 0.2)'
                                                        },
                                                        hover: {
                                                            fill:
                                                                'rgba(253, 200, 0, 1)'
                                                        }
                                                    }}
                                                />
                                            ))
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                        {this.renderTooltip()}
                    </div>
                </div>
            </div>
        )
    }
}

export default MapSection
