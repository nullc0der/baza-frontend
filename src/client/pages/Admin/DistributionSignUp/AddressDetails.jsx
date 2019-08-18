import React, { Component } from 'react'

import DistributionSignupInfoCard from './DistributionSignupInfoCard'

class AddressDetails extends Component {
    render() {
        const {
            addressDetails,
            editMode,
            editSelectedDataTypes,
            selectedDataTypes,
            editSelectedDataSubtypes,
            selectedDataSubtypes
        } = this.props
        const userAddress = addressDetails.addresses.filter(
            (x, i) => x.address_type === 'user_input'
        )[0]
        return (
            <DistributionSignupInfoCard
                title="Address"
                className="address-details"
                editMode={editMode}
                editSelectedDataTypes={() =>
                    editSelectedDataTypes('address', [
                        'house_number',
                        'street',
                        'zip_code',
                        'city',
                        'state',
                        'country'
                    ])
                }
                inputChecked={selectedDataTypes.indexOf('address') > -1}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="text-box">
                            <div className="title">House Number</div>
                            <div className="content-with-badge">
                                {!!editMode && (
                                    <input
                                        className="checkbox mr-1"
                                        type="checkbox"
                                        checked={
                                            selectedDataSubtypes.indexOf(
                                                'house_number'
                                            ) > -1
                                        }
                                        onChange={() =>
                                            editSelectedDataSubtypes(
                                                'address',
                                                'house_number'
                                            )
                                        }
                                    />
                                )}
                                <div className="content">
                                    {userAddress.house_number}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-box">
                            <div className="title">Street</div>
                            <div className="content-with-badge">
                                {!!editMode && (
                                    <input
                                        className="checkbox mr-1"
                                        type="checkbox"
                                        checked={
                                            selectedDataSubtypes.indexOf(
                                                'street'
                                            ) > -1
                                        }
                                        onChange={() =>
                                            editSelectedDataSubtypes(
                                                'address',
                                                'street'
                                            )
                                        }
                                    />
                                )}
                                <div className="content">
                                    {userAddress.street_name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-box">
                            <div className="title">City</div>
                            <div className="content-with-badge">
                                {!!editMode && (
                                    <input
                                        className="checkbox mr-1"
                                        type="checkbox"
                                        checked={
                                            selectedDataSubtypes.indexOf(
                                                'city'
                                            ) > -1
                                        }
                                        onChange={() =>
                                            editSelectedDataSubtypes(
                                                'address',
                                                'city'
                                            )
                                        }
                                    />
                                )}
                                <div className="content">
                                    {userAddress.city}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-md-4">
                        <div className="text-box">
                            <div className="title">State</div>
                            <div className="content-with-badge">
                                {!!editMode && (
                                    <input
                                        className="checkbox mr-1"
                                        type="checkbox"
                                        checked={
                                            selectedDataSubtypes.indexOf(
                                                'state'
                                            ) > -1
                                        }
                                        onChange={() =>
                                            editSelectedDataSubtypes(
                                                'address',
                                                'state'
                                            )
                                        }
                                    />
                                )}
                                <div className="content">
                                    {userAddress.state}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-box">
                            <div className="title">Country</div>
                            <div className="content-with-badge">
                                {!!editMode && (
                                    <input
                                        className="checkbox mr-1"
                                        type="checkbox"
                                        checked={
                                            selectedDataSubtypes.indexOf(
                                                'country'
                                            ) > -1
                                        }
                                        onChange={() =>
                                            editSelectedDataSubtypes(
                                                'address',
                                                'country'
                                            )
                                        }
                                    />
                                )}
                                <div className="content">
                                    {userAddress.country}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-box">
                            <div className="title">Zip Code</div>
                            <div className="content-with-badge">
                                {!!editMode && (
                                    <input
                                        className="checkbox mr-1"
                                        type="checkbox"
                                        checked={
                                            selectedDataSubtypes.indexOf(
                                                'zip_code'
                                            ) > -1
                                        }
                                        onChange={() =>
                                            editSelectedDataSubtypes(
                                                'address',
                                                'zip_code'
                                            )
                                        }
                                    />
                                )}
                                <div className="content">
                                    {userAddress.zip_code}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-md-6">
                        <div className="text-box">
                            <div className="title">Latitude</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {userAddress.latitude}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-box">
                            <div className="title">Longitude</div>
                            <div className="content-with-badge">
                                <div className="content">
                                    {userAddress.longitude}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!addressDetails.twilio_address_fetched && (
                    <div className="alert alert-danger mt-2">
                        Autosignup: System could not fetch address data from
                        twilio
                    </div>
                )}
                {!addressDetails.geoip_address_fetched && (
                    <div className="alert alert-danger">
                        Autosignup: System could not fetch GeoIP address
                    </div>
                )}
                {addressDetails.twilio_address_is_not_within_range && (
                    <div className="alert alert-danger">
                        Autosignup: The user submitted and twilio fetched
                        address are not within specified range
                    </div>
                )}
                {addressDetails.geoip_address_is_not_within_range && (
                    <div className="alert alert-danger">
                        Autosignup: The user submitted and GeoIP address are not
                        within specified range
                    </div>
                )}
            </DistributionSignupInfoCard>
        )
    }
}

export default AddressDetails
