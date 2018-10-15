import React, { Component } from 'react'
import get from 'lodash/get'

import Avatar from 'components/Avatar'

export default class MemberTile extends Component {
    handleHover = (e, entered) => {
        const element = e.target
        if (element.offsetWidth < element.scrollWidth) {
            $(element)
                .find('.username')
                .toggleClass('long')
        }
    }

    render() {
        const { userName, avatarUrl, avatarColor, onlineStatus } = this.props

        return (
            <div
                className={`member-tile is-${get(
                    onlineStatus,
                    'status',
                    'offline'
                )}`}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}>
                <div className="member-image">
                    <Avatar
                        className="avatar-image"
                        size={82}
                        otherProfile={{
                            username: userName,
                            profile_photo: avatarUrl,
                            default_avatar_color: avatarColor
                        }}
                        own={false}
                    />
                </div>
                <div className="member-info">
                    <p className="username">{userName}</p>
                    <p className="status">Member</p>
                </div>
            </div>
        )
    }
}
