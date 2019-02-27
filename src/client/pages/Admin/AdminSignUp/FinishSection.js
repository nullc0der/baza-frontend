import React, { Component } from 'react'
import classnames from 'classnames'

export default class FinishSection extends Component {
    render() {
        const attentionBtnClasses = {
            pending: 'btn-warning',
            approved: 'btn-success',
            declined: 'btn-danger',
            incomplete: 'btn-info'
        }
        const donorCheckText = this.props.isDonor
            ? 'Thank you for becoming a donor'
            : 'I want to become a donor'

        const donorCheckClassName = classnames('become-donor-check', {
            'bg-success': this.props.isDonor
        })

        return (
            <div className="signup-section finish-section">
                <div className="section-title">THANKS & CONGRATULATIONS</div>
                <div className="text-center flex-1 infos">
                    <p className="finish-message mt-2">
                        Thank you for registering to baza distribution and
                        providing us with your information
                    </p>
                    <p className="mt-2">Your registration status is</p>
                    <button
                        className={`btn ${
                            attentionBtnClasses[this.props.status]
                        } mt-1 mx-auto attention-btn`}>
                        {this.props.status}
                    </button>
                </div>
                {this.props.status === 'pending' && (
                    <div className="finish-bottom-message py-3 px-5 text-center">
                        Your registration will be processed soon, you will get
                        an email once approved or return to this page to check
                        your status.
                    </div>
                )}
                <div
                    className={donorCheckClassName}
                    onClick={this.props.toggleDonorStatus}>
                    {donorCheckText}
                </div>
            </div>
        )
    }
}
