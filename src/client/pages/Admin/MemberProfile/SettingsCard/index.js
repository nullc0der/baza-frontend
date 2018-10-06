import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
    Card,
    CardHeader,
    CardHeaderTabs,
    CardBody
} from 'components/ui/CardWithTabs'

import SocialSettings from './SocialSettings'
import PublicVisibility from './PublicVisibility'
import SetPassword from './SetPassword'

const CARD_TABS = [
    { label: 'Social Settings' },
    { label: 'Public Visibility' },
    { label: 'Password' }
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
                        <SocialSettings />
                        <PublicVisibility />
                        <SetPassword />
                    </SwipeableViews>
                </CardBody>
            </Card>
        )
    }
}
