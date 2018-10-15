import React, { Component } from 'react'
import get from 'lodash/get'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import s from './LeftNav.scss'

import SidebarMenu from './SidebarMenu'

import { actions as commonActions } from 'store/Common'
import { actions as userProfileActions } from 'store/UserProfile'

import Avatar from 'components/Avatar'

class LeftNav extends Component {
    state = {
        searchTerm: ''
    }

    toggleIfThin = () => {
        var w = $(window).width()
        if (!this.props.open || w < 769) return
        console.log('should toggle the nav')
        this.props.onRequestToggle()
    }

    render() {
        const {
            className,
            profile,
            open = false,
            userStatus,
            setUserStatus
        } = this.props

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
                    <Link to="/">BAZA</Link>
                </div>
                <div className="sidebar-sub-header">
                    <div className="user-block flex-horizontal">
                        <Avatar size={48} />
                        <div className="user-details flex-1">
                            <div className="name">
                                {' '}
                                {get(profile, 'username', '') ||
                                    get(profile.user, 'username', '')}{' '}
                            </div>
                            <div className="status-dropdown-group btn-group">
                                <a
                                    className={`text-capitalize status is-${userStatus}`}
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {userStatus}
                                    <i
                                        className="fa fa-caret-down"
                                        style={{ marginLeft: '5px' }}
                                    />
                                </a>
                                <div className="dropdown-menu">
                                    {['online', 'away', 'busy'].map(
                                        (item, i) => (
                                            <div
                                                key={i}
                                                className="dropdown-item"
                                                onClick={() =>
                                                    setUserStatus(item)
                                                }>
                                                {item}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-search" onClick={this.toggleIfThin}>
                        <input
                            className="search-input no-outline"
                            placeholder="Search..."
                            onChange={e =>
                                this.setState({ searchTerm: e.target.value })
                            }
                        />
                        <span className="search-icon">
                            <i className="material-icons">search</i>
                        </span>
                    </div>
                </div>
                <SidebarMenu
                    navigateTo={this.props.navigateTo}
                    className="sidebar-menu"
                    searchTerm={this.state.searchTerm}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    breadcrumbs: state.Common.breadcrumbs,
    profile: state.UserProfile.profile,
    userStatus: state.UserProfile.userStatus
})

const mapDispatchToProps = dispatch => ({
    setBreadCrumbs(b) {
        return dispatch(commonActions.setBreadCrumbs(b))
    },
    navigateTo(url) {
        return dispatch(push(url))
    },
    setUserStatus(status) {
        return dispatch(userProfileActions.setUserStatus(status))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftNav)
