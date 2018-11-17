import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'

import {
    Card,
    CardHeader,
    CardHeaderTabs,
    CardBody
} from 'components/ui/CardWithTabs'

export default class SwipeableCard extends Component {
    static propTypes = {
        tabs: PropTypes.array.isRequired,
        className: PropTypes.string.isRequired
    }

    state = {
        selectedTabIndex: 0,
        childHeight: null
    }

    componentDidMount = () => {
        const timeout = process.env.NODE_ENV === 'development' ? 1000 : 0
        setTimeout(this.fixChildrenHeight, timeout)
    }

    fixChildrenHeight = () => {
        const bodyBounds = this.bodyContainer.getBoundingClientRect()
        this.bodyContainer.querySelectorAll('.ui-card-content').forEach(el => {
            el.style.height = bodyBounds.height + 'px'
        })
    }

    onTabClick = (tab, selectedTabIndex) => {
        this.setState({ selectedTabIndex })
    }

    changeSwipeIndex = selectedTabIndex => {
        this.setState({ selectedTabIndex })
    }

    renderOneTabContent = (content, index) => {
        const additionalProps = {
            visible: this.state.selectedTabIndex === index
        }

        // if (this.state.childHeight) {
        //     additionalProps.style = { height: this.state.childHeight }
        // }

        return React.cloneElement(content, additionalProps)
    }

    render() {
        const {
            tabs,
            className,
            headerTitle,
            headerSubtitle = '',
            fillTabs = false,
            children
        } = this.props

        return (
            <Card className={className}>
                <CardHeader title={headerTitle} subtitle={headerSubtitle}>
                    <CardHeaderTabs
                        fill={fillTabs}
                        onTabClick={this.onTabClick}
                        selectedIndex={this.state.selectedTabIndex}
                        tabs={tabs}
                    />
                </CardHeader>
                <CardBody ref={node => { this.bodyContainer = node }}>
                    <SwipeableViews
                        index={this.state.selectedTabIndex}
                        onChangeIndex={this.changeSwipeIndex}>
                        {React.Children.map(children, this.renderOneTabContent)}
                    </SwipeableViews>
                </CardBody>
            </Card>
        )
    }
}
