import React, { Component } from 'react'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import { connect } from 'react-redux'

// import isBoolean from 'lodash/isBoolean'
import MemberProfileCard from './MemberProfile'

import s from './DistributionSignUp.scss'

// import ProfileDetails from './ProfileDetails'
// import ProfilePhotos from './ProfilePhotos'
// // import ProfileDocuments from './ProfileDocuments'
// import DatabaseInformation from './DatabaseInformation'
// import AccountDetails from './AccountDetails'
// // import EditModeBar from './EditModeBar'
// import DistributionSignUpHeader from './DistributionSignupHeader'

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

    // toggleEditMode = force => {
    //     this.props.toggleEditMode(force)
    // }

    // onSaveEdits = () => {
    //     // save the store
    //     console.log('will save edits now')
    //     this.props.saveAccount().then(this.props.toggleEditMode)
    // }

    // onDiscardEdits = () => {
    //     // discard the edits
    //     console.log('will discard the edits')
    //     this.props.discardEdits().then(this.props.toggleEditMode)
    // }

    // onChangeToggles = (toggleName, value) => {
    //     const data = {
    //         [toggleName]: value.toLowerCase()
    //     }
    //     this.props.saveAccount(this.props.selectedID, data)
    // }

    render() {
        const { editMode, signupData, signupUserProfileData } = this.props

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
            </div>
        )

        // const ADDRESSES_TITLES = {
        //     user_input: 'USER_INPUTED_ADDRESS',
        //     twilio_db: 'ADDRESS_FETCHED_FROM_TWILIO',
        //     geoip_db: 'ADDRESS_FETCHED_FROM_GEOIP'
        // }

        // return (
        //     <div className={cx}>
        //         {signupData && (
        //             <Fragment>
        //                 {/* {editMode && (
        //             <EditModeBar
        //                 onEditClick={this.onSaveEdits}
        //                 onDiscardClick={this.onDiscardEdits}
        //             />
        //         )} */}
        //                 <DistributionSignUpHeader
        //                     data={this.state.data}
        //                     onBackButtonClick={this.onBackButtonClick}
        //                 />
        //                 <ProfileDetails
        //                     editMode={editMode}
        //                     data={this.state.data}
        //                 />
        //                 <ProfilePhotos
        //                     editMode={editMode}
        //                     data={this.state.data}
        //                 />
        //                 {/* <ProfileDocuments editMode={editMode} /> */}
        //                 {this.state.data.user_addresses.map((item, i) => (
        //                     <DatabaseInformation
        //                         key={i}
        //                         editMode={editMode}
        //                         title={ADDRESSES_TITLES[item.address_type]}
        //                         address={item}
        //                     />
        //                 ))}
        //                 <AccountDetails
        //                     editMode={editMode}
        //                     data={this.state.data}
        //                     onChangeToggles={this.onChangeToggles}
        //                 />
        //             </Fragment>
        //         )}
        //     </div>
        //)
    }
}

const mapStateToProps = state => ({
    signupData: state.DistributionSignUpStaffSide.signupData,
    signupUserProfileData:
        state.DistributionSignUpStaffSide.signupUserProfileData,
    selectedID: state.DistributionSignUpStaffSide.selectedID
})

const mapDispatchToProps = dispatch => ({
    // toggleEditMode(force) {
    //     return dispatch(distributionActions.toggleEditMode(force))
    // },
    fetchSignupUserProfileData(id) {
        return dispatch(
            distributionSignupStaffSideActions.fetchSignupUserProfileData(id)
        )
    },
    fetchSignup(id) {
        return dispatch(distributionSignupStaffSideActions.fetchSignup(id))
    }
    // saveAccount(id, data) {
    //     return dispatch(distributionSignupStaffSideActions.saveAccount(id, data))
    // }
    // discardEdits() {
    //     return dispatch(distributionActions.discardEdits())
    // }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributionSignUpPage)
