import React, { Component } from 'react'
import classnames from 'classnames'
import zxcvbn from 'zxcvbn'
import isEmpty from 'lodash/isEmpty'

import TextField from 'components/ui/TextField'

import s from './EnhancedPasswordField.scss'

export default class EnhancedPasswordField extends Component {
    state = {
        showPassword: false,
        strengthBar: {}
    }

    onTextFieldChange = (id, value) => {
        this.props.onChange(id, value)
        if (this.props.checkStrength) {
            const strengthBar = {}
            const result = zxcvbn(value)
            switch (result.score) {
                case 0: // too guessable
                case 1: // very guessable
                    strengthBar.width = 25
                    strengthBar.className = 'bg-danger'
                    break
                case 2: // somewhat guessable
                    strengthBar.width = 50
                    strengthBar.className = 'bg-warning'
                    break
                case 3: // safely unguessable
                    strengthBar.width = 75
                    strengthBar.className = 'bg-info'
                    break
                case 4: // very unguessable
                    strengthBar.width = 100
                    strengthBar.className = 'bg-success'
                    break
                default:
                    strengthBar.width = 0
                    strengthBar.className = 'bg-danger'
            }
            this.setState({
                strengthBar: strengthBar
            })
        }
    }

    onClickShowPassword = e => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {
        const { className, id, label, icon, errorState, value } = this.props

        const cx = classnames(
            s.container,
            'ui-enhanced-passwordfield',
            {
                'has-error': this.props.errorState !== null
            },
            className
        )

        return (
            <div className={cx}>
                <TextField
                    type={this.state.showPassword ? 'text' : 'password'}
                    id={id}
                    label={label}
                    icon={icon}
                    errorState={errorState}
                    value={value}
                    onChange={this.onTextFieldChange}
                />
                <div
                    className="ui-enhanced-passwordfield-toggle"
                    onClick={this.onClickShowPassword}>
                    <i className="material-icons">
                        {this.state.showPassword
                            ? 'visibility_off'
                            : 'visibility'}
                    </i>
                </div>
                {!isEmpty(this.state.strengthBar) && (
                    <div className="password-strength mt-1">
                        <div className="progress">
                            <div
                                className={`progress-bar ${
                                    this.state.strengthBar.className
                                }`}
                                style={{
                                    width: `${this.state.strengthBar.width}%`
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
