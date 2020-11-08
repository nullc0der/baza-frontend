import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { CardContent } from 'components/ui/CardWithTabs'
import TextField from 'components/ui/TextField'
import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'

import { actions as userProfileActions } from 'store/UserProfile'
import { actions as commonActions } from 'store/Common'

import { COUNTRIES } from 'pages/Admin/AdminSignUp/countries'

class LocationDetails extends Component {
    state = {
        inputValues: {
            country: '',
            city: '',
            state: '',
            houseNo: '',
            streetName: '',
            zipCode: '',
        },
        errorState: {
            country: null,
            city: null,
            state: null,
            houseNo: null,
            streetName: null,
            zipCode: null,
        },
    }

    componentDidMount() {
        this.props
            .fetchDistributionSignupLocation()
            .then(() => {})
            .catch(() => {})
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.distributionSignupLocation !==
            this.props.distributionSignupLocation
        ) {
            const { distributionSignupLocation } = this.props
            if (!isEmpty(distributionSignupLocation)) {
                this.setState({
                    inputValues: {
                        country: distributionSignupLocation.country,
                        city: distributionSignupLocation.city,
                        state: distributionSignupLocation.state,
                        houseNo: distributionSignupLocation.house_number,
                        streetName: distributionSignupLocation.street,
                        zipCode: distributionSignupLocation.zip_code,
                    },
                })
            }
        }
    }

    onInputChange = (id, value) => {
        this.setState((prevState) => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value,
            },
        }))
    }

    onClickSubmit = () => {
        const { inputValues } = this.state
        this.props
            .addDistributionSignupLocation({
                country: inputValues.country,
                city: inputValues.city,
                state: inputValues.state,
                house_number: inputValues.houseNo,
                street: inputValues.streetName,
                zip_code: inputValues.zipCode,
            })
            .then(() => {
                this.setState(
                    {
                        errorState: {
                            country: null,
                            city: null,
                            state: null,
                            houseNo: null,
                            streetName: null,
                            zipCode: null,
                        },
                    },
                    () => {
                        this.props.addNotification({
                            message: 'Location Updated Successfully',
                            level: 'success',
                        })
                    }
                )
            })
            .catch((responseData) => {
                this.setState({
                    errorState: {
                        country: get(responseData, 'country', null),
                        city: get(responseData, 'city', null),
                        state: get(responseData, 'state', null),
                        houseNo: get(responseData, 'house_number', null),
                        streetName: get(responseData, 'street', null),
                        zipCode: get(responseData, 'zip_code', null),
                    },
                })
            })
    }

    render() {
        const { inputValues, errorState } = this.state

        return (
            <CardContent>
                <div className="details-section">
                    <div className="title mb-2">LOCATION</div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <SelectDropdown
                                showSearch
                                className="country-select-dropdown"
                                id="country"
                                placeholder="Country"
                                value={inputValues.country}
                                items={COUNTRIES}
                                onChange={(value) =>
                                    this.onInputChange('country', value)
                                }
                                errorState={errorState.country}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <TextField
                                id="city"
                                label="City"
                                value={inputValues.city}
                                errorState={errorState.city}
                                onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <TextField
                                id="state"
                                label="State"
                                value={inputValues.state}
                                errorState={errorState.state}
                                onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <TextField
                                id="houseNo"
                                label="House No."
                                value={inputValues.houseNo}
                                errorState={errorState.houseNo}
                                onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <TextField
                                id="streetName"
                                label="Street Name"
                                value={inputValues.streetName}
                                errorState={errorState.streetName}
                                onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <TextField
                                id="zipCode"
                                label="Zip Code"
                                value={inputValues.zipCode}
                                errorState={errorState.zipCode}
                                onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button
                                className="btn btn-dark btn-block"
                                onClick={this.onClickSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = (state) => ({
    distributionSignupLocation: state.UserProfile.distributionSignupLocation,
})

const mapDispatchToProps = (dispatch) => ({
    fetchDistributionSignupLocation: () =>
        dispatch(userProfileActions.fetchDistributionSignupLocation()),
    addDistributionSignupLocation: (data) =>
        dispatch(userProfileActions.addDistributionSignupLocation(data)),
    addNotification: (notification) =>
        dispatch(commonActions.addNotification(notification)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetails)
