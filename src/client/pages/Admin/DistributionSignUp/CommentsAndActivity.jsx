import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
    Card,
    CardHeader,
    CardHeaderTabs,
    CardBody
} from 'components/ui/CardWithTabs'

import SignupComment from './SignupComment'
import ActivityLog from './ActivityLog'

const CARD_TABS = [{ label: 'Comments' }, { label: 'Activity Log' }]

class CommentsAndActivityCard extends Component {
    state = {
        selectedTabIndex: 0
    }

    onTabClick = (tab, selectedTabIndex) => {
        this.setState({ selectedTabIndex })
    }

    changeSwipeIndex = selectedTabIndex => {
        this.setState({ selectedTabIndex })
    }

    render() {
        return (
            <Card className="comments-activity-card" id="commentsactivity">
                <CardHeader title="Comments And Activity">
                    <CardHeaderTabs
                        onTabClick={this.onTabClick}
                        selectedIndex={this.state.selectedTabIndex}
                        tabs={CARD_TABS}
                    />
                </CardHeader>
                <CardBody>
                    <SwipeableViews
                        index={this.state.selectedTabIndex}
                        onChangeIndex={this.changeSwipeIndex}>
                        <SignupComment />
                        <ActivityLog />
                    </SwipeableViews>
                </CardBody>
            </Card>
        )
    }
}

export default CommentsAndActivityCard
