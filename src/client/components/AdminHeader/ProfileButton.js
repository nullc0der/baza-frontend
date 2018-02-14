import React, { Component } from 'react'
import classnames from 'classnames'

import Dropdown from 'components/ui/Dropdown'

const SAMPLE_USER = [
  {
    image: '',
    username: 'sharad_kant',
    created_at_text: 'Member since 30 days ago'
  }
]

export default class HeaderProfileButton extends Component {
  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentDidMount = () => {
    // $(document).on('blur' , '.header-profile-button', this.onBlur)
  }
  componentWillUnmount = () => {
    // $(document).off('blur', '.header-profile-button', this.onBlur)
  }

  onBlur = e => {
    console.log('blurred')
  }

  renderProfile = user => {
    return (
      <div className="profile-menu">
        <div className="flex-vertical a-center j-center blue-container">
          <div className="profile-icon big rounded no-overflow black-bg">
            <img className="img-responsive" src={user.image} />
          </div>
          <div className="text-center"> {user.created_at_text} </div>
        </div>
        <div className="flex-horizontal user-menu j-between">
          <a className="profile-link" href="#">
            References
          </a>
          <a className="profile-link" href="#">
            Account
          </a>
          <a className="profile-link" href="#">
            Landing
          </a>
        </div>
        <div className="profile-menu-footer flex-horizontal j-between">
          <a className="btn footer-btn" href="#">
            {' '}
            Profile{' '}
          </a>
          <a className="btn footer-btn" href="#">
            {' '}
            Sign Out{' '}
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { className, user = SAMPLE_USER } = this.props

    const cx = classnames('header-profile-button', className)
    const menuClass = classnames('profile-menu', {
      'is-open': this.state.isOpen
    })

    const label = (
      <div className="profile-button flex-horizontal a-center">
        <div className="profile-icon rounded no-overflow black-bg">
          <img className="img-responsive" src={user[0].image} />
        </div>
        <div className="profile-username"> {user[0].username} </div>
      </div>
    )

    return (
      <Dropdown
        id="id-header-profile-dropdown"
        className={cx}
        label={label}
        items={SAMPLE_USER}
        itemRenderer={this.renderProfile}
      />
    )
  }
}