import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TextField from 'components/ui/TextField'
import { SelectDropdownItemShape } from './index'

import s from './SelectDropdown.scss'

export default class SimpleSelectDropdown extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(SelectDropdownItemShape).isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        errorState: PropTypes.array,
        showSearch: PropTypes.bool
    }

    state = {
        isOpen: false,
        items: [],
        searchInputValue: ''
    }

    componentDidMount = () => {
        this.setState({
            items: this.props.items
        })
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutside, false)
    }

    toggleOpen = () => {
        if (!this.state.isOpen) {
            document.addEventListener('click', this.handleClickOutside, false)
        } else {
            document.removeEventListener(
                'click',
                this.handleClickOutside,
                false
            )
        }
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleClickOutside = e => {
        if (this.simpleSelectDropdownNode.contains(e.target)) {
            return
        }
        this.toggleOpen()
    }

    handleClick = (e, item, index) => {
        this.props.onChange(item.value)
        this.toggleOpen()
    }

    renderOneOption = (item, index) => {
        return (
            <div
                key={index}
                className="ui-select-dropdown-item"
                onClick={e => this.handleClick(e, item, index)}>
                {item.label}
            </div>
        )
    }

    onSearchInputChange = (id, value) => {
        const { items } = this.props
        this.setState({
            searchInputValue: value,
            items: items.filter(x =>
                x.value.toLowerCase().startsWith(value.toLowerCase())
            )
        })
    }

    render() {
        const {
            value,
            placeholder,
            errorState,
            className,
            showSearch = false
        } = this.props

        const { items, isOpen, searchInputValue } = this.state

        const cx = classnames(
            s.container,
            className,
            'simple-select-dropdown',
            { 'has-value': value }
        )

        return (
            <div
                className={cx}
                ref={node => (this.simpleSelectDropdownNode = node)}>
                <div className="select-label-field">
                    <div className="label-text">{placeholder}</div>
                </div>
                <div className="select-value-field" onClick={this.toggleOpen}>
                    {value}
                </div>
                {errorState && (
                    <div className="ui-select-dropdown-error">
                        {' '}
                        {errorState}{' '}
                    </div>
                )}
                <div
                    className={`ui-select-dropdown-menu ${
                        isOpen ? 'is-open' : ''
                    }`}>
                    {!!showSearch && (
                        <TextField
                            className="ui-select-dropdown-search"
                            id="select-dd-search"
                            label="Search here"
                            onChange={this.onSearchInputChange}
                            value={searchInputValue}
                        />
                    )}
                    {items.map(this.renderOneOption)}
                </div>
            </div>
        )
    }
}
