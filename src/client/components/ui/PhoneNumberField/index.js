import React, { Component } from 'react'
import classnames from 'classnames'
import takeRight from 'lodash/takeRight'
import find from 'lodash/find'
import TextField from 'components/ui/TextField'

import COUNTRYCODES from './countryCodes'
import s from './PhoneNumberField.scss'

const InternationalCodeDropDown = props => {
    return (
        <div className={props.className}>
            <button
                type="button"
                className="btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                {props.selectedCode.dial_code}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                <div className="search-input">
                    <TextField
                        id="countrySearch"
                        label="Search country"
                        onChange={props.onSearchInputChange}
                        value={props.searchInputValue}
                    />
                </div>
                {props.countryCodes.map((x, i) => {
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
    constructor(props) {
        super(props)
        this.state = {
            selectedCode: {
                name: 'United States',
                dial_code: '+1',
                code: 'US'
            },
            countryCodes: COUNTRYCODES,
            searchInputValue: '',
            phoneNumber: '',
            ...this.parseDefaultValue(props.defaultValue)
        }
    }

    onSearchInputChange = (id, value) => {
        this.setState({
            searchInputValue: value,
            countryCodes: COUNTRYCODES.filter(x =>
                x.name.toLowerCase().startsWith(value.toLowerCase())
            )
        })
    }

    parseDefaultValue = () => {
        const { defaultValue } = this.props
        if (!defaultValue || typeof defaultValue !== 'string') {
            return {}
        }

        const phoneNumber = takeRight(defaultValue.split(''), 10).join('')
        const dial_code = defaultValue.split(phoneNumber)[0]

        const selectedCode = find(COUNTRYCODES, { dial_code })
        return { selectedCode, phoneNumber }
    }

    componentWillReceiveProps = nextProps => {
        if (
            !this.props.defaultValue &&
            this.props.defaultValue !== nextProps.defaultValue
        ) {
            this.setState(this.parseDefaultValue(nextProps.defaultValue))
        }
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
        const {
            className,
            showIcon = true,
            label = 'Phone no.',
            placeholder = ''
        } = this.props
        const cx = classnames(
            s.container,
            className,
            'row',
            'no-gutters',
            'ui-phone-number-field'
        )
        return (
            <div className={cx}>
                <InternationalCodeDropDown
                    className="incode-dropdown-group btn-group number-code-dropdown"
                    selectedCode={this.state.selectedCode}
                    onDropDownItemClick={this.onDropDownItemClick}
                    countryCodes={this.state.countryCodes}
                    searchInputValue={this.state.searchInputValue}
                    onSearchInputChange={this.onSearchInputChange}
                />
                <TextField
                    id="phoneNumber"
                    label={label}
                    placeholder={placeholder}
                    className="flex-1 number-input"
                    icon={
                        showIcon ? <i className="material-icons">phone</i> : ''
                    }
                    onChange={this.onInputChange}
                    value={this.state.phoneNumber}
                    errorState={this.props.errorState}
                />
            </div>
        )
    }
}

export default PhoneNumberField
