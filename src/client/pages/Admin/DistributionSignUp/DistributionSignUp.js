import React, { Component } from 'react'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import { connect } from 'react-redux'

// import isBoolean from 'lodash/isBoolean'
import MemberProfileCard from './MemberProfile'
import DistributionProfileCard from './DistributionProfile'
import CommentsActivityCard from './CommentsAndActivity'

import s from './DistributionSignUp.scss'

import { actions as distributionSignupStaffSideActions } from 'store/DistributionSignUpStaffSide'
import { actions as commonActions } from 'store/Common'

class DistributionSignUpPage extends Component {
    componentDidMount() {
        if (this.props.selectedID) {
            this.fetchDatas(this.props.selectedID)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedID !== this.props.selectedID) {
            this.fetchDatas(this.props.selectedID)
        }
    }

    fetchDatas(selectedID) {
        if (selectedID) {
            this.props.fetchSignupUserProfileData(selectedID)
            this.props.fetchSignup(selectedID)
        }
    }

    onClickSubmitReassign = (id) => {
        const { signupData, reassignStaff } = this.props
        reassignStaff({
            id,
            signup_id: signupData.id,
        })
    }

    render() {
        const {
            signupData,
            signupUserProfileData,
            staffs,
            markFormViolation,
            addNotification,
            changeSignupStatus,
            getReassignableStaffs,
            toggleOnDistribution,
        } = this.props

        const cx = classnames(s.signupdetails)

        return (
            <div className={cx}>
                <div className="row">
                    <div className="col-md-12">
                        {!isEmpty(signupUserProfileData) && (
                            <MemberProfileCard
                                userProfile={signupUserProfileData}
                            />
                        )}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        {!isEmpty(signupData) && (
                            <DistributionProfileCard
                                staffs={staffs}
                                distributionProfile={signupData}
                                markFormViolation={markFormViolation}
                                addNotification={addNotification}
                                changeSignupStatus={changeSignupStatus}
                                onClickSubmitReassign={
                                    this.onClickSubmitReassign
                                }
                                getReassignableStaffs={getReassignableStaffs}
                                toggleOnDistribution={toggleOnDistribution}
                            />
                        )}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        {!isEmpty(signupData) && <CommentsActivityCard />}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    signupData: state.DistributionSignUpStaffSide.signupData,
    signupUserProfileData:
        state.DistributionSignUpStaffSide.signupUserProfileData,
    selectedID: state.DistributionSignUpStaffSide.selectedID,
    userProfile: state.UserProfile.profile,
    staffs: state.DistributionSignUpStaffSide.staffs,
})

const mapDispatchToProps = (dispatch) => ({
    fetchSignupUserProfileData(id) {
        return dispatch(
            distributionSignupStaffSideActions.fetchSignupUserProfileData(id)
        )
    },
    fetchSignup(id) {
        return dispatch(distributionSignupStaffSideActions.fetchSignup(id))
    },
    markFormViolation(signupID, data) {
        return dispatch(
            distributionSignupStaffSideActions.markFormViolation(signupID, data)
        )
    },
    addNotification(notification) {
        return dispatch(commonActions.addNotification(notification))
    },
    changeSignupStatus(signupID, status) {
        return dispatch(
            distributionSignupStaffSideActions.changeSignupStatus(
                signupID,
                status
            )
        )
    },
    reassignStaff(datas) {
        return dispatch(distributionSignupStaffSideActions.reassignStaff(datas))
    },
    getReassignableStaffs() {
        return dispatch(
            distributionSignupStaffSideActions.getReassignableStaffs()
        )
    },
    toggleOnDistribution(signupID, onDistribution) {
        return dispatch(
            distributionSignupStaffSideActions.toggleOnDistribution(
                signupID,
                onDistribution
            )
        )
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributionSignUpPage)
