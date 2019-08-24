import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'components/ui/CardWithTabs'

import EditBar from './EditBar'
import ContactDetails from './ContactDetails'
import AddressDetails from './AddressDetails'
import Documents from './Documents'
import OtherInfo from './OtherInfo'

class DistributionProfileCard extends Component {
    state = {
        editMode: false,
        selectedDataTypes: [],
        selectedDataSubtypes: []
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
            data_subtypes: this.state.selectedDataSubtypes
        }).then(() =>
            this.setState({ editMode: false }, () =>
                addNotification({
                    message:
                        'The form is resetted successfully and user will be notified by email',
                    level: 'success'
                })
            )
        )
    }

    render() {
        const { distributionProfile } = this.props
        return (
            <Card
                className="distribution-profile-card"
                id="applicationProfileCard">
                <CardHeader title="Application Profile" />
                <CardBody>
                    <div className="row">
                        <div className="col-md-12">
                            <EditBar
                                editMode={this.state.editMode}
                                toggleEditMode={this.toggleEditMode}
                                selectedFieldCount={
                                    this.state.selectedDataTypes.length +
                                    this.state.selectedDataSubtypes.length
                                }
                                onClickMarkViolation={this.onClickMarkViolation}
                            />
                        </div>
                    </div>
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
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default DistributionProfileCard
