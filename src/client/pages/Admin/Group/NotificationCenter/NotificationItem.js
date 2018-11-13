import React, { Component } from 'react'

import Linkify from 'react-linkify'
import Swipeable from 'react-swipeable'
import { Scrollbars } from 'react-custom-scrollbars'

import Avatar from 'components/Avatar'

class NotificationItem extends Component {
    state = {
        actionButtonsRevealed: false,
        actionsVisible: false
    }

    onRevealActionClick = e => {
        this.setState(prevState => ({
            actionButtonsRevealed: !prevState.actionButtonsRevealed,
            actionsVisible: false
        }))
    }

    onSwipeLeft = e => {
        this.setState(
            {
                actionButtonsRevealed: true,
                actionsVisible: true
            },
            () => this.props.setActiveNode(this.props.notification.id)
        )
    }

    onSwipeRight = e => {
        this.setState({
            actionButtonsRevealed: false,
            actionsVisible: false
        })
    }

    renderGroupNotification = notification => {
        const { isActive } = this.props

        const { actionButtonsRevealed, actionsVisible } = this.state
        return (
            <Swipeable
                className={`nc-list-item flex-horizontal a-center ${
                    isActive ? 'active' : ''
                }`}
                onSwipedLeft={this.onSwipeLeft}
                onSwipedRight={this.onSwipeRight}>
                <div className="details">
                    <Scrollbars
                        autoHide
                        style={{ height: 25, marginBottom: 5 }}>
                        <div className="name">
                            <Linkify>{notification.notification}</Linkify>
                        </div>
                    </Scrollbars>
                    <div className="subtext">
                        {new Date(notification.created_on).toLocaleString()}
                    </div>
                </div>
                <div className={`actions ${actionsVisible ? 'visible' : ''}`}>
                    <div
                        className="reveal-action-icon"
                        onClick={this.onRevealActionClick}>
                        <i
                            className={`fa fa-arrow-left ${
                                actionButtonsRevealed ? 'reverse' : 'normal'
                            }`}
                        />
                    </div>
                    <div
                        className={`buttons-container ${
                            actionButtonsRevealed ? 'shown' : ''
                        }`}>
                        <i
                            className="material-icons button"
                            title="mark as read"
                            onClick={() =>
                                this.props.setNotificationRead(
                                    notification.notification_id
                                )
                            }>
                            check
                        </i>
                    </div>
                </div>
            </Swipeable>
        )
    }

    renderJoinRequest = notification => {
        const { isActive } = this.props

        const { actionButtonsRevealed, actionsVisible } = this.state
        return (
            <Swipeable
                className={`nc-list-item flex-horizontal a-center ${
                    isActive ? 'active' : ''
                }`}
                onSwipedLeft={this.onSwipeLeft}
                onSwipedRight={this.onSwipeRight}>
                <Avatar
                    size={36}
                    otherProfile={{
                        username: notification.user.username,
                        profile_photo: notification.user.user_image_url,
                        default_avatar_color:
                            notification.user.user_avatar_color
                    }}
                    own={false}
                />
                <div className="details">
                    <div className="name">
                        {' '}
                        {notification.user.fullname ||
                            notification.user.username}{' '}
                    </div>
                    <div className="subtext"> Sent a request to join </div>
                </div>
                <div className={`actions ${actionsVisible ? 'visible' : ''}`}>
                    <div
                        className="reveal-action-icon"
                        onClick={this.onRevealActionClick}>
                        <i
                            className={`fa fa-arrow-left ${
                                actionButtonsRevealed ? 'reverse' : 'normal'
                            }`}
                        />
                    </div>
                    <div
                        className={`buttons-container ${
                            actionButtonsRevealed ? 'shown' : ''
                        }`}>
                        <i
                            className="material-icons button"
                            title="accept"
                            onClick={() =>
                                this.props.acceptDenyJoinRequest(
                                    notification.notification_id,
                                    notification.joinrequest_id,
                                    true
                                )
                            }>
                            group_add
                        </i>
                        <i
                            className="material-icons button"
                            title="deny"
                            onClick={() =>
                                this.props.acceptDenyJoinRequest(
                                    notification.notification_id,
                                    notification.joinrequest_id,
                                    false
                                )
                            }>
                            clear
                        </i>
                    </div>
                </div>
            </Swipeable>
        )
    }

    renderInviteAccept = notification => {
        const { isActive } = this.props

        const { actionButtonsRevealed, actionsVisible } = this.state
        return (
            <Swipeable
                className={`nc-list-item flex-horizontal a-center ${
                    isActive ? 'active' : ''
                }`}
                onSwipedLeft={this.onSwipeLeft}
                onSwipedRight={this.onSwipeRight}>
                <Avatar
                    size={36}
                    otherProfile={{
                        username: notification.member.username,
                        profile_photo: notification.member.user_image_url,
                        default_avatar_color:
                            notification.member.user_avatar_color
                    }}
                    own={false}
                />
                <div className="details">
                    <div className="name">
                        {' '}
                        {notification.member.fullname ||
                            notification.member.username}{' '}
                    </div>
                    <div className="subtext">
                        {' '}
                        Was added by {notification.sender.username}
                    </div>
                </div>
                <div className={`actions ${actionsVisible ? 'visible' : ''}`}>
                    <div
                        className="reveal-action-icon"
                        onClick={this.onRevealActionClick}>
                        <i
                            className={`fa fa-arrow-left ${
                                actionButtonsRevealed ? 'reverse' : 'normal'
                            }`}
                        />
                    </div>
                    <div
                        className={`buttons-container ${
                            actionButtonsRevealed ? 'shown' : ''
                        }`}>
                        <i
                            className="material-icons button"
                            title="mark as read"
                            onClick={() =>
                                this.props.setNotificationRead(
                                    notification.notification_id
                                )
                            }>
                            check
                        </i>
                    </div>
                </div>
            </Swipeable>
        )
    }

    render() {
        const { notification } = this.props

        switch (notification.type) {
            case 'groupnotification':
                return this.renderGroupNotification(notification)
            case 'joinrequest':
                return this.renderJoinRequest(notification)
            case 'inviteaccept':
                return this.renderInviteAccept(notification)
            default:
                return null
        }
    }
}

export default NotificationItem
