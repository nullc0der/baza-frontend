import React, { Component } from 'react'
import { CardContent } from 'components/ui/CardWithTabs'

export default class SocialSettings extends Component {
  render() {
    return (
      <CardContent>
        <div className="settings-section">
          <div className="section-title">Linked Social Accounts</div>
          <div className="social-accounts-list">
            <div className="social-account account-facebook">
              <div className="social-account-icon">
                <i className="fa fa-facebook" />
              </div>
              <div className="social-account-name">Facebook</div>
            </div>
            <div className="social-account account-google">
              <div className="social-account-icon">
                <i className="fa fa-google-plus" />
              </div>
              <div className="social-account-name">Google</div>
            </div>
            <div className="social-account account-new">
              <div className="social-account-icon">
                <i className="fa fa-plus" />
              </div>
              <div className="social-account-name">Add New</div>
            </div>
          </div>
        </div>
        <div className="settings-section">
          <div className="section-title">Verified Emails</div>
          <div className="flex-horizontal align-items-center">
            <div className="email-item">joesmith@gmail.com</div>
            <div className="badge badge-pull badge-info">Primary</div>
            <div className="badge badge-pull badge-success">Verified</div>
          </div>
          <div className="flex-horizontal align-items-center mt-1">
            <div className="email-item">joe_smith@gmail.com</div>
            <div className="badge badge-pull badge-light">Unverified</div>
          </div>
        </div>
      </CardContent>
    )
  }
}
