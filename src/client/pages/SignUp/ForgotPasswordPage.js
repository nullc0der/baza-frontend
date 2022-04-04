import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import Auth from 'utils/authHelpers'

import Header from 'components/Header'
import TextField from 'components/ui/TextField'
import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'

import s from './SignUp.scss'

const EmailSection = (props) => {
    return (
        <div className="card-text">
            Please enter your email below to get reset link
            <div className="email-section mt-3 mb-3">
                <TextField
                    id="email"
                    label="Email"
                    className="mb-3"
                    icon={<i className="material-icons">email</i>}
                    value={props.inputValues.email}
                    onChange={props.onInputChange}
                    errorState={
                        props.errorText.email.length
                            ? props.errorText.email
                            : null
                    }
                />
                {!!props.emailSent && (
                    <p>An email with reset link sent to your address</p>
                )}
                <button
                    className="btn btn-dark btn-block"
                    onClick={props.onEmailSubmit}>
                    SUBMIT
                </button>
            </div>
        </div>
    )
}

const PasswordSection = (props) => {
    return (
        <div className="card-text">
            Enter your new password below
            <div className="password-section mt-3 mb-3">
                <EnhancedPasswordField
                    id="password"
                    label="Password"
                    className="mb-3"
                    icon={<i className="material-icons">lock_outline</i>}
                    value={props.inputValues.password}
                    errorState={
                        props.errorText.password.length
                            ? props.errorText.password
                            : null
                    }
                    onChange={props.onInputChange}
                    checkStrength={true}
                />
                <EnhancedPasswordField
                    id="password1"
                    label="Confirm Password"
                    className="mb-3"
                    onChange={props.onInputChange}
                    value={props.inputValues.password1}
                    errorState={
                        props.errorText.password1.length
                            ? props.errorText.password1
                            : null
                    }
                    icon={<i className="material-icons">lock_outline</i>}
                />
                {!!props.statusText && <p>{props.statusText}</p>}
                {props.errorText.nonField.length > 0 &&
                    props.errorText.nonField.map((x, i) => <p key={i}>{x}</p>)}
                <button
                    className="btn btn-dark btn-block"
                    onClick={props.onPasswordSubmit}>
                    SUBMIT
                </button>
            </div>
        </div>
    )
}

export default class ForgotPasswordPage extends Component {
    state = {
        showEmailPage: false,
        inputValues: {
            email: '',
            password: '',
            password1: '',
        },
        errorText: {
            email: '',
            password: '',
            password1: '',
            nonField: '',
        },
        emailSent: false,
        statusText: '',
    }

    componentDidMount = () => {
        if (this.props.location.pathname.split('/').length >= 3) {
            this.setState({
                showEmailPage: true,
            })
        }
        // const state = this.props.location.state
        // if (state && state.fromLogin) {
        //     this.setState({
        //         showEmailPage: true
        //     })
        // }
    }

    onInputChange = (id, value) => {
        this.setState((prevState) => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value,
            },
        }))
    }

    onEmailSubmit = () => {
        const intiateForgotPassword = Auth.initiateForgotPassword(
            this.state.inputValues.email
        )
        intiateForgotPassword
            .then((responseData) => {
                if (responseData.status === 'success') {
                    this.setState({
                        emailSent: true,
                        errorText: {
                            email: '',
                        },
                    })
                }
            })
            .catch((responseData) => {
                this.setState({
                    errorText: {
                        email: responseData.email[0],
                    },
                })
            })
    }

    onPasswordSubmit = () => {
        const { password, password1 } = this.state.inputValues
        const resetToken = this.props.location.pathname.split('/')[2]
        const resetPassword = Auth.resetPassword(
            password,
            password1,
            resetToken
        )
        resetPassword
            .then((responseData) => {
                if (responseData.status === 'success') {
                    this.setState({
                        statusText:
                            'Password reset successful! Please login to continue',
                        errorText: {
                            password: '',
                            password1: '',
                            nonField: '',
                        },
                    })
                }
            })
            .catch((responseData) => {
                this.setState({
                    errorText: {
                        password: get(responseData, 'password', ''),
                        password1: get(responseData, 'password1', ''),
                        nonField: get(responseData, 'non_field_errors', ''),
                    },
                })
            })
    }

    render() {
        const cx = classnames(s.forgotPassword, 'forgotpassword-page')
        return (
            <div className={cx}>
                <Header invert InCenter />
                <div className="container-fluid page-layer forgotpassword-container">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-sm-12 col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        Reset your password
                                    </div>
                                    {this.state.showEmailPage ? (
                                        <EmailSection
                                            onInputChange={this.onInputChange}
                                            inputValues={this.state.inputValues}
                                            errorText={this.state.errorText}
                                            emailSent={this.state.emailSent}
                                            onEmailSubmit={this.onEmailSubmit}
                                        />
                                    ) : (
                                        <PasswordSection
                                            onInputChange={this.onInputChange}
                                            inputValues={this.state.inputValues}
                                            errorText={this.state.errorText}
                                            statusText={this.state.statusText}
                                            onPasswordSubmit={
                                                this.onPasswordSubmit
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
