import React, { Component } from 'react'

import Swipeable from 'react-swipeable'

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

    renderGroupInvite = notification => {
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
                    size={42}
                    otherProfile={{
                        username: notification.sender.username,
                        profile_photo: notification.sender.user_image_url,
                        default_avatar_color:
                            notification.sender.user_avatar_color
                    }}
                    own={false}
                />
                <div className="details">
                    <div className="name">
                        {' '}
                        {notification.sender.fullname ||
                            notification.sender.username}{' '}
                    </div>
                    <div className="subtext">
                        {' '}
                        Sent a invitation to group {notification.groupname}{' '}
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
                            title="accept"
                            onClick={() =>
                                this.props.acceptDenyInvite(
                                    notification.inviteid,
                                    true,
                                    notification.id
                                )
                            }>
                            check
                        </i>
                        <i
                            className="material-icons button"
                            title="deny"
                            onClick={() =>
                                this.props.acceptDenyInvite(
                                    notification.inviteid,
                                    false,
                                    notification.id
                                )
                            }>
                            clear
                        </i>
                    </div>
                </div>
            </Swipeable>
        )
    }

    render() {
        const { notification } = this.props

        switch (notification.type) {
            case 'groupinvite':
                return this.renderGroupInvite(notification)
            default:
                return null
        }
    }
}

export default NotificationItem
