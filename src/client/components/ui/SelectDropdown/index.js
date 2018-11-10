import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import TextField from 'components/ui/TextField'

import s from './SelectDropdown.scss'

export const SelectDropdownItemShape = PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired
})

export default class SelectDropdown extends Component {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        itemRenderer: PropTypes.func,
        items: PropTypes.arrayOf(SelectDropdownItemShape)
    }

    static defaultProps = {
        items: [],
        itemRenderer: function itemRenderer(item, index) { return item.label },
        label: 'Select Dropdown Label'
    }

    renderOneDropdownItem = (item, index) => {
        return (
            <div
                className="ui-select-dropdown-item"
                key={index}
                onClick={e => this.props.onDDItemClick(e, item.value)}>
                {this.props.itemRenderer(item, index)}
            </div>
        )
    }

    render() {
        const {
            className,
            label,
            items,
            onChange,
            value,
            id,
            errorState,
            autoComplete,
            itemRenderer,
            onDDItemClick,
            ...others
        } = this.props
        const cx = classnames(s.container, 'ui-select-dropdown', className)
        return (
            <div className={cx}>
                <TextField
                    className="ui-select-dropdown-label"
                    label={label}
                    onChange={onChange}
                    value={value}
                    id={id}
                    errorState={errorState}
                    autoComplete={autoComplete}
                    {...others}
                />
                {items.length ? (
                    <div className="ui-select-dropdown-menu">
                        {items.map(this.renderOneDropdownItem)}
                    </div>
                ) : null}
            </div>
        )
    }
}
