import React, { Component } from 'react'
import get from 'lodash/get'

import Auth from 'utils/authHelpers'
import { setUserPassword } from 'api/user'

import { CardContent } from 'components/ui/CardWithTabs'
import TextField from 'components/ui/TextField'
import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'

export default class SubscribedGroups extends Component {
    state = {
        inputValues: {
            currentPassword: '',
            newPassword1: '',
            newPassword2: ''
        },
        errorValues: {
            currentPassword: null,
            newPassword1: null,
            newPassword2: null,
            nonField: null
        },
        passwordChangeSuccessText: ''
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            },
            passwordChangeSuccessText: ''
        }))
    }

    clearInputsAndErrors = () => {
        this.setState({
            inputValues: {
                currentPassword: '',
                newPassword1: '',
                newPassword2: ''
            },
            errorValues: {
                currentPassword: null,
                newPassword1: null,
                newPassword2: null,
                nonField: null
            }
        })
    }

    onClickChange = () => {
        setUserPassword({
            access_token: Auth.getToken(),
            current_password: this.state.inputValues.currentPassword,
            new_password_1: this.state.inputValues.newPassword1,
            new_password_2: this.state.inputValues.newPassword2
        })
            .then(res => {
                this.setState(
                    {
                        passwordChangeSuccessText:
                            'Password changed successfully'
                    },
                    () => this.clearInputsAndErrors()
                )
            })
            .catch(err => {
                this.setState({
                    errorValues: {
                        currentPassword: get(err, 'current_password', null),
                        newPassword1: get(err, 'new_password_1', null),
                        newPassword2: get(err, 'new_password_2', null),
                        nonField: get(err, 'non_field_errors', null)
                    },
                    passwordChangeSuccessText: ''
                })
            })
    }

    render() {
        return (
            <CardContent>
                <div className="settings-section">
                    <div className="section-title">
                        <span className="mr-2">CURRENT PASSWORD</span>
                        <span className="badge badge-pill badge-light ml-0">
                            If no password set till now, leave it blank
                        </span>
                    </div>
                    <div className="password-section">
                        <TextField
                            type="password"
                            id="currentPassword"
                            label="Enter Password"
                            errorState={this.state.errorValues.currentPassword}
                            value={this.state.inputValues.currentPassword}
                            onChange={this.onInputChange}
                        />
                        <div className="section-title mt-3">NEW PASSWORD</div>
                        <EnhancedPasswordField
                            id="newPassword1"
                            label="Enter New Password"
                            className="mb-1"
                            errorState={this.state.errorValues.newPassword1}
                            value={this.state.inputValues.newPassword1}
                            onChange={this.onInputChange}
                            checkStrength={true}
                            showStrength={
                                this.state.inputValues.newPassword1.length > 0
                            }
                        />
                        <EnhancedPasswordField
                            id="newPassword2"
                            label="Enter New Password(Again)"
                            className="mb-2"
                            errorState={this.state.errorValues.newPassword2}
                            value={this.state.inputValues.newPassword2}
                            onChange={this.onInputChange}
                        />
                        <div className="password-change-info">
                            {this.state.errorValues.nonField &&
                                this.state.errorValues.nonField.map((x, i) => (
                                    <p key={i} className="text-danger">
                                        {x}
                                    </p>
                                ))}
                            <p className="text-success">
                                {this.state.passwordChangeSuccessText}
                            </p>
                        </div>
                        <div className="text-right">
                            <button
                                className="btn btn-change-password btn-dark btn-sm"
                                onClick={this.onClickChange}>
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        )
    }
}
