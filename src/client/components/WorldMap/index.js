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
import Tooltip from './Tooltip'
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
                (window.innerWidth < 900 ? 0.6 : 0.5)
        }

        this._updateZoom = debounce(this.updateZoom, 150)
        this._handleMouseMove = debounce(this.handleMouseMove, 16)
        this._handleMouseLeave = debounce(this.handleMouseLeave, 16)
    }

    componentDidMount = () => {
        window.addEventListener('resize', this._updateZoom)
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this._updateZoom)
    }

    updateZoom = () => {
        const zoom =
            window && window.innerWidth && (window.innerWidth < 900 ? 0.6 : 0.5)
        this.setState({ zoom })
    }

    handleMouseMove = (geography, e) => {
        const tooltipX = e.pageX
        const tooltipY = e.pageY

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

        return (
            <Tooltip
                tooltipVisible={tooltipVisible}
                tooltipContent={tooltipContent}
                tooltipX={tooltipX}
                tooltipY={tooltipY}
            />
        )
    }

    renderGeographies = (geographies, projection) => {
        const donations = this.props.donations || []
        const valid = geographies
            .map(prepareGeographies)
            .filter(excludeGeographies)

        return valid.map(geography => {
            const defaultStyle = {
                fill: 'rgba(39, 57, 81, 1)',
                opacity: '0.4',
                stroke: 'rgba(255, 255, 255, 0.2)'
            }

            const gotDonation = donations
                .filter(d => d.iso === geography.iso)
                .shift()

            if (gotDonation) {
                defaultStyle.animation = 'animate-opacity 1s ease-in'
            }

            return (
                <Geography
                    key={geography.id}
                    geography={geography}
                    projection={projection}
                    onMouseMove={this._handleMouseMove}
                    onMouseLeave={this._handleMouseLeave}
                    style={{
                        default: defaultStyle,
                        hover: {
                            fill: 'rgba(39, 57, 81, 1)'
                        },
                        pressed: {
                            fill: 'rgba(39, 57, 81, 1)'
                        }
                    }}
                />
            )
        })
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
                        <Geographies
                            disableOptimization
                            geography="/public/worldmap.topo.json">
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
