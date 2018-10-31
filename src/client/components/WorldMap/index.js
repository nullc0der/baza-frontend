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
    state = {
        width: 1000, // 16:10
        height: 900
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
                onMouseMove={this._handleMove}
                onMouseLeave={this._handleLeave}
                style={{
                    default: {
                        fill: 'rgba(253, 200, 0, 0.5)',
                        stroke: 'rgba(255, 255, 255, 0.2)'
                    },
                    hover: {
                        fill: 'rgba(253, 200, 0, 1)'
                    }
                }}
            />
        ))
    }

    render() {
        const { className } = this.props
        const cx = classnames(s.container, className)
        return (
            <div className={cx}>
                <ComposableMap
                    projection="mercator"
                    style={{
                        width: '100%',
                        height: 'auto'
                    }}>
                    <ZoomableGroup zoom={0.6} center={[0, 30]} disablePanning>
                        <Geographies geography="/public/worldmap.topo.json">
                            {(geographies, projection) =>
                                this.renderGeographies(geographies, projection)
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        )
    }
}
