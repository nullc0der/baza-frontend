import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import Config from 'utils/config'

import s from './Avatar.scss'

import { getUsername } from 'utils/common'

class Avatar extends Component {
    render() {
        const { className, size = 24, own = true, otherProfile } = this.props
        const userProfile = own ? this.props.userProfile || {} : otherProfile
        const userProfilePhoto = userProfile.hasOwnProperty('profile_photo')
            ? userProfile.profile_photo
            : null
        const userName = getUsername(userProfile)
        const cx = classnames(s.container, 'ui-avatar', className, {
            'img-fluid': userProfilePhoto
        })

        const imageSrc = Config.get('DOCUMENT_ROOT') + userProfilePhoto

        return userProfilePhoto ? (
            <img
                className={cx}
                src={imageSrc}
                alt="profile"
                style={{
                    width: size + 'px',
                    height: size + 'px',
                    objectFit: 'cover',
                    objectPosition: 'center center'
                }}
            />
        ) : (
            <div
                className={cx}
                style={{
                    width: size + 'px',
                    height: size + 'px',
                    fontSize: size / 12 + 'px',
                    backgroundColor: userProfile.default_avatar_color
                }}>
                <div className="avatar-name">
                    {' '}
                    {userName && userName[0].toUpperCase()}{' '}
                </div>
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
