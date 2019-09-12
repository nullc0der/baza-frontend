import React, { Component } from 'react'
import get from 'lodash/get'

import { Card, CardHeader, CardBody } from 'components/ui/CardWithTabs'
import Dialog from 'components/ui/Dialog'
import Avatar from 'components/Avatar'

import EditBar from './EditBar'
import ContactDetails from './ContactDetails'
import AddressDetails from './AddressDetails'
import Documents from './Documents'
import OtherInfo from './OtherInfo'
import ErrorBar from './ErrorBar'

import s from './DistributionSignUp.scss'

class DistributionProfileCard extends Component {
    state = {
        editMode: false,
        selectedDataTypes: [],
        selectedDataSubtypes: [],
        reportViolationModalIsOpen: false,
        reassignDialogIsOpen: false,
        selectedStaffID: null,
        violationComment: '',
        error: null
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.distributionProfile !== this.props.distributionProfile) {
            this.setState({
                editMode: false,
                selectedDataTypes: [],
                selectedDataSubtypes: []
            })
        }
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    editSelectedDataTypes = (type, subTypes) => {
        let selectedDataTypes = this.state.selectedDataTypes
        let selectedDataSubtypes = this.state.selectedDataSubtypes
        if (selectedDataTypes.indexOf(type) !== -1) {
            selectedDataTypes = selectedDataTypes.filter(x => x !== type)
            for (const subType of subTypes) {
                selectedDataSubtypes = selectedDataSubtypes.filter(
                    x => x !== subType
                )
            }
        } else {
            selectedDataTypes = selectedDataTypes.concat(type)
            for (const subType of subTypes) {
                if (selectedDataSubtypes.indexOf(subType) === -1) {
                    selectedDataSubtypes = selectedDataSubtypes.concat(subType)
                }
            }
        }
        this.setState({
            selectedDataTypes,
            selectedDataSubtypes
        })
    }

    editSelectedDataSubtypes = (type, subType) => {
        let selectedDataTypes = this.state.selectedDataTypes
        let selectedDataSubtypes = this.state.selectedDataSubtypes
        if (selectedDataTypes.indexOf(type) === -1) {
            selectedDataTypes = selectedDataTypes.concat(type)
        }
        if (selectedDataSubtypes.indexOf(subType) !== -1) {
            selectedDataSubtypes = selectedDataSubtypes.filter(
                x => x !== subType
            )
        } else {
            selectedDataSubtypes = selectedDataSubtypes.concat(subType)
        }
        this.setState({
            selectedDataTypes,
            selectedDataSubtypes
        })
    }

    onClickMarkViolation = () => {
        const {
            markFormViolation,
            distributionProfile,
            addNotification
        } = this.props
        markFormViolation(distributionProfile.id, {
            data_types: this.state.selectedDataTypes,
            data_subtypes: this.state.selectedDataSubtypes,
            invalidation_comment: this.state.violationComment
        })
            .then(() =>
                this.setState(
                    { editMode: false, reportViolationModalIsOpen: false },
                    () =>
                        addNotification({
                            message:
                                'The form is resetted successfully and user will be notified by email',
                            level: 'success'
                        })
                )
            )
            .catch(responseData => {
                this.setState({
                    editMode: false,
                    reportViolationModalIsOpen: false,
                    error: get(responseData, 'error', null)
                })
            })
    }

    toggleReportViolationDialog = () => {
        this.setState({
            reportViolationModalIsOpen: !this.state.reportViolationModalIsOpen
        })
    }

    toggleReassignDialog = () => {
        const { getReassignableStaffs } = this.props
        this.setState(
            {
                reassignDialogIsOpen: !this.state.reassignDialogIsOpen
            },
            () => {
                if (this.state.reassignDialogIsOpen) {
                    getReassignableStaffs()
                }
            }
        )
    }

    onChangeViolationComment = e => {
        this.setState({
            violationComment: e.target.value
        })
    }

    changeSelectedStaffID = id => {
        this.setState({
            selectedStaffID: id
        })
    }

    onChangeSignupStatus = (signupID, value) => {
        const { changeSignupStatus } = this.props
        changeSignupStatus(signupID, value)
            .then(() => {})
            .catch(responseData => {
                this.setState({
                    error: get(responseData, 'error', null)
                })
            })
    }

    render() {
        const {
            staffs,
            distributionProfile,
            onClickSubmitReassign
        } = this.props
        const { selectedStaffID, error } = this.state

        return (
            <Card
                className="distribution-profile-card"
                id="applicationProfileCard">
                <CardHeader title="Application Profile" />
                <CardBody>
                    <div className="row">
                        <div className="col-md-12">
                            <EditBar
                                status={
                                    distributionProfile.additional_data.status
                                }
                                signupID={distributionProfile.id}
                                editMode={this.state.editMode}
                                toggleEditMode={this.toggleEditMode}
                                selectedFieldCount={
                                    this.state.selectedDataTypes.length +
                                    this.state.selectedDataSubtypes.length
                                }
                                toggleReportViolationDialog={
                                    this.toggleReportViolationDialog
                                }
                                onChangeStatus={this.onChangeSignupStatus}
                            />
                            <Dialog
                                className={s.reportviolationdialog}
                                isOpen={this.state.reportViolationModalIsOpen}
                                title="Report Violation"
                                onRequestClose={
                                    this.toggleReportViolationDialog
                                }>
                                <div className="report-violation-dialog-content">
                                    <p>
                                        By clicking submit on this dialog will
                                        reset the selected field on user's
                                        signup form and the user will be
                                        notified by email.
                                    </p>
                                    <p>
                                        Please add a comment in below text box,
                                        it will be forwarded to user.
                                    </p>
                                    <textarea
                                        className="form-control px-1"
                                        value={this.state.violationComment}
                                        onChange={this.onChangeViolationComment}
                                    />
                                    <button
                                        className="btn btn-block btn-dark text-uppercase mt-2"
                                        onClick={this.onClickMarkViolation}>
                                        Submit
                                    </button>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                    {!!error && (
                        <div className="row">
                            <div className="col-md-12">
                                <ErrorBar error={error} />
                            </div>
                        </div>
                    )}
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <ContactDetails
                                editMode={this.state.editMode}
                                contactDetails={
                                    distributionProfile.contact_data
                                }
                                editSelectedDataTypes={
                                    this.editSelectedDataTypes
                                }
                                editSelectedDataSubtypes={
                                    this.editSelectedDataSubtypes
                                }
                                selectedDataTypes={this.state.selectedDataTypes}
                                selectedDataSubtypes={
                                    this.state.selectedDataSubtypes
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <AddressDetails
                                editMode={this.state.editMode}
                                addressDetails={
                                    distributionProfile.address_data
                                }
                                editSelectedDataTypes={
                                    this.editSelectedDataTypes
                                }
                                editSelectedDataSubtypes={
                                    this.editSelectedDataSubtypes
                                }
                                selectedDataTypes={this.state.selectedDataTypes}
                                selectedDataSubtypes={
                                    this.state.selectedDataSubtypes
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <Documents
                                editMode={this.state.editMode}
                                document={
                                    distributionProfile.additional_data.photo
                                }
                                editSelectedDataTypes={
                                    this.editSelectedDataTypes
                                }
                                editSelectedDataSubtypes={
                                    this.editSelectedDataSubtypes
                                }
                                selectedDataTypes={this.state.selectedDataTypes}
                                selectedDataSubtypes={
                                    this.state.selectedDataSubtypes
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <OtherInfo
                                otherInfo={distributionProfile.additional_data}
                                toggleReassignDialog={this.toggleReassignDialog}
                            />
                            <Dialog
                                className={s.reassigndialog}
                                isOpen={this.state.reassignDialogIsOpen}
                                title="Reassign staff"
                                onRequestClose={this.toggleReassignDialog}>
                                <div className="reassign-staff-dialog-content">
                                    {staffs.length ? (
                                        <h6>
                                            Following Staffs are available to
                                            reassign
                                        </h6>
                                    ) : (
                                        <h6>
                                            No staffs are available to reassign
                                        </h6>
                                    )}
                                    {!!staffs.length && (
                                        <div className="staffs">
                                            {staffs.map((x, i) => (
                                                <div
                                                    className={`${
                                                        selectedStaffID === x.id
                                                            ? 'staff selected'
                                                            : 'staff'
                                                    }`}
                                                    onClick={() =>
                                                        this.changeSelectedStaffID(
                                                            x.id
                                                        )
                                                    }
                                                    key={i}>
                                                    <Avatar
                                                        className="avatar-image"
                                                        size={26}
                                                        otherProfile={{
                                                            username:
                                                                x.username,
                                                            profile_photo:
                                                                x.user_image_url,
                                                            default_avatar_color:
                                                                x.user_avatar_color
                                                        }}
                                                        own={false}
                                                    />
                                                    <span>{x.fullname}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        className="btn btn-dark btn-block text-uppercase mt-1"
                                        onClick={() =>
                                            onClickSubmitReassign(
                                                selectedStaffID
                                            )
                                        }>
                                        Submit
                                    </button>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default DistributionProfileCard
