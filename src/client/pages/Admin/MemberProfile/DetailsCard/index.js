import React, { Component } from 'react'
import classnames from 'classnames'
import SwipeableViews from 'react-swipeable-views'
import {
    Card,
    CardHeader,
    CardBody,
    CardHeaderTabs
} from 'components/ui/CardWithTabs'

import PhoneDetails from './PhoneDetails'
import EmailDetails from './EmailDetails'
import SocialDetails from './SocialDetails'

import s from './DetailsCard.scss'

const DETAILS_CARD_TABS = [
    { label: 'Phone' },
    { label: 'Email' },
    { label: 'Social' }
]

class DetailsCard extends Component {
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
        const cx = classnames(s.container, 'details-card')
        return (
            <Card className={cx}>
                <CardHeader title="DETAILS" subtitle="">
                    <CardHeaderTabs
                        fill
                        onTabClick={this.onTabClick}
                        selectedIndex={this.state.selectedTabIndex}
                        tabs={DETAILS_CARD_TABS}
                    />
                </CardHeader>
                <CardBody>
                    <SwipeableViews
                        index={this.state.selectedTabIndex}
                        onChangeIndex={this.changeSwipeIndex}>
                        <PhoneDetails />
                        <EmailDetails />
                        <SocialDetails />
                    </SwipeableViews>
                </CardBody>
            </Card>
        )
    }
}

export default DetailsCard
