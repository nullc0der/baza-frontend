import React, { Fragment, Component } from 'react'
import classnames from 'classnames'
import CountUp from 'react-countup'
import TrackVisibility from 'react-on-screen'
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

class FeatureItem extends Component {
    renderAnimatedCount = (title) => {
        return (
            <CountUp start={0} end={title} delay={0} duration={3} separator=','>
                {({ countUpRef }) => <div>
                    <span ref={countUpRef}></span>
                </div>}
            </CountUp>
        )
    }

    renderSection = (isVisible) => {
        const {
            iconClassName,
            image,
            title,
            buttonClassName,
            subtitle,
            description
        } = this.props

        return (
            <Fragment>
                <div className={iconClassName}>
                    <img alt={title} src={image} />
                </div>
                <div className={buttonClassName}>
                    <div className="feature-title">
                        {isVisible
                            ? this.renderAnimatedCount(title)
                            : title
                        }
                    </div>
                    <div className="feature-subtitle">
                        {subtitle}
                    </div>
                </div>
                <div className="text-center">
                    {description}
                </div>
            </Fragment>
        )
    }

    render() {
        const cx = 'col-md-6 col-lg-4 col-xl-4 feature-item mt-3 px-1 pb-4'
        if (!this.props.animateCount) {
            return <div className={cx}> {this.renderSection()} </div>
        }
        return (
            <TrackVisibility
                once
                className={cx}
                partialVisibility={this.props.index >= 1}>
                {({ isVisible }) => this.renderSection(isVisible)}
            </TrackVisibility>
        )
    }
}

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
                <div className="row justify-content-center">
                    {list.map((feature, i) => (
                        <FeatureItem
                            key={feature.title}
                            animateCount={props.animateCount}
                            index={i}
                            title={feature.title}
                            subtitle={feature.subtitle}
                            image={feature.image}
                            description={feature.description}
                            iconClassName={iconClassName}
                            buttonClassName={buttonClassName} />
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
