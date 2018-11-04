import React, { Component } from 'react'
import TrackVisibility from 'react-on-screen'
import FeaturesSection from './FeaturesSection'

const LIST = [
    {
        image: '/public/img/latest-distribution/donors.svg',
        title: 1987,
        subtitle: 'Donor',
        description:
            'Donors are patrons members that contribute towards the foundation & token distribution'
    },
    {
        image: '/public/img/latest-distribution/baz-distributed.svg',
        title: 128211,
        subtitle: 'Baz Distributed',
        description:
            'Baz are redeemable tokens that are automatically distributed to all qualifying members as basic income'
    },
    {
        image: '/public/img/latest-distribution/receipients.svg',
        title: 10432,
        subtitle: 'Recipients',
        description:
            'Recipients are our qualifying platform members who receive the distributed token'
    }
]

class LatestDistributionSection extends Component {
    state = {
        list: [...LIST]
    }

    render() {
        return (
            <TrackVisibility once>
                {
                    ({ isVisible }) => <FeaturesSection
                        className="latest-distribution-section"
                        list={this.state.list}
                        title="Latest Distribution"
                        noCoinSale
                        animateCount={isVisible}
                        iconClassName="latest-distribution-icon"
                        buttonClassName="latest-distribution-button"
                        {...this.props}
                    />
                }
            </TrackVisibility>
        )
    }
}

export default LatestDistributionSection
