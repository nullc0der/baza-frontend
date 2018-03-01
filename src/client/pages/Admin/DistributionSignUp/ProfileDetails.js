import React, { Component } from 'react'

class ProfileDetails extends Component {
  render() {
    return (
      <div className="signup-details-section profile-details-section">
        <div className="profile-photo" />
        <div className="profile-details">
          <div className="details-header">
            <div className="full-name">SHARAD KANT</div>
            <div className="profile-id">ID: 41</div>
          </div>
          <div className="details-body">
            <div className="profile-detail">
              <div className="label">EMAIL</div>
              <div className="value">
                <span className="value-text">someemail@comp.com</span>
                <div className="badge badge-pill badge-success">Verified</div>
                <div className="badge badge-pill badge-light">
                  <i className="fa fa-exclamation-triangle text-danger" />
                  This email was used for previous signups
                </div>
              </div>
            </div>
            <div className="profile-detail">
              <div className="label">PHONE</div>
              <div className="value">
                <span className="value-text">9876543210</span>
                <div className="badge badge-pill badge-warning text-white">
                  Mobile
                </div>
                <div className="badge badge-pill badge-danger">
                  Non-Verifiable No.
                </div>
                <div className="badge badge-pill badge-light">
                  <i className="fa fa-exclamation-triangle text-danger" />
                  No data available on twilio
                </div>
              </div>
            </div>
            <div className="profile-detail">
              <div className="label">PROFILE LINK</div>
              <div className="value">user.name.here</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileDetails
