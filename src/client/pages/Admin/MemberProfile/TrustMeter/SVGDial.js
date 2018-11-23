import React, { Component } from 'react'
import isNumber from 'lodash/isNumber'

export default class SVGDial extends Component {

    componentDidMount = () => {
        this.fixDimensions()
        this.updatePathValue(0)
        this.container.classList.add('can-animate')
        setTimeout(() => {
            this.updatePathValue(this.props.value)
        }, 600)
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.value !== nextProps.value) {
            this.updatePathValue(nextProps.value)
        }
    }

    fixDimensions = () => {
        // const parentBounds = this.container.parentElement.getBoundingClientRect()
        // this.container.setAttribute('width', parentBounds.width + 'px')
        // this.container.setAttribute('height', parentBounds.height + 'px')
        // this.container.setAttribute('viewBox', `0 0 ${parentBounds.width} ${parentBounds.height}`)

        const pathLength = this.trackPath.getTotalLength()
        this.trackValue.style.strokeDasharray = pathLength + 'px'
        this.trackValue.style.strokeDashoffset = -1 * pathLength + 'px'
    }

    updatePathValue = (providedValue) => {
        const value = isNumber(providedValue) ? providedValue : 0
        const pathLength = this.trackPath.getTotalLength()

        const pathValue = pathLength * value * 0.01
        const totalProgress = pathLength - pathValue

        // console.log(`
        //     updatePathValue:
        //        value: ${value}
        //        pathLength: ${pathLength}
        //        pathValue: ${pathValue}
        //        totalProgress: ${totalProgress}
        // `)

        this.trackValue.style.strokeDashoffset = totalProgress + 'px'
    }

    render() {
        return (
            <svg
                id='gauge-container'
                width="248px"
                height="129px"
                viewBox="0 0 248 129"
                version="1.1"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                ref={node => { this.container = node }}>
                <defs>
                    <linearGradient x1="2.02378206%" y1="52.0237821%" x2="97.9762179%" y2="52.0237821%" id="linearGradient-1">
                        <stop stopColor="#FC3800" offset="0%"></stop>
                        <stop stopColor="#F8A800" offset="26.88589%"></stop>
                        <stop stopColor="#CDCB02" offset="51.2453629%"></stop>
                        <stop stopColor="#8BD906" offset="77.7895851%"></stop>
                        <stop stopColor="#58E40A" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeDasharray="1" strokeLinecap="round" strokeLinejoin="round">
                    <g transform="translate(-709.000000, -209.000000)" fillRule="nonzero" strokeWidth="10">
                        <g id="gauge" transform="translate(714.000000, 214.000000)">
                            <path
                                ref={node => { this.trackPath = node }}
                                d="M0,119 C0,53.2781148 53.2781148,0 119,0 C184.721885,0 238,53.2781148 238,119" id="track" stroke="#263850" opacity="0.15"></path>
                            <path
                                ref={node => { this.trackValue = node }}
                                d="M0,119 C0,53.2781148 53.2781148,0 119,0 C184.721885,0 238,53.2781148 238,119" id="value" stroke="url(#linearGradient-1)" strokeDasharray={`1000px`} strokeDashoffset={`0px`}></path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }
}


