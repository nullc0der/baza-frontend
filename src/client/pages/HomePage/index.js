import React, { Component } from 'react'
import classnames from 'classnames'

import Helmet from 'react-helmet'

// import ContentWithImage from 'components/FullScreenPages/ContentWithImage'
import Header from 'components/Header'
import Footer from 'components/Footer'

import BasicIncomeCalculator from 'components/BasicIncomeCalculator'
import ParallaxContainer from 'components/ui/ParallaxContainer'

import FeaturesSection from './FeaturesSection'
import CurrentStatusSection from './CurrentStatusSection'
import LatestDistributionSection from './LatestDistributionSection'
import ContactSection from './ContactSection'
import WhitePaperSection from './WhitePaperSection'
import MapSection from './MapSection'
import RoadMapSection from './RoadMapSection'

import { Link } from 'react-router-dom'

import './HomePage.scss'

class HomePage extends Component {
    componentDidMount = () => {}

    componentWillUnmount = () => {}

    render() {
        const cx = classnames('home-page')
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
                        <p> Donate now and become part of the UBI family. </p>
                    </Link>
                </ParallaxContainer>
                <FeaturesSection id="features-section" />
                <WhitePaperSection id="white-paper-section" />
                <CurrentStatusSection id="status-section" />
                <LatestDistributionSection id="latest-section" />
                <MapSection id="map-section" />
                <RoadMapSection id="roadmap-section" />
                <ContactSection id="contact-section" />
                <Footer />
            </div>
        )
    }
}

export default HomePage
