import React, { Component } from 'react'

import { RoadmapItem } from './RoadmapLadder'
import LIST from './roadmap.data'

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
        setTimeout(this.fixHeights, 1000)
    }

    getItems = () => {
        const selector = '.milestone-item .milestone-inner'
        return Array.from(this.container.querySelectorAll(selector))
    }

    fixHeights = () => {
        const maxHeight = this.getMaxMilestoneHeight()
        const items = this.getItems()
        items.forEach(item => {
            item.style.height = `${maxHeight}px`
        })
    }

    getMaxMilestoneHeight = () => {
        let maxHeight = 100
        this.getItems().forEach(item => {
            var h = item.getBoundingClientRect().height
            if (h > maxHeight) {
                maxHeight = h
            }
        })

        return maxHeight
    }

    render() {
        return (
            <div
                className="milestone-grid"
                ref={node => {
                    this.container = node
                }}>
                <div className="milestone-row row">
                    <div className="mb-3 col-md-4">{this.renderItem(0)}</div>
                    <div className="mb-3 col-md-4">{this.renderItem(1)}</div>
                    <div className="mb-3 col-md-4">{this.renderItem(2)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-3 col-md-4">{this.renderItem(3)}</div>
                    <div className="mb-3 col-md-4">{this.renderItem(4)}</div>
                    <div className="mb-3 col-md-4">{this.renderItem(5)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-3 col-md-4">{this.renderItem(6)}</div>
                    <div className="mb-3 col-md-8">{this.renderItem(7)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-3 col-md-8">{this.renderItem(8)}</div>
                    <div className="mb-3 col-md-4">{this.renderItem(9)}</div>
                </div>
                <div className="milestone-row row">
                    <div className="mb-3 col-md-4">{this.renderItem(10)}</div>
                    <div className="mb-3 col-md-8">{this.renderItem(11)}</div>
                </div>
            </div>
        )
    }
}
