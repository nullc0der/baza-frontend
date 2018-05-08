import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import s from './LeftNav.scss'

import SidebarMenu from './SidebarMenu'

import { actions as commonActions } from 'store/Common'

class LeftNav extends Component {
  toggleIfThin = () => {
    var w = $(window).width()
    if (!this.props.open || w < 769) return
    console.log('should toggle the nav')
    this.props.onRequestToggle()
  }

  render() {
    const { className, open = false } = this.props

    const cx = classnames(s.container, className, 'flex-vertical', {
      'is-open': open
    })

    return (
      <div className={cx}>
        <div
          className="leftnav-backdrop"
          onClick={this.props.onRequestToggle}
        />
        <div className="sidebar-header flex-horizontal a-center j-center">
          BAZA
        </div>
        <div className="sidebar-sub-header">
          <div className="user-block flex-horizontal">
            <div className="user-image" />
            <div className="user-details flex-1">
              <div className="name"> Mark Witham </div>
              <div className="status is-online"> Online </div>
            </div>
          </div>
          <div className="menu-search" onClick={this.toggleIfThin}>
            <input
              className="search-input no-outline"
              placeholder="Search..."
            />
            <span className="search-icon">
              <i className="material-icons">search</i>
            </span>
          </div>
        </div>
        <SidebarMenu
          navigateTo={this.props.navigateTo}
          className="sidebar-menu"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  breadcrumbs: state.Common.breadcrumbs
})

const mapDispatchToProps = dispatch => ({
  setBreadCrumbs(b) {
    return dispatch(commonActions.setBreadCrumbs(b))
  },
  navigateTo(url) {
    return dispatch(push(url))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
