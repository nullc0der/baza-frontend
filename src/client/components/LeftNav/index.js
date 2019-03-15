import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import startsWith from 'lodash/startsWith'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'

import s from './LeftNav.scss'

import MENU_ITEMS from './menu-items'
import SidebarMenu from './SidebarMenu'

import { actions as commonActions } from 'store/Common'
import { actions as userProfileActions } from 'store/UserProfile'
import { actions as groupActions } from 'store/Group'

import Avatar from 'components/Avatar'

import { getUsername } from 'utils/common'

class LeftNav extends Component {
    state = {
        searchTerm: '',
        menuItems: []
    }

    componentDidMount = () => {
        this.setMenuItems()
        this.props.fetchSiteOwnerGroup()
        window.addEventListener(
            'blur',
            () => this.props.setUserStatus('idle'),
            false
        )
        window.addEventListener(
            'focus',
            () => this.props.setUserStatus('online'),
            false
        )
    }

    componentWillUnmount = () => {
        window.removeEventListener(
            'blur',
            () => this.props.setUserStatus('online'),
            false
        )
        window.removeEventListener(
            'focus',
            () => this.props.setUserStatus('online'),
            false
        )
    }

    componentDidUpdate = prevProps => {
        if (
            prevProps.lastSelectedGroup !== this.props.lastSelectedGroup ||
            prevProps.groups !== this.props.groups ||
            prevProps.siteOwnerGroup !== this.props.siteOwnerGroup
        ) {
            this.setMenuItems()
        }
    }

    toggleIfThin = () => {
        var w = $(window).width()
        if (!this.props.open || w < 769) return
        console.log('should toggle the nav')
        this.props.onRequestToggle()
    }

    getGroupMenu = (permissions, id) => {
        let menu = {
            name: 'Groups',
            icon: 'fa fa-fw fa-cube',
            href: '',
            children: []
        }
        if (permissions.indexOf(102) !== -1) {
            menu = {
                ...menu,
                children: [
                    ...menu.children,
                    {
                        name: 'Posts',
                        href: `/community/2/groups/${id}/posts`,
                        icon: 'fa fa-fw fa-life-ring'
                    },
                    {
                        name: 'Members',
                        href: `/community/2/groups/${id}/members`,
                        icon: 'fa fa-fw fa-users'
                    }
                ]
            }
        }
        if (
            permissions.indexOf(103) !== -1 ||
            permissions.indexOf(104) !== -1
        ) {
            menu = {
                ...menu,
                children: [
                    ...menu.children,
                    {
                        name: 'Group Profile',
                        href: `/community/2/groups/${id}/profile`,
                        icon: 'fa fa-fw fa-cog'
                    }
                ]
            }
        }
        if (menu.children.length === 0) {
            menu = {}
        }
        return menu
    }

    getSiteOwnerGroupMenu = data => {
        let menu = {
            name: 'Baza',
            icon_type: 'image',
            icon: '/public/img/baza_logo_gs.svg',
            href: '',
            children: [
                {
                    name: 'Coin Sale',
                    href: '/coinsale',
                    icon: 'fa fa-fw fa-tag'
                }
            ]
        }
        if (data) {
            const permissions = data.user_permission_set
            const id = data.id
            if (permissions.indexOf(102) !== -1) {
                menu = {
                    ...menu,
                    children: [
                        ...menu.children,
                        {
                            name: 'Groups',
                            href: '/community/2/groups',
                            icon: 'fa fa-fw fa-cubes'
                        },
                        {
                            name: 'Posts',
                            href: `/community/2/groups/${id}/posts`,
                            icon: 'fa fa-fw fa-life-ring'
                        },
                        {
                            name: 'Members',
                            href: '/community/2/members',
                            icon: 'fa fa-fw fa-users'
                        }
                    ]
                }
            }
            if (
                permissions.some(el => [103, 104, 105, 106].indexOf(el) !== -1)
            ) {
                menu = {
                    ...menu,
                    children: [
                        ...menu.children,
                        {
                            name: 'Member Management',
                            href: `/community/2/groups/${id}/members`,
                            icon: 'fa fa-fw fa-users'
                        }
                    ]
                }
            }
            if (permissions.indexOf(106) !== -1) {
                menu = {
                    ...menu,
                    children: [
                        ...menu.children,
                        {
                            name: 'Distribution Signups',
                            href: '/distribution-signup',
                            icon: 'fa fa-fw fa-list'
                        }
                    ]
                }
            }
            if (
                permissions.indexOf(103) !== -1 ||
                permissions.indexOf(104) !== -1
            ) {
                menu = {
                    ...menu,
                    children: [
                        ...menu.children,
                        {
                            name: 'Group Profile',
                            href: `/community/2/groups/${id}/profile`,
                            icon: 'fa fa-fw fa-cog'
                        }
                    ]
                }
            }
        } else {
            menu = {}
        }
        return menu
    }

    setMenuItems = () => {
        let menuItems = MENU_ITEMS
        if (!isEmpty(this.props.siteOwnerGroup)) {
            menuItems = [
                ...menuItems,
                this.getSiteOwnerGroupMenu(this.props.siteOwnerGroup)
            ]
        }
        if (this.props.lastSelectedGroup) {
            const group = this.props.groups.filter(
                x => x.id === this.props.lastSelectedGroup
            )
            if (group.length) {
                menuItems = [
                    ...menuItems,
                    this.getGroupMenu(group[0].user_permission_set, group[0].id)
                ]
            } else {
                this.props.fetchGroup(this.props.lastSelectedGroup)
            }
        }
        this.setState({
            menuItems
        })
    }

    setSearchedMenuItems = searchTerm => {
        if (searchTerm.length) {
            let menuItems = {
                name: 'Search',
                icon: 'fa fa-fw fa-search',
                href: '/admin/',
                children: []
            }
            for (const menuItem of this.state.menuItems) {
                const matches = menuItem.children.filter(x =>
                    startsWith(x.name.toLowerCase(), searchTerm)
                )
                menuItems = {
                    ...menuItems,
                    children: [...menuItems.children, ...matches]
                }
            }
            if (menuItems.children.length) {
                this.setState({
                    selectedItemIndex: 0,
                    menuItems: [menuItems]
                })
            }
        } else {
            this.setMenuItems()
        }
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
                            <div className="name"> {getUsername(profile)} </div>
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
                                                className={`dropdown-item text-capitalize is-${item}`}
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
                                this.setSearchedMenuItems(e.target.value)
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
                    menuItems={this.state.menuItems}
                    onRequestToggle={this.props.onRequestToggle}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    breadcrumbs: state.Common.breadcrumbs,
    profile: state.UserProfile.profile,
    userStatus: state.UserProfile.userStatus,
    lastSelectedGroup: state.Group.lastSelectedGroup,
    groups: state.Group.groups,
    siteOwnerGroup: state.Group.siteOwnerGroup
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
    },
    fetchGroup(groupID) {
        return dispatch(groupActions.fetchGroup(groupID))
    },
    fetchSiteOwnerGroup() {
        return dispatch(groupActions.fetchSiteOwnerGroup())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftNav)
