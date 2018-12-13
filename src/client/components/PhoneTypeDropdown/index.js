import React, { Component } from 'react'
import find from 'lodash/find'
import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'
var counter = 0

const PHONE_TYPE_OPTIONS = [
    { label: 'Home', value: 'home' },
    { label: 'Office', value: 'office' },
    { label: 'Emergency', value: 'emergency' },
    { label: 'Mobile', value: 'mobile' }
]

class PhoneTypeDropdown extends Component {
    render() {
        const id = `phone-type-dropdown-${++counter}`
        const value = this.props.value
            ? find(PHONE_TYPE_OPTIONS, { value: this.props.value }).label
            : ''

        return (
            <SelectDropdown
                className={this.props.className}
                id={id}
                placeholder="Phone Type"
                value={value}
                items={PHONE_TYPE_OPTIONS}
                onChange={this.props.onChange}
                errorState={this.props.errorState}
            />
        )
    }
}

export default PhoneTypeDropdown
