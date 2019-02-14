import React, { Component, Fragment } from 'react'
import FileSaver from 'file-saver'
import Qrcode from 'qrcode.react'
import get from 'lodash/get'

import {
    getTwoFactorStatus,
    getTwoFactorRecoveryCodes,
    getProvisioningUri,
    verifyTwoFactor,
    disableTwoFactor
} from 'api/user'

import { CardContent } from 'components/ui/CardWithTabs'
import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'
import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'
import s from '../MemberProfile.scss'

export default class TwoFactor extends Component {
    state = {
        twoFactorEnableDialogIsOpen: false,
        twoFactorDisableDialogIsOpen: false,
        twoFactorEnabled: false,
        error: null,
        otp: '',
        password: '',
        passwordError: null,
        provisioningUri: '',
        hasUsablePassword: false
    }

    componentDidMount() {
        getTwoFactorStatus()
            .then(res => {
                this.setState({
                    twoFactorEnabled: get(
                        res.data,
                        'two_factor_enabled',
                        false
                    ),
                    hasUsablePassword: get(
                        res.data,
                        'has_usable_password',
                        false
                    )
                })
            })
            .catch(res => {})
    }

    onClickVerifyTwoFactor = () => {
        const toggleTwoFactorEnableDialog = this.toggleTwoFactorEnableDialog
        verifyTwoFactor(this.state.otp)
            .then(res => {
                this.setState(
                    {
                        twoFactorEnabled: get(
                            res.data,
                            'two_factor_enabled',
                            false
                        ),
                        otp: '',
                        error: null
                    },
                    () => {
                        if (get(res.data, 'two_factor_enabled', false)) {
                            toggleTwoFactorEnableDialog()
                        }
                    }
                )
            })
            .catch(res => {
                this.setState({
                    error: get(res, 'error', null)
                })
            })
    }

    onClickDisableTwoFactor = () => {
        const toggleTwoFactorDisableDialog = this.toggleTwoFactorDisableDialog
        disableTwoFactor(this.state.password)
            .then(res => {
                this.setState(
                    {
                        twoFactorEnabled: get(
                            res.data,
                            'two_factor_enabled',
                            false
                        ),
                        password: '',
                        passwordError: null
                    },
                    () => toggleTwoFactorDisableDialog()
                )
            })
            .catch(res => {
                if (!res.password_valid) {
                    this.setState({
                        passwordError: 'Invalid password'
                    })
                }
            })
    }

    toggleTwoFactorEnableDialog = () => {
        this.setState({
            twoFactorEnableDialogIsOpen: !this.state.twoFactorEnableDialogIsOpen
        })
        if (this.state.hasUsablePassword) {
            getProvisioningUri().then(res => {
                this.setState({
                    provisioningUri: get(res.data, 'provisioning_uri', '')
                })
            })
        }
    }

    toggleTwoFactorDisableDialog = () => {
        this.setState({
            twoFactorDisableDialogIsOpen: !this.state
                .twoFactorDisableDialogIsOpen
        })
    }

    onTwoFactorCodeChange = (id, value) => {
        this.setState({
            otp: value
        })
    }

    onPasswordChange = (id, value) => {
        this.setState({
            password: value
        })
    }

    onClickGetRecoveryCodes = () => {
        getTwoFactorRecoveryCodes()
            .then(res => {
                const blob = new Blob([res.data], {
                    type: 'text/plain;charset=utf-8'
                })
                FileSaver.saveAs(blob, 'recovery-codes.txt')
            })
            .catch(err => {})
    }

    render() {
        return (
            <CardContent>
                <div className="settings-section">
                    <div className="two-factor-section">
                        {!this.state.twoFactorEnabled ? (
                            <Fragment>
                                <p className="status">
                                    Two factor is
                                    <span className="text-danger">
                                        {' '}
                                        disabled
                                    </span>
                                </p>
                                <button
                                    className="btn btn-block btn-sm btn-dark"
                                    onClick={this.toggleTwoFactorEnableDialog}>
                                    Click here to enable
                                </button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p className="status">
                                    Two factor is
                                    <span className="text-success">
                                        {' '}
                                        enabled
                                    </span>
                                </p>
                                <button
                                    className="btn btn-block btn-sm btn-dark"
                                    onClick={this.onClickGetRecoveryCodes}>
                                    Click here to download recovery codes
                                </button>
                                <button
                                    className="btn btn-block btn-sm btn-dark"
                                    onClick={this.toggleTwoFactorDisableDialog}>
                                    Click here to disable
                                </button>
                            </Fragment>
                        )}
                        <Dialog
                            className={s.container}
                            isOpen={this.state.twoFactorEnableDialogIsOpen}
                            title="Enable Two Factor"
                            onRequestClose={this.toggleTwoFactorEnableDialog}>
                            {this.state.hasUsablePassword ? (
                                <div className="text-center">
                                    <p>
                                        Scan this QR code with your
                                        authenticator
                                    </p>
                                    {this.state.provisioningUri && (
                                        <Qrcode
                                            value={this.state.provisioningUri}
                                            size={200}
                                        />
                                    )}
                                    <p className="mt-3">
                                        Then type your code below and click
                                        submit
                                    </p>
                                    <div className="ml-3 mr-3">
                                        <TextField
                                            id="twoFactorCode"
                                            label="Code"
                                            className={`${
                                                this.state.error
                                                    ? 'mb-3'
                                                    : 'mb-1'
                                            }`}
                                            onChange={
                                                this.onTwoFactorCodeChange
                                            }
                                            value={this.state.otp}
                                            errorState={this.state.error}
                                        />
                                        <button
                                            className="btn btn-block btn-sm btn-dark"
                                            onClick={
                                                this.onClickVerifyTwoFactor
                                            }>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <span>
                                        You have not set a password yet.
                                    </span>
                                    <br />
                                    <span>
                                        Please set a password before enabling
                                        two factor authentication.
                                    </span>
                                </div>
                            )}
                        </Dialog>
                        <Dialog
                            className={s.container}
                            isOpen={this.state.twoFactorDisableDialogIsOpen}
                            title="Disable Two Factor"
                            onRequestClose={this.toggleTwoFactorDisableDialog}>
                            <div className="text-center">
                                <p className="mt-3">
                                    Type your password to disable two factor
                                </p>
                                <div className="ml-3 mr-3">
                                    <EnhancedPasswordField
                                        id="password"
                                        label="Password"
                                        className={`${
                                            this.state.passwordError
                                                ? 'mb-3'
                                                : 'mb-1'
                                        }`}
                                        errorState={this.state.passwordError}
                                        onChange={this.onPasswordChange}
                                        value={this.state.password}
                                    />
                                    <button
                                        className="btn btn-block btn-sm btn-dark"
                                        onClick={this.onClickDisableTwoFactor}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        )
    }
}
