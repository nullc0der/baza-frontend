import React, { Component } from 'react'
import classnames from 'classnames'
import { RoadmapItem } from './RoadmapLadder'
import LIST from './roadmap.data'
import * as util from './utils'

export default class RoadmapGrid extends Component {
    state = {
        selectedMilestone: 0
    }

    renderItem = index => {
        const item = LIST[index]
        return (
            <RoadmapItem
                key={index}
                intermediate={true}
                index={index}
                status={item.status}
                date={item.date}
                title={item.title}
            />
        )
    }

    componentDidMount = () => {
        if (document.body.getBoundingClientRect().width > 900) {
            setTimeout(this.fixHeights, 1000)
        }
    }

    fixHeights = () => {
        util.findRows(this.container)
            .filter(util.isRowDistorted)
            .map(util.withMaxColHeights)
            .forEach(util.normalizeColHeights)
    }

    render() {
        const cx = classnames('milestone-grid', this.props.gridClassName)
        return (
            <div
                className={cx}
                ref={node => {
                    this.container = node
                }}>
                <div className="milestone-row row">
                    <div className="mb-2 col-md-4">{this.renderItem(0)}</div>
                    <div className="mb-2 col-md-4">{this.renderItem(1)}</div>
                    <div className="mb-2 col-md-4">{this.renderItem(2)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-2 col-md-4">{this.renderItem(3)}</div>
                    <div className="mb-2 col-md-4">{this.renderItem(4)}</div>
                    <div className="mb-2 col-md-4">{this.renderItem(5)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-2 col-md-4">{this.renderItem(6)}</div>
                    <div className="mb-2 col-md-8">{this.renderItem(7)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-2 col-md-6">{this.renderItem(8)}</div>
                    <div className="mb-2 col-md-6">{this.renderItem(9)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-2 col-md-5">{this.renderItem(10)}</div>
                    <div className="mb-2 col-md-7">{this.renderItem(11)}</div>
                </div>
            </div>
        )
    }
}
