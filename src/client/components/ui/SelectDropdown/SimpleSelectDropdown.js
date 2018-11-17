import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SelectDropdownItemShape } from './index'

import s from './SelectDropdown.scss'

export default class SimpleSelectDropdown extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(SelectDropdownItemShape).isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        placeholder: PropTypes.string
    }

    state = {
        isOpen: false
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleClick = (e, item, index) => {
        this.props.onChange(item.value)
        this.toggleOpen()
    }

    renderOneOption = (item, index) => {
        return (
            <div
                key={index}
                className='ui-select-dropdown-item'
                onClick={e => this.handleClick(e, item, index)}>
                {item.label}
            </div>
        )
    }

    render() {
        const {
            items,
            value,
            placeholder,
            className
        } = this.props

        const { isOpen } = this.state

        const cx = classnames(s.container, className)

        return (
            <div className={cx}>
                <div className='select-value-field' onClick={this.toggleOpen}>
                    {value ? value : placeholder}
                </div>
                <div className={`ui-select-dropdown-menu ${isOpen ? 'is-open' : ''}`}>
                    {items.map(this.renderOneOption)}
                </div>
            </div>
        )
    }
}
