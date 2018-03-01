import React, { Component } from 'react'

const AccountDetail = ({ label, children }) => (
  <div className="account-detail">
    <div className="label">{label}</div>
    <div className="value">{children}</div>
  </div>
)

export default class AccountDetails extends Component {
  render() {
    return (
      <div className="signup-details-section account-details-section">
        <AccountDetail label="STATUS">
          <div className="text-success font-weight-semibold">APPROVED</div>
        </AccountDetail>

        <AccountDetail label="SIGNUP DATE">2016-12-19</AccountDetail>
        <AccountDetail label="VERIFIED DATE">2016-12-10</AccountDetail>
        <AccountDetail label="REFERRAL CODE">5kbvnh</AccountDetail>

        <AccountDetail label="WALLET ADD." />
        <AccountDetail label="ON DISTRIBUTION">FALSE</AccountDetail>
      </div>
    )
  }
}
