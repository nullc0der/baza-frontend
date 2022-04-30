import React, { Component } from 'react'
import classnames from 'classnames'

export default class FinishSection extends Component {
    onClickReferralURL = () => {
        const { addNotification, closeDialog } = this.props
        this.referralURLContainer.select()
        document.execCommand('copy')
        addNotification({
            message: 'Referral link copied to clipboard',
            level: 'info',
        })
        closeDialog()
    }

    render() {
        const { isDonor, status, referralURL, toggleDonorStatus } = this.props

        const attentionBtnClasses = {
            pending: 'btn-warning',
            approved: 'btn-success',
            declined: 'btn-danger',
            incomplete: 'btn-info',
        }
        const donorCheckText = this.props.isDonor
            ? 'Thank you for becoming a donor'
            : 'I want to become a donor'

        const donorCheckClassName = classnames('become-donor-check', {
            'bg-success': isDonor,
        })

        return (
            <div className="signup-section finish-section">
                <div className="section-title">THANKS & CONGRATULATIONS</div>
                <div className="text-center flex-1 infos">
                    <p className="finish-message mt-2">
                        Thank you for registering and providing us with your
                        information to be on the Baza Foundation distribution.
                    </p>
                    <p className="mt-2">Your registration status is</p>
                    <button
                        className={`btn ${attentionBtnClasses[status]} mt-1 mx-auto attention-btn`}>
                        {status}
                    </button>
                </div>
                {status === 'pending' && (
                    <div className="finish-bottom-message py-3 px-5 text-center">
                        Your registration will be processed soon, you will get
                        an email once approved or you can return to this page to
                        check your status.
                    </div>
                )}
                {referralURL.length && (
                    <div className="referral-url-section py-3 px-3 text-center">
                        <p>Your referral code is</p>
                        <div
                            className="input-group input-group-sm"
                            onClick={this.onClickReferralURL}>
                            <textarea
                                readOnly
                                className="form-control"
                                value={referralURL}
                                ref={(node) =>
                                    (this.referralURLContainer = node)
                                }
                            />
                            <div className="input-group-append">
                                <i className="input-group-text fa fa-clone" />
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className={donorCheckClassName}
                    onClick={toggleDonorStatus}>
                    {donorCheckText}
                </div>
            </div>
        )
    }
}
