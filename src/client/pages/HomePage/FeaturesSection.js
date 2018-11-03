import React from 'react'
import classnames from 'classnames'
import CoinSale from 'pages/Admin/CoinSale'

const FEATURES = [
    {
        image: '/public/img/features/mining.svg',
        title: 'GPU MINING',
        subtitle: 'Security',
        description:
            'Easy entry level GPU mining of the Baza token to support the network'
    },
    {
        image: '/public/img/features/community.svg',
        title: 'COMMUNITY',
        subtitle: 'Support',
        description:
            'Join the Foundation become a continued member and one of our patrons'
    },
    {
        image: '/public/img/features/store-locally.svg',
        title: 'STORE LOCALLY',
        subtitle: 'Decentralize',
        description:
            'Download and store your Baza Tokens on your choice of operating system'
    }
]

const FeaturesSection = props => {
    const cx = classnames(props.className, 'features-section')
    const iconClassName = classnames(props.iconClassName, 'feature-icon')
    const buttonClassName = classnames(
        props.buttonClassName,
        'feature-button btn-rounded-white'
    )
    const list = props.list || FEATURES
    const title = props.title || 'Baza Token'
    return (
        <div className={cx} id={props.id}>
            <div className="container page-section">
                <h3 className="text-center mb-5"> {title} </h3>
                <div className="row">
                    {list.map(feature => (
                        <div
                            className="col-md-4 feature-item mt-3 px-1"
                            key={feature.image}>
                            <div className={iconClassName}>
                                <img alt={feature.title} src={feature.image} />
                            </div>
                            <div className={buttonClassName}>
                                <div className="feature-title">
                                    {feature.title}
                                </div>
                                <div className="feature-subtitle">
                                    {feature.subtitle}
                                </div>
                            </div>
                            <div className="text-center">
                                {feature.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {!props.noCoinSale && (
                <div className="container coinsale-section page-section">
                    <CoinSale className="pt-4" />
                </div>
            )}
        </div>
    )
}

export default FeaturesSection
