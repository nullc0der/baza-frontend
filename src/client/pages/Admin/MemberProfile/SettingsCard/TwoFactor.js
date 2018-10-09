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
import s from '../MemberProfile.scss'

export default class TwoFactor extends Component {
    state = {
        twoFactorEnableDialogIsOpen: false,
        twoFactorEnabled: false,
        error: null,
        otp: '',
        provisioningUri: ''
    }

    componentDidMount() {
        getTwoFactorStatus()
            .then(res => {
                this.setState({
                    twoFactorEnabled: get(res.data, 'two_factor_enabled', false)
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
                        )
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
        disableTwoFactor()
            .then(res => {
                this.setState({
                    twoFactorEnabled: get(res.data, 'two_factor_enabled', false)
                })
            })
            .catch(res => {})
    }

    toggleTwoFactorEnableDialog = () => {
        this.setState({
            twoFactorEnableDialogIsOpen: !this.state.twoFactorEnableDialogIsOpen
        })
        getProvisioningUri().then(res => {
            this.setState({
                provisioningUri: get(res.data, 'provisioning_uri', '')
            })
        })
    }

    onTwoFactorCodeChange = (id, value) => {
        this.setState({
            otp: value
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
        // const recoveryCodeUrl =
        //     process.env.NODE_ENV === 'development'
        //         ? 'http://localhost:8000/api/v1/profile/twofactor/?type=getcodes'
        //         : '/api/v1/profile/twofactor/?type=getcodes'
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
                                    onClick={this.onClickDisableTwoFactor}>
                                    Click here to disable
                                </button>
                            </Fragment>
                        )}
                        <Dialog
                            className={s.container}
                            isOpen={this.state.twoFactorEnableDialogIsOpen}
                            title="Enable Two Factor"
                            onRequestClose={this.toggleTwoFactorEnableDialog}>
                            <div className="text-center">
                                <p>Scan this QR code with your authenticator</p>
                                {this.state.provisioningUri && (
                                    <Qrcode
                                        value={this.state.provisioningUri}
                                        size={200}
                                    />
                                )}
                                <p className="mt-3">
                                    Then type your code below and click submit
                                </p>
                                <div className="ml-3 mr-3">
                                    <TextField
                                        id="twoFactorCode"
                                        label="Code"
                                        className={`${
                                            this.state.error ? 'mb-3' : 'mb-1'
                                        }`}
                                        onChange={this.onTwoFactorCodeChange}
                                        value={this.state.otp}
                                        errorState={this.state.error}
                                    />
                                    <button
                                        className="btn btn-block btn-sm btn-dark"
                                        onClick={this.onClickVerifyTwoFactor}>
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
