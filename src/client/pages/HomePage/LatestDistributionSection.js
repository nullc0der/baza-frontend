import React from 'react'
import FeaturesSection from './FeaturesSection'

const LIST = [
    {
        image: '/public/img/latest-distribution/donors.svg',
        title: '1,987',
        subtitle: 'Donor',
        description:
            'Donors are patrons members that contribute towards the foundation & token distribution'
    },
    {
        image: '/public/img/latest-distribution/baz-distributed.svg',
        title: '1,28,211',
        subtitle: 'Baz Distributed',
        description:
            'Baz are redeemable tokens that are automatically distributed to all qualifying members as basic income'
    },
    {
        image: '/public/img/latest-distribution/receipients.svg',
        title: '10,432',
        subtitle: 'Receipients',
        description:
            'Recipients are our qualifying platform members who receive the distributed token'
    }
]

const LatestDistributionSection = props => {
    return (
        <FeaturesSection
            className="latest-distribution-section"
            list={LIST}
            title="Latest Distribution"
            noCoinSale
            iconClassName="latest-distribution-icon"
            buttonClassName="latest-distribution-button"
            {...props}
        />
    )
}

export default LatestDistributionSection
