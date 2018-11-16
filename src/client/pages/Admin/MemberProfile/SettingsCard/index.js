import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
    Card,
    CardHeader,
    CardHeaderTabs,
    CardBody
} from 'components/ui/CardWithTabs'

import SetPassword from './SetPassword'
import TwoFactor from './TwoFactor'
import ActivityLog from './ActivityLog'

const CARD_TABS = [
    { label: 'Password' },
    { label: 'Two Factor Authentication' },
    { label: 'Activity Log' }
]
export default class SettingsCard extends Component {
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
            <Card className="settings-card">
                <CardHeader title="SETTINGS">
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
                        <SetPassword />
                        <TwoFactor />
                        <ActivityLog visible={this.state.selectedTabIndex === 2} />
                    </SwipeableViews>
                </CardBody>
            </Card>
        )
    }
}
