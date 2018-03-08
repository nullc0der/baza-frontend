import React, { Component } from 'react'

export default class FinishSection extends Component {
  render() {
    return (
      <div className="signup-section finish-section">
        <div className="section-title">THANKS & CONGRATULATIONS</div>
        <div className="text-center flex-1">
          <p className="finish-message mt-2">
            Thank you for signing up to Baza Foundation and providing us with
            your information
          </p>
          <button className="btn btn-danger mt-3 mx-auto attention-btn">
            Your Account Needs Attention!!
          </button>
        </div>
        <div className="finish-bottom-message py-3 px-5 text-center">
          Your account will be processed soon, return to this page to check on
          your status.
        </div>
      </div>
    )
  }
}
