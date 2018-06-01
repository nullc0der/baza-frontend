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
                    strengthBar.progressWidth = 25
                    strengthBar.progressClassName = 'bg-danger'
                    strengthBar.text = 'very guessable'
                    strengthBar.textClassName = 'text-danger'
                    strengthBar.feedBack = result.feedback.suggestions[0]
                    break
                case 2: // somewhat guessable
                    strengthBar.progressWidth = 50
                    strengthBar.progressClassName = 'bg-warning'
                    strengthBar.text = 'somewhat guessable'
                    strengthBar.textClassName = 'text-warning'
                    strengthBar.feedBack = result.feedback.suggestions[0]
                    break
                case 3: // safely unguessable
                    strengthBar.progressWidth = 75
                    strengthBar.pogressClassName = 'bg-info'
                    strengthBar.text = 'safely unguessable'
                    strengthBar.textClassName = 'text-info'
                    strengthBar.feedBack = result.feedback.suggestions[0]
                    break
                case 4: // very unguessable
                    strengthBar.progressWidth = 100
                    strengthBar.progressClassName = 'bg-success'
                    strengthBar.text = 'very unguessable'
                    strengthBar.textClassName = 'text-success'
                    strengthBar.feedBack = result.feedback.suggestions[0]
                    break
                default:
                    strengthBar.progressWidth = 0
                    strengthBar.progressClassName = 'bg-danger'
                    strengthBar.text = 'too guessable'
                    strengthBar.textClassName = 'text-danger'
                    strengthBar.feedBack = result.feedback.suggestions[0]
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
        const { strengthBar } = this.state

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
                {!isEmpty(strengthBar) && (
                    <div className="password-strength text-left mt-1">
                        <p className="password-strength-info">
                            Password strength:{' '}
                            <span
                                className={`strength ${
                                    strengthBar.textClassName
                                }`}>
                                {strengthBar.text}
                            </span>
                        </p>
                        <div className="progress">
                            <div
                                className={`progress-bar ${
                                    strengthBar.progressClassName
                                }`}
                                style={{
                                    width: `${strengthBar.progressWidth}%`
                                }}
                            />
                        </div>
                        <p className="feedback">{strengthBar.feedBack}</p>
                    </div>
                )}
            </div>
        )
    }
}
