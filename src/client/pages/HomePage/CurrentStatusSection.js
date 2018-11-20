import React from 'react'
import classnames from 'classnames'

import DonationProgressBar from 'components/DonationProgressBar'
import DonationList from 'components/DonationList'
import VideoPlayer from 'components/VideoPlayer'

import { Link } from 'react-router-dom'

const CurrentStatusSection = props => {
    const cx = classnames('current-status-section bg-light', props.className)

    return (
        <div className={cx} id={props.id}>
            <div className="container page-section">
                <h3 className="text-center mb-3"> Current Status </h3>
                <div className="row mb-5">
                    <div className="col-12 mx-auto">
                        {/* <div className="embed-responsive embed-responsive-16by9">
                            <video
                                title="Baza Intro"
                                className="embed-responsive-item"
                                src="/public/videos/Baza Intro.mp4"
                                controls
                            />
                        </div> */}
                        <VideoPlayer
                            src="/public/videos/Baza Intro.mp4"
                            poster="/public/videothumbnails/Baza Intro.jpeg"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <h4 className="section-title-underlined">
                            Distribution Process
                        </h4>
                        <p>
                            When the amount donated reaches USD 2 per recipient
                            & Administration fee + Development fund of 8%, then
                            the distribution will take place. The next
                            distribution is based on the total new recipient
                            signups plus the current ones.
                        </p>

                        <h4 className="section-title-underlined">
                            Current Status
                        </h4>
                        <p className="mb-6 mb-md-5 mb-lg-5 mb-xl-5">
                            For the current distribution to take place,
                            donations made must reach the required goal of
                            $2160. Once this goal is reached, an automatic equal
                            release of the redeemable baza tokens will be
                            distributed to the qualifying account holders.
                        </p>
                        <DonationProgressBar max={1500} value={1088} />
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
                        <DonationList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentStatusSection
