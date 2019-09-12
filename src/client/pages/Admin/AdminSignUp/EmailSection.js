import React, { Component, Fragment } from 'react'
import includes from 'lodash/includes'

import TextField from 'components/ui/TextField'

export default class EmailSection extends Component {
    render() {
        const {
            errorState,
            onInputChange,
            sendCode,
            sendCodeAgain,
            showEmailTryAgain,
            inputValues,
            invalidatedFields
        } = this.props
        return (
            <div className="signup-section email-section">
                <div className="section-title my-2">ENTER EMAIL ADDRESS</div>
                <div className="email-verification-box">
                    <TextField
                        center
                        type="email"
                        className="is-textbox my-3"
                        placeholder="youremailhere@host.tld"
                        errorState={
                            errorState.email ||
                            (includes(invalidatedFields, 'email')
                                ? ['This field is marked as violation']
                                : null)
                        }
                        value={inputValues.email}
                        onChange={onInputChange}
                        id="email"
                    />
                    <div
                        className="btn btn-primary btn-block send-verification-btn"
                        onClick={sendCode}>
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
                            type="text"
                            center
                            className="is-textbox"
                            placeholder="verification code"
                            errorState={errorState.verificationCode}
                            value={inputValues.verificationCode}
                            onChange={onInputChange}
                            id="verificationCode"
                            min="1"
                            max="6"
                        />
                    </div>
                    {/* <div className="col-md-5 pl-2 pl-md-0 pl-xl-0 pl-lg-0 pt-1 pt-md-0 pt-xl-0 pt-lg-0">
                        <button className="btn btn-primary btn-block verification-submit-btn">
                            SUBMIT
                        </button>
                    </div> */}
                </div>
                {showEmailTryAgain && (
                    <Fragment>
                        <div className="section-title">
                            Didn't get the code or code is expired?
                        </div>
                        <div
                            className="btn btn-link try-again-button"
                            onClick={sendCodeAgain}>
                            {' '}
                            Send email again{' '}
                        </div>
                    </Fragment>
                )}
                <br />
            </div>
        )
    }
}
