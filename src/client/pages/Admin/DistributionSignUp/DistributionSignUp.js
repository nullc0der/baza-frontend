import React, { Component, Fragment } from 'react'
import classnames from 'classnames'

import { connect } from 'react-redux'

// import isBoolean from 'lodash/isBoolean'

import s from './DistributionSignUp.scss'

import ProfileDetails from './ProfileDetails'
import ProfilePhotos from './ProfilePhotos'
// import ProfileDocuments from './ProfileDocuments'
import DatabaseInformation from './DatabaseInformation'
import AccountDetails from './AccountDetails'
// import EditModeBar from './EditModeBar'
import DistributionSignUpHeader from './DistributionSignupHeader'

import { actions as distributionActions } from 'store/DistributionSignUp'

class DistributionSignUpPage extends Component {
    state = {
        data: null
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedID !== this.props.selectedID) {
            const hasData = this.props.datas.filter(
                x => x.id_ === this.props.selectedID
            )
            if (!hasData.length) {
                this.props.fetchAccount(this.props.selectedID)
            } else {
                this.setState({
                    data: hasData[0]
                })
            }
        }
        if (prevProps.datas !== this.props.datas) {
            const data = this.props.datas.filter(
                x => x.id_ === this.props.selectedID
            )
            this.setState({
                data: data[0]
            })
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

    onChangeToggles = (toggleName, value) => {
        const data = {
            [toggleName]: value.toLowerCase()
        }
        this.props.saveAccount(this.props.selectedID, data)
    }

    render() {
        const { editMode } = this.props

        const cx = classnames(s.signupdetails)

        const ADDRESSES_TITLES = {
            user_input: 'USER_INPUTED_ADDRESS',
            twilio_db: 'ADDRESS_FETCHED_FROM_TWILIO',
            geoip_db: 'ADDRESS_FETCHED_FROM_GEOIP'
        }

        return (
            <div className={cx}>
                {this.state.data && (
                    <Fragment>
                        {/* {editMode && (
                    <EditModeBar
                        onEditClick={this.onSaveEdits}
                        onDiscardClick={this.onDiscardEdits}
                    />
                )} */}
                        <DistributionSignUpHeader
                            data={this.state.data}
                            onBackButtonClick={this.onBackButtonClick}
                        />
                        <ProfileDetails
                            editMode={editMode}
                            data={this.state.data}
                        />
                        <ProfilePhotos
                            editMode={editMode}
                            data={this.state.data}
                        />
                        {/* <ProfileDocuments editMode={editMode} /> */}
                        {this.state.data.user_addresses.map((item, i) => (
                            <DatabaseInformation
                                key={i}
                                editMode={editMode}
                                title={ADDRESSES_TITLES[item.address_type]}
                                address={item}
                            />
                        ))}
                        <AccountDetails
                            editMode={editMode}
                            data={this.state.data}
                            onChangeToggles={this.onChangeToggles}
                        />
                    </Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    datas: state.DistributionSignUp.datas,
    selectedID: state.DistributionSignUp.selectedID
})

const mapDispatchToProps = dispatch => ({
    // toggleEditMode(force) {
    //     return dispatch(distributionActions.toggleEditMode(force))
    // },
    fetchAccount(id) {
        return dispatch(distributionActions.fetchAccount(id))
    },
    saveAccount(id, data) {
        return dispatch(distributionActions.saveAccount(id, data))
    }
    // discardEdits() {
    //     return dispatch(distributionActions.discardEdits())
    // }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributionSignUpPage)
