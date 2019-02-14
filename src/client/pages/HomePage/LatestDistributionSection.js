import React, { Component } from 'react'
import FeaturesSection from './FeaturesSection'

import { getTotalDonors } from 'api/donations'
import { getTotalRecipients } from 'api/distribution-signup'

class LatestDistributionSection extends Component {
    state = {
        list: [
            {
                image: '/public/img/latest-distribution/baz-distributed.svg',
                title: 0,
                subtitle: 'Baz Distributed',
                description:
                    'Baz are redeemable tokens that are automatically distributed to all qualifying members as basic income'
            }
        ]
    }

    componentDidMount() {
        getTotalDonors().then(res => {
            this.setState(prevState => ({
                list: [
                    ...prevState.list,
                    {
                        image: '/public/img/latest-distribution/donors.svg',
                        title: res.data.total_donors,
                        subtitle: 'Donor',
                        description:
                            'Donors are patron members that contribute towards the foundation & token distribution'
                    }
                ]
            }))
        })
        getTotalRecipients().then(res => {
            this.setState(prevState => ({
                list: [
                    ...prevState.list,
                    {
                        image:
                            '/public/img/latest-distribution/receipients.svg',
                        title: res.data.total_distribution_count,
                        subtitle: 'Recipients',
                        description:
                            'Recipients are our qualifying platform members who receive the distributed token.'
                    }
                ]
            }))
        })
    }

    render() {
        return (
            <FeaturesSection
                className="latest-distribution-section"
                list={this.state.list}
                title="Latest Distribution"
                noCoinSale
                animateCount={true}
                iconClassName="latest-distribution-icon"
                buttonClassName="latest-distribution-button"
                {...this.props}
            />
        )
    }
}

export default LatestDistributionSection
