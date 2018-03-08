import React, { Component } from 'react'

import TextField from 'components/ui/TextField'

export default class MobileSection extends Component {
  render() {
    return (
      <div className="signup-section mobile-section">
        <div className="section-title my-2">ENTER MOBILE NUMBER</div>
        <div className="mobile-verification-box">
          <TextField
            center
            type="tel"
            className="is-textbox my-1"
            placeholder="+XX - XXXX-XXX-XXX"
          />
          <div className="btn btn-primary btn-block send-verification-btn">
            SEND VERIFICATION CODE
          </div>
        </div>
        <hr className="my-4" />
        <div className="section-title mb-3">ENTER VERIFICATION CODE</div>
        <div className="row mb-3">
          <div className="col-md-7">
            <TextField
              center
              className="is-textbox text-center"
              placeholder="verification code"
              type="number"
            />
          </div>
          <div className="col-md-5 pl-2 pl-md-0 pl-xl-0 pl-lg-0 pt-1 pt-md-0 pt-xl-0 pt-lg-0">
            <button className="btn btn-primary btn-block verification-submit-btn">
              SUBMIT
            </button>
          </div>
        </div>
        <div className="section-title">Didn't get the code?</div>
        <div className="btn btn-link try-again-button"> Try Again </div>
        <br />
      </div>
    )
  }
}
