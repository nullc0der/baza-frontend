import React, { Component } from 'react'
import classnames from 'classnames'
import Avatar from 'components/Avatar'

class ChatSidebarItem extends Component {
    render() {
        const {
            selected = false,
            username = '',
            numUnread = '',
            image = false,
            avatarColor = '',
            onlineStatus
        } = this.props

        const cx = classnames('chat-sidebar-item', {
            'is-active': selected,
            'has-unread': numUnread > 0
        })

        return (
            <div className={cx} onClick={this.props.onClick}>
                <div className="item-image rounded">
                    <Avatar
                        size={42}
                        otherProfile={{
                            username: username,
                            profile_photo: image,
                            default_avatar_color: avatarColor
                        }}
                        own={false}
                    />
                </div>
                <div className="item-details">
                    <div className="item-username"> {username} </div>
                    <div className="item-status flex-horizontal a-center">
                        <div
                            className={`flex-1 online-status is-${
                                onlineStatus.status
                            } text-capitalize`}>
                            {' '}
                            {onlineStatus.status || 'offline'}{' '}
                        </div>
                        {!!numUnread && (
                            <div className="unread-count">
                                {numUnread} Unread
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatSidebarItem
