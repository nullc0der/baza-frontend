import React, { Component } from 'react'

export default class FinishSection extends Component {
    render() {
        const attentionBtnClasses = {
            'pending': 'btn-warning',
            'approved': 'btn-success',
            'declined': 'btn-danger',
            'incomplete': 'btn-info'
        }
        return (
            <div className="signup-section finish-section">
                <div className="section-title">THANKS & CONGRATULATIONS</div>
                <div className="text-center flex-1 infos">
                    <p className="finish-message mt-2">
                        Thank you for signing up to Baza Foundation and providing us with
                        your information
                    </p>
                    <p className="mt-2">
                        Your signup status is
                    </p>
                    <button className={`btn ${attentionBtnClasses[this.props.status]} mt-1 mx-auto attention-btn`}>
                        {this.props.status}
                    </button>
                </div>
                {
                    this.props.status === 'pending' && (
                        <div className="finish-bottom-message py-3 px-5 text-center">
                            Your account will be processed soon, return to this page to check on
                            your status.
                        </div>
                    )
                }
            </div>
        )
    }
}
