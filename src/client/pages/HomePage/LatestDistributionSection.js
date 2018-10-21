import React from 'react'
import FeaturesSection from './FeaturesSection'

const LIST = [
    {
        image: '/public/img/latest-distribution/donors.svg',
        title: '1,987',
        subtitle: 'Donors',
        description:
            'Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient.'
    },
    {
        image: '/public/img/latest-distribution/baz-distributed.svg',
        title: '1,28,211',
        subtitle: 'Baz Distributed',
        description:
            'Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient.'
    },
    {
        image: '/public/img/latest-distribution/receipients.svg',
        title: '10,432',
        subtitle: 'Receipients',
        description:
            'Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient.'
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
