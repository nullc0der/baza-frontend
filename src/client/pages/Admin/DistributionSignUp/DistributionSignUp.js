import React, { Component } from 'react'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import { connect } from 'react-redux'

// import isBoolean from 'lodash/isBoolean'
import MemberProfileCard from './MemberProfile'
import DistributionProfileCard from './DistributionProfile'
import SignupCommentCard from './SignupComment'

import s from './DistributionSignUp.scss'

import { actions as distributionSignupStaffSideActions } from 'store/DistributionSignUpStaffSide'

class DistributionSignUpPage extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedID !== this.props.selectedID) {
            this.props.fetchSignupUserProfileData(this.props.selectedID)
            this.props.fetchSignup(this.props.selectedID)
            this.props.fetchSignupComments(this.props.selectedID)
        }
    }

    onBackButtonClick = () => {
        $('.' + s.signupdetails).removeClass('is-open')
    }

    render() {
        const {
            signupData,
            signupUserProfileData,
            signupComments,
            createSignupComment,
            userProfile,
            updateSignupComment,
            deleteSignupComment,
            markFormViolation
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
                                distributionProfile={signupData}
                                markFormViolation={markFormViolation}
                            />
                        )}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        {!isEmpty(signupData) && (
                            <SignupCommentCard
                                signupID={signupData.id}
                                signupComments={signupComments}
                                createSignupComment={createSignupComment}
                                userProfileID={userProfile.user.id}
                                updateSignupComment={updateSignupComment}
                                deleteSignupComment={deleteSignupComment}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    signupData: state.DistributionSignUpStaffSide.signupData,
    signupUserProfileData:
        state.DistributionSignUpStaffSide.signupUserProfileData,
    signupComments: state.DistributionSignUpStaffSide.signupComments,
    selectedID: state.DistributionSignUpStaffSide.selectedID,
    userProfile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchSignupUserProfileData(id) {
        return dispatch(
            distributionSignupStaffSideActions.fetchSignupUserProfileData(id)
        )
    },
    fetchSignup(id) {
        return dispatch(distributionSignupStaffSideActions.fetchSignup(id))
    },
    fetchSignupComments(id) {
        return dispatch(
            distributionSignupStaffSideActions.fetchSignupComments(id)
        )
    },
    createSignupComment(signupID, data) {
        return dispatch(
            distributionSignupStaffSideActions.createSignupComment(
                signupID,
                data
            )
        )
    },
    updateSignupComment(signupID, data) {
        return dispatch(
            distributionSignupStaffSideActions.updateSignupComment(
                signupID,
                data
            )
        )
    },
    deleteSignupComment(signupID, commentID) {
        return dispatch(
            distributionSignupStaffSideActions.deleteSignupComment(
                signupID,
                commentID
            )
        )
    },
    markFormViolation: (signupID, data) =>
        dispatch(
            distributionSignupStaffSideActions.markFormViolation(signupID, data)
        )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributionSignUpPage)
