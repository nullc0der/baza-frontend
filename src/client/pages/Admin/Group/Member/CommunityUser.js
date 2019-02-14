import React, { Component } from 'react'
import classnames from 'classnames'
import Avatar from 'components/Avatar'

class MemberItem extends Component {
    render() {
        const {
            className,
            inviteUser,
            userId,
            userName = '',
            fullName = '',
            avatarUrl = '',
            avatarColor = '',
            isInvited = false
        } = this.props

        const cx = classnames(
            className,
            'ui-member-item',
            'flex-horizontal j-between'
        )

        return (
            <div className={cx}>
                <div className="flex-horizontal a-center flex-1">
                    <div className="in-left flex-horizontal a-center">
                        <Avatar
                            className="avatar-image"
                            own={false}
                            otherProfile={{
                                username: userName,
                                profile_photo: avatarUrl,
                                default_avatar_color: avatarColor
                            }}
                        />
                        <div className="details">
                            <div className="name">
                                {' '}
                                {fullName || userName}{' '}
                                <span className="username">@{userName}</span>{' '}
                            </div>
                        </div>
                    </div>
                    <div className="in-right flex-horizontal flex-1">
                        <div className="subscribed-groups flex-horizontal-reverse a-center">
                            <i
                                className={`fa fa-user-plus invitebtn ${isInvited &&
                                    'invited'}`}
                                onClick={() => inviteUser(userId)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemberItem
