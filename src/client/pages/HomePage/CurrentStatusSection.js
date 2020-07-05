import React, { Component } from 'react'
import classnames from 'classnames'

// import DonationProgressBar from 'components/DonationProgressBar'
// import DonationList from 'components/DonationList'
import VideoPlayer from 'components/VideoPlayer'

import { MatomoContext } from 'context/Matomo'

// import { Link } from 'react-router-dom'

class CurrentStatusSection extends Component {
    static contextType = MatomoContext

    handleVideoPlay = () => {
        this.context.trackEvent({
            category: 'Video',
            action: 'Played',
            name: 'baza-intro',
        })
    }

    render() {
        const cx = classnames(
            'current-status-section bg-light',
            this.props.className
        )
        // const donation = this.props.stats

        return (
            <div className={cx} id={this.props.id}>
                <div className="container page-section">
                    <h3 className="text-center mb-3"> Intro Video </h3>
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <VideoPlayer
                                src="/public/videos/Baza Intro.mp4"
                                poster="/public/videothumbnails/Baza Intro.jpeg"
                                onPlay={this.handleVideoPlay}
                            />
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-lg-8">
                            <h4 className="section-title-underlined">
                                Distribution Process
                            </h4>
                            <p>
                                We receive donations from donors and when the
                                amount reaches USD 2 per recipient, donation
                                plus administration fee + development fund +
                                processor fee, then the distribution will take
                                place. The next distribution is based on the
                                total new recipient signups plus the current
                                ones.
                            </p>

                            <h4 className="section-title-underlined">
                                Current Status
                            </h4>
                            <p className="mb-6 mb-md-5 mb-lg-5 mb-xl-5">
                                For the current distribution to take place,
                                donations made must reach the required goal of
                                $1500. Once this goal is reached, an automatic
                                equal release of the baza tokens will be
                                distributed to the qualifying account holders,
                                which will be redeemable on accepted exchanges
                                after Series B Fundraiser.
                            </p>
                            <DonationProgressBar
                                max={donation.required || 1500}
                                value={donation.collected || 10}
                            />
                            <div className="pt-3">
                                <Link to="/#!donate" className="btn btn-dark">
                                    Donate Now
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 mt-4 mt-lg-0 mt-xl-0">
                            <h4 className="section-title-underlined">
                                Just Donated
                            </h4>
                            <DonationList
                                donationRenderer={item =>
                                    `Donated $${item.amount}`
                                }
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default CurrentStatusSection
