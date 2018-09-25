import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'

import s from './Avatar.scss'

class Avatar extends Component {
    render() {
        const { className, size = 24, userProfile } = this.props
        const userName = get(userProfile.user, 'username', '')
        const cx = classnames(s.container, 'ui-avatar', className)
        return userProfile.profile_photo ? (
            <img
                className={cx}
                src={
                    process.env.NODE_ENV === 'development'
                        ? 'http://localhost:8000' + userProfile.profile_photo
                        : userProfile.profile_photo
                }
                alt="profile"
                style={{
                    width: size + 'px',
                    height: size + 'px',
                    objectFit: 'contain'
                }}
            />
        ) : (
            <div
                className={cx}
                style={{
                    width: size + 'px',
                    height: size + 'px',
                    backgroundColor: userProfile.default_avatar_color
                }}>
                <div className="avatar-name"> {userName[0]} </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userProfile: state.UserProfile.profile
})

const mapDispathToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Avatar)
