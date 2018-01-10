import React, {Component} from 'react'
import classnames from 'classnames'


// import ContentWithImage from 'components/FullScreenPages/ContentWithImage'
import Header from 'components/Header'
import Footer from 'components/Footer'

import BasicIncomeCalculator from "components/BasicIncomeCalculator"
import ParallaxContainer    from 'components/ui/ParallaxContainer'

import FeaturesSection from "./FeaturesSection"
import CurrentStatusSection from "./CurrentStatusSection"
import LatestDistributionSection from "./LatestDistributionSection"
import ContactSection from "./ContactSection"

import './HomePage.scss'

class HomePage extends Component {
	render(){
		const cx = classnames('home-page')
		return (
			<div className={cx}>
				<ParallaxContainer
					className='top-parallax-section flex-vertical'
					backgroundImage='/public/img/hero_image.jpg'>

					<div className='flex-vertical fill'>
						<Header inCenter showDonateButton/>
						<div className='container fill flex-vertical'>
							<div className='row fill align-items-center justify-content-center'>
								<div className='col-sm-12 col-xs-12 mx-auto'>
									<h2 className='hero-title text-center'> Baza Coin (BAZ) </h2>
									<h4 className='hero-subtitle mb-3 text-center'> Because everyone needs a basic foundation </h4>
									<div className='row'>
										<BasicIncomeCalculator className='hero-form col-sm-12 col-xs-12 mx-auto'/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='hero-donate-wrapper flex-vertical align-items-center justify-content-center'>
						<h3> Donate Now </h3>
						<p> Donate now and become part of the family. </p>
					</div>

				</ParallaxContainer>

				<FeaturesSection />
				<CurrentStatusSection />
				<LatestDistributionSection />
				<ContactSection/>

				<Footer/>
			</div>
		)
	}
}

export default HomePage
