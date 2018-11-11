import React, { Component } from 'react'
import DonationList from 'components/DonationList'

import BasicCard from '../BasicCard'
import s from '../MemberProfile.scss'

export default class ActivityCard extends Component {
    render() {
        return (
            <BasicCard
                className={s.justDonatedCard}
                title='Just Donated'>
                <DonationList />
            </BasicCard>
        )
    }
}
