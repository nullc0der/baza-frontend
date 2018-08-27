import React, { Component, Fragment } from 'react'

import TextField from 'components/ui/TextField'
import DatePicker from 'components/ui/DatePicker'

import { COUNTRIES } from './countries'

const CountryDropdown = props => {
    return (
        <Fragment>
            <div className="country-dropdown-group btn-group">
                <button
                    type="button"
                    className="btn btn-block dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {props.selectedCountry ? props.selectedCountry : 'Country'}
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <div className='search-input'>
                        <TextField id='countrySearch' label='Search here' onChange={props.onSearchInputChange} />
                    </div>
                    {props.countries.map((item, i) => (
                        <div
                            key={i}
                            className="dropdown-item"
                            onClick={() => props.onCountrySelect(item)}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            {props.errorState && <div className="ui-textfield-error">{props.errorState}</div>}
        </Fragment>
    )
}

export default class NameAndAddressSection extends Component {
    state = {
        countries: COUNTRIES
    }

    onSearchInputChange = (id, value) => {
        this.setState({
            countries: COUNTRIES.filter(x => x.toLowerCase().startsWith(value.toLowerCase()))
        })
    }

    render() {
        const {
            errorState,
            onInputChange
        } = this.props
        return (
            <div className="signup-section name-address-section">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <TextField
                            id="firstName"
                            label="First Name"
                            errorState={errorState.firstName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField
                            id="lastName"
                            label="Last Name"
                            errorState={errorState.lastName}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <TextField
                            id="refCode"
                            className="is-textbox"
                            label="Enter your referral code here"
                            errorState={errorState.refCode}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <CountryDropdown
                            selectedCountry={this.props.selectedCountry}
                            onCountrySelect={this.props.onCountrySelect}
                            errorState={errorState.country}
                            countries={this.state.countries}
                            onSearchInputChange={this.onSearchInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <TextField
                            id="city"
                            label="City"
                            errorState={errorState.city}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField
                            id="state"
                            label="State"
                            errorState={errorState.state}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="houseNo"
                            label="House No."
                            errorState={errorState.houseNo}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="streetName"
                            label="Street Name"
                            errorState={errorState.streetName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="zipCode"
                            label="Zip Code"
                            errorState={errorState.zipCode}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <DatePicker
                            id="birthDate"
                            label="Birthdate"
                            errorState={errorState.birthDate}
                            onDateChange={onInputChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
