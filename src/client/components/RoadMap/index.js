import React, { Component } from 'react'
import classnames from 'classnames'

// import RoadMapLadder from './RoadmapLadder'
import RoadMapGrid from './RoadmapGrid'

export default class RoadMapSection extends Component {
    componentDidMount = () => {
        window.addEventListener('scroll', this._handleScroll)
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this._handleScroll)
    }

    _handleScroll = () => {
        if (this.isScrollBusy) {
            return
        }
        window.requestAnimationFrame(this.handleScroll)
        this.isScrollBusy = false
    }

    handleScroll = () => {
        const wh = document.documentElement.clientHeight || window.innerHeight
        const bounds = this.container.getBoundingClientRect()
        const grid = this.container.querySelector('.milestone-grid')

        const isTopInViewport = Math.abs(bounds.top) - wh < 100
        // const isBottomInViewport = Math.abs(bounds.bottom) - wh < 100

        if (isTopInViewport) {
            grid.classList.add('will-animate')
        } else {
            grid.classList.remove('will-animate')
        }
        // console.log(isTopInViewport)
        // console.log(bounds.top, bounds.bottom, wh)
    }

    render() {
        const { className, id, title, subtitle } = this.props

        const cx = classnames(className, 'milestone-section')
        return (
            <div className={cx} id={id} ref={node => (this.container = node)}>
                <div className="container page-section">
                    <h4 className="section-title text-center mb-3">{title}</h4>
                    <p className="section-subtitle text-center mb-4">
                        {subtitle}
                    </p>
                    <RoadMapGrid />
                </div>
                {/* <div className="bg-poker-pattern" /> */}
            </div>
        )
    }
}
