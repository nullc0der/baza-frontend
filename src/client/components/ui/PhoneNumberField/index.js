import React, { Component } from 'react'
import classnames from 'classnames'

import TextField from 'components/ui/TextField'

import COUNTRYCODES from './countryCodes'
import s from './PhoneNumberField.scss'

const InternationalCodeDropDown = props => {
    return (
        <div className="incode-dropdown-group btn-group col-4 col-md-2">
            <button
                type="button"
                className="btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                {props.selectedCode.dial_code}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                {COUNTRYCODES.map((x, i) => {
                    return (
                        <div
                            key={i}
                            className="dropdown-item"
                            onClick={e => props.onDropDownItemClick(e, x)}>
                            {x.name} ({x.dial_code})
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

class PhoneNumberField extends Component {
    state = {
        selectedCode: { name: 'United States', dial_code: '+1', code: 'US' },
        phoneNumber: ''
    }

    onDropDownItemClick = (e, item) => {
        e.preventDefault()
        this.setState(
            {
                selectedCode: item
            },
            () =>
                this.props.onChange(
                    'phoneNumber',
                    this.state.selectedCode.dial_code + this.state.phoneNumber
                )
        )
    }

    onInputChange = (id, value) => {
        this.setState(
            {
                phoneNumber: value
            },
            () =>
                this.props.onChange(
                    'phoneNumber',
                    this.state.selectedCode.dial_code + this.state.phoneNumber
                )
        )
    }

    render() {
        const { className, showIcon = true } = this.props
        const cx = classnames(s.container, className, 'row', 'no-gutters')
        return (
            <div className={cx}>
                <InternationalCodeDropDown
                    selectedCode={this.state.selectedCode}
                    onDropDownItemClick={this.onDropDownItemClick}
                />
                <TextField
                    id="phoneNumber"
                    label="Phone no."
                    className="col-8 col-md-10"
                    icon={showIcon ? <i className="material-icons">phone</i> : ''}
                    onChange={this.onInputChange}
                    value={this.state.phoneNumber}
                    errorState={this.props.errorState}
                />
            </div>
        )
    }
}

export default PhoneNumberField
