import React, { Component } from 'react'
import find from 'lodash/find'
import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'
var counter = 0

const EMAIL_TYPE_OPTIONS = [
    { label: 'Home Email', value: 'home' },
    { label: 'Office Email', value: 'office' },
    { label: 'Emergency Email', value: 'emergency' },
    { label: 'Mobile Email', value: 'mobile' }
]

class EmailTypeDropdown extends Component {
    onChange = (e, value) => {
        console.log('clicked type option', e, value)
        this.props.onChange(value)
    }
    render() {
        const id = `email-type-dropdown-${++counter}`
        const value = this.props.value
            ? find(EMAIL_TYPE_OPTIONS, { value: this.props.value }).label
            : ''

        return (
            <SelectDropdown
                className={this.props.className}
                id={id}
                placeholder='Email Type'
                value={value}
                items={EMAIL_TYPE_OPTIONS}
                onChange={this.onChange} />
        )
    }
}


export default EmailTypeDropdown
