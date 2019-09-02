import React from 'react'
import Swipeable from 'react-swipeable'

import Avatar from 'components/Avatar'

const GroupInviteNotification = props => {
    const {
        isActive,
        notification,
        actionButtonsRevealed,
        actionsVisible,
        onSwipeLeft,
        onSwipeRight,
        onRevealActionClick,
        acceptDenyInvite
    } = props
    return (
        <Swipeable
            className={`nc-list-item flex-horizontal a-center ${
                isActive ? 'active' : ''
            }`}
            onSwipedLeft={onSwipeLeft}
            onSwipedRight={onSwipeRight}>
            <Avatar
                size={42}
                otherProfile={{
                    username: notification.sender.username,
                    profile_photo: notification.sender.user_image_url,
                    default_avatar_color: notification.sender.user_avatar_color
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
                    onClick={onRevealActionClick}>
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
                            acceptDenyInvite(
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
                            acceptDenyInvite(
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

export default GroupInviteNotification
