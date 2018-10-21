import React from 'react'
import classnames from 'classnames'

import DonationProgressBar from 'components/DonationProgressBar'
import DonationList from 'components/DonationList'

import { Link } from 'react-router-dom'

const CurrentStatusSection = props => {
    const cx = classnames('current-status-section bg-light', props.className)

    return (
        <div className={cx} id={props.id}>
            <div className="container page-section">
                <h3 className="text-center mb-3"> Current Status </h3>
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="embed-responsive embed-responsive-21by9">
                            <iframe
                                title="status-video"
                                className="embed-responsive-item"
                                src="https://www.youtube.com/embed/FWoYfcSZzzY?rel=0&amp;controls=0&amp;showinfo=0"
                                frameBorder="0"
                                allow="encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <h4 className="section-title-underlined">
                            Donation Status
                        </h4>
                        <p>
                            When donation reach the goal an automatic purchase
                            of the baza and crypto on the market will be
                            purchased then distributed to the qualifying Baza
                            account holders in the form of basic income
                        </p>

                        <h4 className="section-title-underlined">
                            Where we are
                        </h4>
                        <p>
                            When donation reach the goal an automatic purchase
                            of the baza and crypto on the market will be
                            purchased then distributed to the qualifying Baza
                            account holders in the form of basic income
                        </p>
                        <DonationProgressBar max={1500} value={1088} />
                        <div className="pt-3">
                            <Link to="/#!donate" className="btn btn-dark">
                                Donate Now
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-3 mt-lg-0 mt-xl-0">
                        <h4 className="section-title-underlined">
                            Just Donated
                        </h4>
                        <DonationList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentStatusSection
