import React from 'react'

import Avatar from 'components/Avatar'

const NewSignupNotification = props => {
    const { isActive, notification, onItemClick } = props
    return (
        <div
            className={`nc-list-item flex-horizontal a-center ${
                isActive ? 'active' : ''
            }`}
            onClick={onItemClick}>
            <Avatar
                size={42}
                otherProfile={{
                    username: notification.signupuser.username,
                    profile_photo: notification.signupuser.user_image_url,
                    default_avatar_color:
                        notification.signupuser.user_avatar_color
                }}
                own={false}
            />
            <div className="details">
                <div className="name">
                    {' '}
                    {notification.signupuser.fullname ||
                        notification.signupuser.username}{' '}
                </div>
                <div className="subtext">
                    You have been assigned to review signup of the user
                </div>
            </div>
        </div>
    )
}

export default NewSignupNotification
