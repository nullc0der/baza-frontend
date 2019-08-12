import React, { Component } from 'react'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import { connect } from 'react-redux'

// import isBoolean from 'lodash/isBoolean'
import MemberProfileCard from './MemberProfile'
import DistributionProfileCard from './DistributionProfile'

import s from './DistributionSignUp.scss'

import { actions as distributionSignupStaffSideActions } from 'store/DistributionSignUpStaffSide'

class DistributionSignUpPage extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedID !== this.props.selectedID) {
            this.props.fetchSignupUserProfileData(this.props.selectedID)
            this.props.fetchSignup(this.props.selectedID)
        }
    }

    onBackButtonClick = () => {
        $('.' + s.signupdetails).removeClass('is-open')
    }

    render() {
        const { signupData, signupUserProfileData } = this.props

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
    selectedID: state.DistributionSignUpStaffSide.selectedID
})

const mapDispatchToProps = dispatch => ({
    fetchSignupUserProfileData(id) {
        return dispatch(
            distributionSignupStaffSideActions.fetchSignupUserProfileData(id)
        )
    },
    fetchSignup(id) {
        return dispatch(distributionSignupStaffSideActions.fetchSignup(id))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributionSignUpPage)
