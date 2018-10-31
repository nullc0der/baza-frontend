import React, { Component } from 'react'
import classnames from 'classnames'
import countryCodes from './country-codes'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography
} from 'react-simple-maps'

import s from './WorldMap.scss'

function excludeGeographies(geography) {
    if (geography.id === '-99') {
        return false
    }
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

export default class WorldMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: 1000, // 16:10
            height: 900,
            center: [0, 30],
            zoom:
                window &&
                window.innerWidth &&
                (window.innerWidth < 600
                    ? 0.75
                    : window.innerWidth >= 600 && window.innerWidth < 900
                        ? 0.6
                        : 0.5)
        }
    }

    handleMouseMove = (geography, e) => {
        const tooltipX = e.clientX
        const tooltipY = e.clientY

        // const tooltipX = e.pageX
        // const tooltipY =
        //     e.pageY -
        //     window.scrollY -
        //     this.mapContainer.offsetTop * this.state.zoom

        let update = {}

        if (!this.state.tooltipVisible) {
            update.tooltipVisible = true
        }

        update = {
            ...update,
            tooltipX,
            tooltipY,
            tooltipContent: geography
        }

        console.log(
            e.clientY,
            e.pageY,
            window.scrollY,
            this.mapContainer.offsetTop
        )

        this.setState(update)
    }

    handleMouseLeave = () => {
        this.setState({ tooltipVisible: false })
    }

    renderTooltip = () => {
        const {
            tooltipVisible,
            tooltipContent,
            tooltipX,
            tooltipY
        } = this.state

        if (!tooltipVisible) {
            return null
        }

        return (
            <div
                className="map-tooltip"
                style={{
                    top: tooltipY,
                    left: tooltipX
                }}>
                {tooltipContent.name}
            </div>
        )
    }

    renderGeographies = (geographies, projection) => {
        const valid = geographies
            .map(prepareGeographies)
            .filter(excludeGeographies)

        return valid.map(geography => (
            <Geography
                key={geography.id}
                geography={geography}
                projection={projection}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                style={{
                    default: {
                        fill: 'rgba(39, 57, 81, 0.5)',
                        stroke: 'rgba(255, 255, 255, 0.2)'
                    },
                    hover: {
                        fill: 'rgba(39, 57, 81, 1)'
                    },
                    pressed: {
                        fill: 'rgba(39, 57, 81, 1)'
                    }
                }}
            />
        ))
    }

    render() {
        const { className } = this.props
        const cx = classnames(s.container, className)

        let { zoom, center } = this.state

        return (
            <div
                className={cx}
                ref={node => {
                    this.mapContainer = node
                }}>
                <ComposableMap
                    projection="mercator"
                    style={{
                        width: '100%',
                        height: 'auto'
                    }}>
                    <ZoomableGroup zoom={zoom} center={center} disablePanning>
                        <Geographies geography="/public/worldmap.topo.json">
                            {(geographies, projection) =>
                                this.renderGeographies(geographies, projection)
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                {this.renderTooltip()}
            </div>
        )
    }
}
