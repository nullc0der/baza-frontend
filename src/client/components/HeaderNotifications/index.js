import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { groupInviteActions } from 'api/group'

import { actions as notificationsActions } from 'store/Notifications'
import { actions as commonActions } from 'store/Common'

import c from './HeaderNotifications.scss'

import Dropdown from 'components/ui/Dropdown'
import NotificationItem from './NotificationItem'

class HeaderNotifications extends Component {
    state = {
        isOpen: false,
        activeNode: null
    }

    componentDidMount = () => {
        this.props
            .fetchNotifications()
            .then(res => {})
            .catch(res => {})
    }

    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    setActiveNode = id => {
        this.setState({
            activeNode: id
        })
    }

    acceptDenyInvite = (inviteID, accepted, notificationID) => {
        groupInviteActions({ invite_id: inviteID, accepted: accepted }).then(
            res => {
                this.props.removeNotification(notificationID)
                this.props.showNotification({
                    message: res.data.message,
                    level: 'success'
                })
            }
        )
    }

    renderOneNotication = (x, i) => {
        return (
            <NotificationItem
                key={i}
                notification={x}
                isActive={this.state.activeNode === x.id}
                setActiveNode={this.setActiveNode}
                acceptDenyInvite={this.acceptDenyInvite}
                navigateTo={this.props.navigateTo}
            />
        )
    }

    onClickMarkAllRead = () => {
        const { setReadStatus, notifications } = this.props
        const unreadIDs = []
        for (const notification of notifications) {
            if (!notification.read) {
                unreadIDs.push(notification.id)
            }
        }
        setReadStatus(unreadIDs)
            .then(() => {})
            .catch(() => {})
    }

    render() {
        const { className, notifications } = this.props
        const cx = classnames(c.container, className)

        const label = (
            <span className="flex-horizontal a-center notification-label">
                <i className="fa fa-fw fa-bell-o" />
                {!!notifications.length && <i className="has-notification" />}
            </span>
        )

        const dropdownFooter = (
            <div
                className="flex-1 text-center mark-read-btn"
                onClick={this.onClickMarkAllRead}>
                Mark all as Read
            </div>
        )

        return (
            <Dropdown
                id="id-header-mini-notifications"
                className={cx}
                label={label}
                items={notifications}
                dropdownFooter={dropdownFooter}
                itemRenderer={this.renderOneNotication}
            />
        )
    }
}

const mapStateToProps = state => ({
    notifications: state.Notifications.notifications
})

const mapDispatchToProps = dispatch => ({
    fetchNotifications: () =>
        dispatch(notificationsActions.fetchNotifications()),
    removeNotification: id =>
        dispatch(notificationsActions.removeNotification(id)),
    setReadStatus: idList =>
        dispatch(notificationsActions.setReadStatus(idList)),
    showNotification: notification =>
        dispatch(commonActions.addNotification(notification)),
    navigateTo: url => dispatch(push(url))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderNotifications)
