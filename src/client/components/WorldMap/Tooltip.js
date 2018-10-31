import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const mountNode =
    document && typeof document.getElementById === 'function'
        ? document.getElementById('modal-portal-root')
        : null

export default class Tooltip extends Component {
    renderTooltip() {
        const { tooltipContent, tooltipX, tooltipY } = this.props
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

    render() {
        if (!mountNode || !this.props.tooltipVisible) {
            return null
        }
        return ReactDOM.createPortal(this.renderTooltip(), mountNode)
    }
}
