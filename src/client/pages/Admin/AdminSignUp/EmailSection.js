import React, { Component } from 'react'

import TextField from 'components/ui/TextField'

export default class EmailSection extends Component {
  render() {
    return (
      <div className="signup-section email-section">
        <div className="section-title my-2">ENTER EMAIL ADDRESS</div>
        <div className="email-verification-box">
          <TextField
            center
            className="is-textbox my-1"
            placeholder="youremailhere@gmail.com"
          />
          <div className="btn btn-primary btn-block send-verification-btn">
            SEND VERIFICATION CODE
          </div>
        </div>
        <hr className="my-4" />
        <div className="section-title mb-3">ENTER VERIFICATION CODE</div>
        <div className="row mb-3">
          <div className="col-md-7">
            <TextField className="is-textbox" placeholder="verification code" />
          </div>
          <div className="col-md-5 pl-0">
            <button className="btn btn-primary btn-block verification-submit-btn">
              SUBMIT
            </button>
          </div>
        </div>
        <div className="section-title">Didn't get the code?</div>
        <div className="text-center"> Try Again </div>
        <br />
      </div>
    )
  }
}
