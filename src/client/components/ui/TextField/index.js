import React, { Component } from 'react'
import classnames from 'classnames'

//eslint-disable-next-line no-unused-vars
import debounce from 'lodash/debounce'

import s from './TextField.scss'

export default class TextField extends Component {
    state = {
        value: ''
    }

    componentDidMount = () => {
        // if (this.props.value) {
        //   this.setState({ value: this.props.value })
        // }
        // this._onChange = debounce(this.onChange, 100, { trailing: true })
    }

    componentWillReceiveProps = nextProps => {
        // if (nextProps.value !== this.state.value)
        //   this.setState({ value: nextProps.value })
    }

    onChange = (id, value) => {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(id, value)
        }
    }

    onInputChange = e => {
        e.stopPropagation()
        const value = e.target.value
        const id = e.target.id
        this.setState({ value })
        // this._onChange(value)
        this.onChange(id, value)
    }

    render() {
        const {
            className,
            inputClassName,
            label = false,
            icon = false,
            center = false,
            type = 'text',
            errorState = null,
            value,
            onChange,
            ...others
        } = this.props

        const cx = classnames(s.container, 'ui-textfield', className)

        const inputClass = classnames('ui-textfield-input', inputClassName, {
            'has-value': this.state.value || value,
            'in-center': center
        })

        const _Label = !!label && (
            <label className="ui-textfield-label">
                {!!icon && <span className="label-icon"> {icon} </span>}
                <span className="label-text"> {label} </span>
            </label>
        )

        const _ValidationIcon = errorState !== null && (
            <div className="ui-textfield-validation-icon">
                {errorState === false ? (
                    <i className="material-icons text-success">check</i>
                ) : errorState === 'loading' ? (
                    <i className="material-icons text-info">cached</i>
                ) : (
                    <i className="material-icons text-danger">close</i>
                )}
            </div>
        )

        return (
            <div className={cx}>
                <input
                    type={type}
                    className={inputClass}
                    onChange={this.onInputChange}
                    value={this.state.value || value || ''}
                    {...others}
                />
                {_Label}
                {_ValidationIcon}
                {errorState &&
                    errorState !== 'loading' && (
                        <div className="ui-textfield-error"> {errorState} </div>
                    )}
            </div>
        )
    }
}
