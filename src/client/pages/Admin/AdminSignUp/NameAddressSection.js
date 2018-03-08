import React, { Component } from 'react'

import TextField from 'components/ui/TextField'

export default class NameAndAddressSection extends Component {
  render() {
    return (
      <div className="signup-section name-address-section">
        <div className="row">
          <div className="col-md-6 mb-3">
            <TextField label="First Name" />
          </div>
          <div className="col-md-6 mb-3">
            <TextField label="Last Name" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <TextField
              className="is-textbox"
              label="Enter your referral code here"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <TextField label="Country" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <TextField label="City" />
          </div>
          <div className="col-md-6 mb-3">
            <TextField label="State" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <TextField label="House No." />
          </div>
          <div className="col-md-4 mb-3">
            <TextField label="Street Name" />
          </div>
          <div className="col-md-4 mb-3">
            <TextField label="Zip Code" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <TextField label="Additional Information" />
          </div>
        </div>
      </div>
    )
  }
}
