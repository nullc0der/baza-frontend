import React, { Component } from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import isEmpty from 'lodash/isEmpty'

import {
    getStaffBarData,
    loginOutStaff
} from 'api/distribution-signup-staff-side'

import DistributionSignUpList from './DistributionSignupList'
import DistributionSignUp from './DistributionSignUp'
import StaffBar from './StaffBar'
import s from './DistributionSignUp.scss'

class DistributionSignupsPage extends Component {
    state = {
        isLoggedIn: false,
        staffBarData: {}
    }

    componentDidMount = () => {
        getStaffBarData()
            .then(response => {
                this.setState({
                    staffBarData: response.data
                })
            })
            .catch(() => {})
    }

    toggleLoginLogout = request_type => {
        loginOutStaff(request_type).then(() => {
            this.setState({
                isLoggedIn: request_type === 'login' ? true : false
            })
        })
    }

    render() {
        const cx = classnames(s.container)
        const { isLoggedIn, staffBarData } = this.state
        return (
            <div className={cx}>
                <Helmet title="Distribution Signups" />
                {!isEmpty(staffBarData) && (
                    <div className="row">
                        <div className="col-md-12">
                            <StaffBar
                                isLoggedIn={isLoggedIn}
                                staffBarData={staffBarData}
                                toggleLoginLogout={this.toggleLoginLogout}
                            />
                        </div>
                    </div>
                )}
                {!!isLoggedIn && (
                    <div className="row h-100">
                        <div className="col-md-3">
                            <DistributionSignUpList />
                        </div>
                        <div className="col-md-9">
                            <DistributionSignUp />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default DistributionSignupsPage
