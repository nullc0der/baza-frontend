import React, { Component } from 'react'
import classnames from 'classnames'
import SwipeableCard from 'components/ui/SwipeableCard'

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
    render() {
        const cx = classnames(s.container, 'details-card')
        return (
            <SwipeableCard
                className={cx}
                headerTitle="DETAILS"
                tabs={DETAILS_CARD_TABS}
                id="details">
                <PhoneDetails />
                <EmailDetails />
                <SocialDetails />
            </SwipeableCard>
        )
    }
}

export default DetailsCard
