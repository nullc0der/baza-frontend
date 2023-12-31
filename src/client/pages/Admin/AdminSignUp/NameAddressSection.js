import React from 'react'
import includes from 'lodash/includes'

import TextField from 'components/ui/TextField'
import DatePicker from 'components/ui/DatePicker'

import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'

import { COUNTRIES } from './countries'

const NameAndAddressSection = props => {
    const {
        errorState,
        onInputChange,
        inputValues,
        onRefCodeInputChange,
        invalidatedFields
    } = props
    return (
        <div className="signup-section name-address-section">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <TextField
                        id="firstName"
                        label="First Name"
                        value={inputValues.firstName}
                        errorState={errorState.firstName}
                        onChange={onInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <TextField
                        id="lastName"
                        label="Last Name"
                        value={inputValues.lastName}
                        errorState={errorState.lastName}
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <TextField
                        id="refCode"
                        className="is-textbox referral-code-input"
                        label="Enter your referral code here"
                        value={inputValues.refCode}
                        errorState={errorState.refCode}
                        onChange={onRefCodeInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <SelectDropdown
                        showSearch
                        className="country-select-dropdown"
                        id="country"
                        placeholder="Country"
                        value={inputValues.country}
                        items={COUNTRIES}
                        onChange={value => onInputChange('country', value)}
                        errorState={
                            errorState.country ||
                            (includes(invalidatedFields, 'country')
                                ? ['This field is marked as violation']
                                : null)
                        }
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <TextField
                        id="city"
                        label="City"
                        value={inputValues.city}
                        errorState={
                            errorState.city ||
                            (includes(invalidatedFields, 'city')
                                ? ['This field is marked as violation']
                                : null)
                        }
                        onChange={onInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <TextField
                        id="state"
                        label="State"
                        value={inputValues.state}
                        errorState={
                            errorState.state ||
                            (includes(invalidatedFields, 'state')
                                ? ['This field is marked as violation']
                                : null)
                        }
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <TextField
                        id="houseNo"
                        label="House No."
                        value={inputValues.houseNo}
                        errorState={
                            errorState.houseNo ||
                            (includes(invalidatedFields, 'house_number')
                                ? ['This field is marked as violation']
                                : null)
                        }
                        onChange={onInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <TextField
                        id="streetName"
                        label="Street Name"
                        value={inputValues.streetName}
                        errorState={
                            errorState.streetName ||
                            (includes(invalidatedFields, 'street')
                                ? ['This field is marked as violation']
                                : null)
                        }
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <TextField
                        id="zipCode"
                        label="Zip Code"
                        value={inputValues.zipCode}
                        errorState={
                            errorState.zipCode ||
                            (includes(invalidatedFields, 'zip_code')
                                ? ['This field is marked as violation']
                                : null)
                        }
                        onChange={onInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <DatePicker
                        id="birthDate"
                        label="Birthdate"
                        value={inputValues.birthDate}
                        errorState={errorState.birthDate}
                        onDateChange={onInputChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default NameAndAddressSection
