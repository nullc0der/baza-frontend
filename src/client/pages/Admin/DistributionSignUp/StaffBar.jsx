import React, { Component } from 'react'
import classnames from 'classnames'

import Avatar from 'components/Avatar'

import s from './DistributionSignUp.scss'

class StaffBar extends Component {
    render() {
        const {
            className,
            isLoggedIn,
            staffBarData,
            toggleLoginLogout
        } = this.props
        const cx = classnames(
            s.staffbar,
            className,
            'flex-horizontal',
            'staff-bar',
            'mb-2',
            'align-items-center'
        )
        return (
            <div className={cx}>
                <div className="staff-info">
                    <Avatar className="avatar-image" size={35} own={true} />
                    <span className="fullname">
                        {staffBarData.staff.fullname}
                    </span>
                </div>
                <div className="inbox">
                    <i className="fas fa-inbox fa-2x" />
                    <span className="badge badge-pill badge-danger count">
                        {staffBarData.pending_application_count}
                    </span>
                </div>
                <div className="flex-1"></div>
                <div
                    className="sign-in-out-button"
                    onClick={() =>
                        toggleLoginLogout(isLoggedIn ? 'logout' : 'login')
                    }>
                    <i
                        className={`fas ${
                            isLoggedIn ? 'fa-sign-out-alt' : 'fa-sign-in-alt'
                        } fa-2x`}
                    />
                </div>
            </div>
        )
    }
}

export default StaffBar
