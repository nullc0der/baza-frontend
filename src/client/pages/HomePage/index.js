import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Helmet from 'react-helmet'

import Config from 'utils/config'

// import ContentWithImage from 'components/FullScreenPages/ContentWithImage'
import Header from 'components/Header'
import Footer from 'components/Footer'

import BasicIncomeCalculator from 'components/BasicIncomeCalculator'
import ParallaxContainer from 'components/ui/ParallaxContainer'

import FeaturesSection from './FeaturesSection'
import CurrentStatusSection from './CurrentStatusSection'
// import LatestDistributionSection from './LatestDistributionSection'
// import ContactSection from './ContactSection'
// import WhitePaperSection from './WhitePaperSection'
import AboutSection from './AboutSection'
// import MapSection from './MapSection'
// import RoadMapSection from './RoadMapSection'
import NewsSection from './NewsSection'
import ExchageSection from './ExchangeSection'
import TelegramSection from './TelegramSection'

import { Link } from 'react-router-dom'

import { actions as landingActions } from 'store/Landing'

import './HomePage.scss'

class HomePage extends Component {
    componentDidMount = () => {
        // this.props
        //     .fetchStats()
        //     .then(() => {})
        //     .catch(() => {})
        if (this.props.isGRecaptchaReady) {
            this.executeHomePageLoadAction()
        }
    }

    componentDidUpdate = (prevProps, _) => {
        if (
            prevProps.isGRecaptchaReady !== this.props.isGRecaptchaReady &&
            this.props.isGRecaptchaReady
        ) {
            this.executeHomePageLoadAction()
        }
    }

    componentWillUnmount = () => {}

    executeHomePageLoadAction = () => {
        window.grecaptcha
            .execute(Config.get('GOOGLE_RECAPTCHA_SITE_KEY'), {
                action: 'homepage',
            })
            .then(() => {})
    }

    render() {
        const cx = classnames('home-page')
        // const { landingStats } = this.props

        return (
            <div className={cx}>
                <Helmet title="Baza Foundation" />
                <ParallaxContainer
                    id="hero-section"
                    className="top-parallax-section flex-vertical"
                    backgroundImage="/public/img/hero_image.jpg">
                    <div className="flex-vertical fill">
                        <Header inCenter showDonateButton scrollspy />
                        <div className="container fill flex-vertical">
                            <div className="row fill align-items-center justify-content-center">
                                <div className="col-sm-12 col-xs-12 mx-auto">
                                    <h2 className="hero-title text-center">
                                        Baza Foundation
                                    </h2>
                                    <h4 className="hero-subtitle mb-3 text-center">
                                        Because everyone needs a basic
                                        foundation
                                    </h4>
                                    <div className="row">
                                        <BasicIncomeCalculator className="hero-form col-sm-12 col-xs-12 mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="#!donate" className="hero-donate-wrapper">
                        <h3> Donate Now </h3>
                        <p> Become a part of the basic income movement. </p>
                    </Link>
                </ParallaxContainer>
                <FeaturesSection id="features-section" />
                {/* <CurrentStatusSection
                    id="status-section"
                    stats={landingStats.donation || {}}
                /> */}
                <CurrentStatusSection id="status-section" />
                <NewsSection id="news-section" />
                <ExchageSection id="exchange-section" />
                <TelegramSection id="telegram-section" />
                <AboutSection id="about-section" />
                {/* <WhitePaperSection id="white-paper-section" />
                <LatestDistributionSection
                    id="latest-section"
                    stats={landingStats}
                />
                <MapSection id="map-section" /> */}
                {/* <RoadMapSection id="roadmap-section" /> */}
                {/* <ContactSection id="contact-section" /> */}
                <Footer id="footer" />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    landingStats: state.Landing.landingStats,
    isGRecaptchaReady: state.Common.isGRecaptchaReady,
})

const mapDispatchToProps = (dispatch) => ({
    fetchStats() {
        return dispatch(landingActions.fetchLandingStats())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
