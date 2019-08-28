import React, { Component } from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
    getStaffBarData,
    loginOutStaff
} from 'api/distribution-signup-staff-side'

import { isStaff } from 'pages/Admin/Group/utils'
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
        const { siteOwnerGroup } = this.props
        const { isLoggedIn, staffBarData } = this.state
        const userOnMobile = $(window).width() < 767
        const { goBack } = this.props.history

        return !userOnMobile ? (
            !isEmpty(siteOwnerGroup) &&
                (isStaff(siteOwnerGroup.user_permission_set) ? (
                    <div className={cx}>
                        <Helmet title="Distribution Signups" />
                        {!isEmpty(staffBarData) && (
                            <div className="row">
                                <div className="col-md-12">
                                    <StaffBar
                                        isLoggedIn={isLoggedIn}
                                        staffBarData={staffBarData}
                                        toggleLoginLogout={
                                            this.toggleLoginLogout
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {!!isLoggedIn && (
                            <div className="row h-100">
                                <div className="col-md-4 col-xl-3">
                                    <DistributionSignUpList />
                                </div>
                                <div className="col-md-8 col-xl-9">
                                    <DistributionSignUp />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Redirect to="/403" />
                ))
        ) : (
            <div className="d-flex flex-1 align-items-center justify-content-center">
                <div className="text-black-50 text-center">
                    <p>
                        This page is available on desktop and tablet devices
                        only
                    </p>
                    <button className="btn btn-sm btn-dark" onClick={goBack}>
                        TAKE ME BACK
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    siteOwnerGroup: state.Group.siteOwnerGroup
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributionSignupsPage)
