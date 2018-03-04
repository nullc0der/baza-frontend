import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import EditableInputField from 'components/ui/EditableInputField'

import { actions as distributionActions } from 'store/DistributionSignUp'

class ProfileDetails extends Component {
  state = {
    isDropdownVisible: false
  }

  toggleDropdown = () => {
    console.log('toggling')
    this.setState({ isDropdownVisible: !this.state.isDropdownVisible })
  }

  setFullName = e => {
    const fullName = e.target.value
    this.props.setFullName(fullName)
  }

  setEmail = e => {
    const email = e.target.value
    this.props.setEmail(email)
  }

  setPhone = e => {
    const phone = e.target.value
    this.props.setPhone(phone)
  }

  setProfileLink = e => {
    const profileLink = e.target.value
    this.props.setProfileLink(profileLink)
  }

  render() {
    const emailVerifiedText =
      this.props.isEmailVerified && !this.props.emailError
        ? 'Verified'
        : 'Non-Verifiable Email'

    const phoneVerifiedText =
      this.props.isPhoneVerified && !this.props.phoneError
        ? 'Verified'
        : 'Non-Verifiable No.'

    const dropdownClass = classnames('profile-dropdown dropdown', {
      show: this.state.isDropdownVisible
    })
    const dropdownMenuClass = classnames('dropdown-menu dropdown-menu-right', {
      show: this.state.isDropdownVisible
    })

    return (
      <div className="signup-details-section profile-details-section">
        <div className="profile-photo" />
        <div className="profile-details">
          <div className="details-header">
            <EditableInputField
              className="full-name"
              isEditing={this.props.editMode}
              value={this.props.fullName}
              onChange={this.setFullName}
            />
            <div className="profile-id">ID: {this.props.id}</div>
            {!this.props.editMode && (
              <div className={dropdownClass}>
                <div
                  id="profileDropdownMenu"
                  onClick={this.toggleDropdown}
                  className="btn btn-light dropdown-toggle">
                  <i className="fa fa-ellipsis-v" />
                </div>
                <div
                  className={dropdownMenuClass}
                  aria-labelledby="profileDropdownMenu">
                  <div
                    className="dropdown-item"
                    onClick={this.props.showEditMode}>
                    Edit
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={this.props.onRequestRefresh}>
                    Refresh
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="details-body">
            <div className="profile-detail">
              <div className="label">EMAIL</div>
              <div className="value">
                <EditableInputField
                  className="value-text"
                  value={this.props.email}
                  isEditing={this.props.editMode}
                  onChange={this.setEmail}
                />
                <div className="badge badge-pill badge-success">
                  {emailVerifiedText}
                </div>
                {!!this.props.emailError && (
                  <div className="badge badge-pill badge-light">
                    <i className="fa fa-exclamation-triangle text-danger" />
                    {this.props.emailError}
                  </div>
                )}
              </div>
            </div>
            <div className="profile-detail">
              <div className="label">PHONE</div>
              <div className="value">
                <EditableInputField
                  className="value-text"
                  value={this.props.phone}
                  isEditing={this.props.editMode}
                  onChange={this.setPhone}
                />
                <div className="badge badge-pill badge-warning text-white">
                  Mobile
                </div>
                <div className="badge badge-pill badge-danger">
                  {phoneVerifiedText}
                </div>
                {!!this.props.phoneError && (
                  <div className="badge badge-pill badge-light">
                    <i className="fa fa-exclamation-triangle text-danger" />
                    {this.props.phoneError}
                  </div>
                )}
              </div>
            </div>
            <div className="profile-detail">
              <div className="label">PROFILE LINK</div>
              <EditableInputField
                className="value"
                value={this.props.profileLink}
                isEditing={this.props.editMode}
                onChange={this.setProfileLink}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fullName: state.DistributionSignUp.data.fullName,
  id: state.DistributionSignUp.data.id,
  profileLink: state.DistributionSignUp.data.profileLink,

  email: state.DistributionSignUp.data.email.value,
  emailError: state.DistributionSignUp.data.email.error,
  isEmailVerified: state.DistributionSignUp.data.email.isVerified,

  phone: state.DistributionSignUp.data.phone.value,
  phoneError: state.DistributionSignUp.data.phone.error,
  isPhoneVerified: state.DistributionSignUp.data.phone.isVerified
})

const mapDispatchToProps = dispatch => ({
  setEmail(email) {
    return dispatch(distributionActions.setEmail(email))
  },
  setPhone(phone) {
    return dispatch(distributionActions.setPhone(phone))
  },
  setProfileLink(profileLink) {
    return dispatch(distributionActions.setProfileLink(profileLink))
  },
  setFullName(fullName) {
    return dispatch(distributionActions.setFullName(fullName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)
