import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import classnames from 'classnames'

import { actions as userProfileActions } from 'store/UserProfile'

import s from './AdminHeader.scss'

import HeaderNotifications from 'components/HeaderNotifications'
import HeaderMiniChat from 'components/HeaderMiniChat'
import HeaderProfileButton from './ProfileButton'

class AdminHeader extends Component {
    componentDidMount() {
        // TODO: this is disabled until dashboard page is done
        // this.props
        //     .fetchProfile()
        //     .then(res => {})
        //     .catch(res => {})
    }

    render() {
        const { className } = this.props

        const cx = classnames(
            s.container,
            className,
            'flex-horizontal',
            'a-center'
        )

        return (
            <div className={cx}>
                <div className="menu-toggle" onClick={this.props.onMenuToggle}>
                    <i className="material-icons">menu</i>
                </div>
                <div className="flex-1" />
                <HeaderMiniChat />
                <HeaderNotifications />
                <HeaderProfileButton
                    className={s.profile}
                    user={this.props.profile}
                />
                <div
                    className="settings-toggle"
                    onClick={this.props.onSettingsToggle}>
                    <i className="material-icons">settings</i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchProfile() {
        return dispatch(userProfileActions.fetchProfile())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminHeader)
