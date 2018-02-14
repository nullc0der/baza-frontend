import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './AdminHeader.scss'

import HeaderNotifications from 'components/HeaderNotifications'
import HeaderMiniChat from 'components/HeaderMiniChat'
import HeaderProfileButton from './ProfileButton'

export default class AdminHeader extends Component {
  render() {
    const { className } = this.props

    const cx = classnames(s.container, className, 'flex-horizontal', 'a-center')

    return (
      <div className={cx}>
        <div className="menu-toggle" onClick={this.props.onMenuToggle}>
          <i className="material-icons">menu</i>
        </div>
        <div className="flex-1" />
        <HeaderMiniChat />
        <HeaderNotifications />
        <HeaderProfileButton className={s.profile} />
        <div className="settings-toggle" onClick={this.props.onSettingsToggle}>
          <i className="material-icons">settings</i>
        </div>
      </div>
    )
  }
}
