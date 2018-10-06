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
            }
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
                    }
                })
            })
    }

    render() {
        return (
            <CardContent>
                <div className="settings-section">
                    <div className="password-section">
                        <TextField
                            type="password"
                            id="currentPassword"
                            label="Current Password"
                            errorState={this.state.errorValues.currentPassword}
                            value={this.state.inputValues.currentPassword}
                            onChange={this.onInputChange}
                        />
                        <p className="mt-2">
                            If you didn't set a password till now, leave this
                            field blank
                        </p>
                        <EnhancedPasswordField
                            id="newPassword1"
                            label="New Password"
                            className="mb-3"
                            errorState={this.state.errorValues.newPassword1}
                            value={this.state.inputValues.newPassword1}
                            onChange={this.onInputChange}
                            checkStrength={true}
                        />
                        <EnhancedPasswordField
                            id="newPassword2"
                            label="New Password(Again)"
                            className="mb-3"
                            errorState={this.state.errorValues.newPassword2}
                            value={this.state.inputValues.newPassword2}
                            onChange={this.onInputChange}
                        />
                        {this.state.errorValues.nonField &&
                            this.state.errorValues.nonField.map((x, i) => (
                                <p key={i} className="text-danger">
                                    {x}
                                </p>
                            ))}
                        <p className="text-success">
                            {this.state.passwordChangeSuccessText}
                        </p>
                        <button
                            className="btn btn-block btn-dark btn-sm"
                            onClick={this.onClickChange}>
                            Change
                        </button>
                    </div>
                </div>
            </CardContent>
        )
    }
}
