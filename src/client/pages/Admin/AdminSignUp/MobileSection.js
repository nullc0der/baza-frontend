import React, { Component, Fragment } from 'react'

import noop from 'lodash/noop'

import { DateTime } from 'luxon'

import TextField from 'components/ui/TextField'
import PhoneNumberField from 'components/ui/PhoneNumberField'
import Config from 'utils/config'

export default class MobileSection extends Component {
    state = {
        smsExpiryCountDown: {
            minutes: 0,
            seconds: 0
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevProps.smsSentAt !== this.props.smsSentAt &&
            this.props.smsSentAt
        ) {
            this.smsCountdownInterval = setInterval(this.startTimer, 1000)
        }
    }

    componentWillUnmount = () => {
        if (this.smsCountdownInterval) {
            clearInterval(this.smsCountdownInterval)
        }
    }

    startTimer = () => {
        const countdown = this.getCountdownValues(this.props.smsSentAt)
        if (countdown.seconds <= 0) {
            clearInterval(this.smsCountdownInterval)
            this.props.onSMSCountDownExpiry()
        }
        this.setState({
            smsExpiryCountDown: countdown
        })
    }

    getCountdownValues = startTime => {
        const now = DateTime.local()
        const duration = startTime
            .plus({ seconds: Number(Config.get('SMS_CODE_EXPIRES_IN')) })
            .diff(now, ['minutes', 'seconds'])

        const diff = duration.toObject()
        const countdown = Object.keys(diff).reduce((result, key) => {
            var v = Math.floor(diff[key])
            result[key] = v.toString().length === 1 ? `0${v}` : v
            return result
        }, {})

        return countdown
    }

    render() {
        const { showPhoneTryAgain } = this.props

        return (
            <div className="signup-section mobile-section">
                <div className="section-title my-2">ENTER MOBILE NUMBER</div>
                <div className="mobile-verification-box">
                    <PhoneNumberField
                        className="phone-number-field mb-3"
                        showIcon={false}
                        onChange={this.props.onInputChange}
                        errorState={this.props.errorState.phoneNumber}
                    />
                    <div
                        className={`btn btn-primary btn-block send-verification-btn ${showPhoneTryAgain &&
                            'disabled'}`}
                        onClick={
                            showPhoneTryAgain ? noop : this.props.sendCode
                        }>
                        SEND VERIFICATION CODE
                    </div>
                </div>
                <hr className="my-4" />
                <div className="section-title mb-3">
                    ENTER VERIFICATION CODE
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <TextField
                            center
                            className="is-textbox text-center"
                            placeholder="verification code"
                            type="text"
                            id="smsVerificationCode"
                            onChange={this.props.onInputChange}
                            errorState={
                                this.props.errorState.smsVerificationCode
                            }
                            value={this.props.inputValues.smsVerificationCode}
                        />
                    </div>
                    {/* <div className="col-md-5 pl-2 pl-md-0 pl-xl-0 pl-lg-0 pt-1 pt-md-0 pt-xl-0 pt-lg-0">
                        <button className="btn btn-primary btn-block verification-submit-btn">
                            SUBMIT
                        </button>
                    </div> */}
                </div>
                {showPhoneTryAgain && (
                    <Fragment>
                        <div className="section-title">
                            Didn't get the code or code is expired?
                        </div>
                        <div className="section-subtitle">
                            Verification code will expire in{' '}
                            {this.state.smsExpiryCountDown.minutes}:
                            {this.state.smsExpiryCountDown.seconds}
                        </div>
                        {this.props.smsSentCount <= 3 && (
                            <div
                                className="btn btn-link try-again-button"
                                onClick={this.props.sendCodeAgain}>
                                Send SMS again
                            </div>
                        )}
                    </Fragment>
                )}
                <br />
            </div>
        )
    }
}
