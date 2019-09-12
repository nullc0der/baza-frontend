import React, { Component, Fragment } from 'react'
import isEmpty from 'lodash/isEmpty'

import Avatar from 'components/Avatar'
import DistributionSignupInfoCard from './DistributionSignupInfoCard'

class OtherInfo extends Component {
    render() {
        const { otherInfo, toggleReassignDialog } = this.props
        return (
            <DistributionSignupInfoCard
                title="Other Info"
                className="other-info">
                <div className="row">
                    <div className="col-md-4">
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
                    <div className="col-md-4">
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
                    <div className="col-md-4">
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
                <div className="row mt-1">
                    <div className="col-md-5 col-xl-4">
                        <div className="text-box">
                            <div className="title">Referral Code</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.referral_code}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-4">
                        <div className="text-box">
                            <div className="title">Total Referrals</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {otherInfo.total_referrals}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xl-4">
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
                <div className="row mt-1">
                    <div className="col-md-6">
                        <div className="text-box">
                            <div className="title">Referred By</div>
                            <div className="content-with-badge">
                                <div className="content with-avatar">
                                    {!isEmpty(otherInfo.referred_by) ? (
                                        <Fragment>
                                            <Avatar
                                                className="avatar-image"
                                                size={23}
                                                otherProfile={{
                                                    username:
                                                        otherInfo.referred_by
                                                            .username,
                                                    profile_photo:
                                                        otherInfo.referred_by
                                                            .user_image_url,
                                                    default_avatar_color:
                                                        otherInfo.referred_by
                                                            .user_avatar_color
                                                }}
                                                own={false}
                                            />
                                            <span>
                                                {otherInfo.referred_by.fullname}
                                            </span>
                                        </Fragment>
                                    ) : (
                                        ''
                                    )}
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
                <div className="row mt-1">
                    <div className="col-md-6">
                        <div className="text-box">
                            <div className="title">Assigned Staff</div>
                            <div className="content-with-badge">
                                <div className="content with-avatar">
                                    {!isEmpty(otherInfo.assigned_to) ? (
                                        <Fragment>
                                            <Avatar
                                                className="avatar-image"
                                                size={23}
                                                otherProfile={{
                                                    username:
                                                        otherInfo.assigned_to
                                                            .username,
                                                    profile_photo:
                                                        otherInfo.assigned_to
                                                            .user_image_url,
                                                    default_avatar_color:
                                                        otherInfo.assigned_to
                                                            .user_avatar_color
                                                }}
                                                own={false}
                                            />
                                            <span>
                                                {otherInfo.assigned_to.fullname}
                                            </span>
                                        </Fragment>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <button
                                    className="btn btn-outline-dark ml-1"
                                    onClick={toggleReassignDialog}>
                                    Re-Assign
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </DistributionSignupInfoCard>
        )
    }
}

export default OtherInfo
