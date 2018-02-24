import React, { Component } from 'react'

import TextField from 'components/ui/TextField'

export default class NameAndAddressSection extends Component {
  render() {
    return (
      <div className="signup-section name-address-section">
        <div className="row mb-3">
          <div className="col-md-6">
            <TextField label="First Name" />
          </div>
          <div className="col-md-6">
            <TextField label="Last Name" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <TextField
              className="is-textbox"
              label="Enter your referral code here"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <TextField label="Country" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <TextField label="City" />
          </div>
          <div className="col-md-6">
            <TextField label="State" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <TextField label="House No." />
          </div>
          <div className="col-md-4">
            <TextField label="Street Name" />
          </div>
          <div className="col-md-4">
            <TextField label="Zip Code" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <TextField label="Additional Information" />
          </div>
        </div>
      </div>
    )
  }
}
