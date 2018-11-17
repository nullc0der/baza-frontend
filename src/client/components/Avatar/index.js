import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'

import Config from 'utils/config'

import s from './Avatar.scss'

class Avatar extends Component {
    render() {
        const { className, size = 24, own = true, otherProfile } = this.props
        const userProfile = own ? this.props.userProfile : otherProfile
        const userName =
            get(userProfile, 'username', '') ||
            get(userProfile.user, 'username', '')
        const cx = classnames(s.container, 'ui-avatar', className, {
            'img-fluid': userProfile.profile_photo
        })

        const imageSrc = Config.get('DOCUMENT_ROOT') + userProfile.profile_photo

        return userProfile.profile_photo ? (
            <img
                className={cx}
                src={imageSrc}
                alt="profile"
                style={{
                    width: size + 'px',
                    height: size + 'px'
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
