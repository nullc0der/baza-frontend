import React, { Component } from 'react'

import DistributionSignupInfoCard from './DistributionSignupInfoCard'

class OtherInfo extends Component {
    render() {
        const { otherInfo } = this.props
        return (
            <DistributionSignupInfoCard
                title="Other Info"
                className="other-info">
                <div className="row">
                    <div className="col-md-3">
                        <div className="text-box">
                            <div className="title">Signup Date</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {new Date(
                                        otherInfo.signup_date
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-box">
                            <div className="title">Verified Date</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {new Date(
                                        otherInfo.verified_date
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-box">
                            <div className="title">On Distribution</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.on_distribution ? 'Yes' : 'No'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="text-box">
                            <div className="title">Referral Code</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.referral_code}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-box">
                            <div className="title">Total Referrals</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.total_referrals}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-box">
                            <div className="title">Donor</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.is_donor ? 'Yes' : 'No'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-box">
                            <div className="title">Referred By</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.referred_by}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-box">
                            <div className="title">Wallet Address</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.wallet_address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DistributionSignupInfoCard>
        )
    }
}

export default OtherInfo
