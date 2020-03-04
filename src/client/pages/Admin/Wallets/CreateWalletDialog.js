import React, { Component } from 'react'
import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'
import classnames from 'classnames'
import get from 'lodash/get'
import { connect } from 'react-redux'

import { createUserWebWallet } from 'api/userwebwallet'

import { actions as userWebWalletActions } from 'store/UserWebWallet'

import s from './Wallets.scss'

class CreateWalletDialog extends Component {
    state = {
        inputValues: {
            walletName: '',
            isDefaultWallet: false
        },
        errorText: {
            walletName: null,
            isDefaultWallet: null,
            nonField: null
        },
        walletIsCreating: false,
        walletCreateSuccessful: false,
        walletData: {}
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onCheckBoxChange = e => {
        const value = e.target.value
        this.onInputChange('isDefaultWallet', value)
    }

    onClickCreate = () => {
        const { getWebWallets } = this.props
        const data = {
            name: this.state.inputValues.walletName,
            is_default: this.state.inputValues.isDefaultWallet
        }
        this.setState({
            walletIsCreating: true
        })
        createUserWebWallet(data)
            .then(response =>
                this.setState(
                    {
                        walletIsCreating: false,
                        walletCreateSuccessful: true,
                        walletData: response.data
                    },
                    () => getWebWallets()
                )
            )
            .catch(responseData =>
                this.setState({
                    walletIsCreating: false,
                    errorText: {
                        walletName: get(responseData, 'name', null),
                        isDefaultWallet: get(responseData, 'is_default', null),
                        nonField: get(responseData, 'non_field_errors', null)
                    }
                })
            )
    }

    render() {
        const cx = classnames(s.createWalletDialog)
        const { isOpen, onRequestClose } = this.props
        return (
            <Dialog
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className={cx}>
                {!this.state.walletCreateSuccessful ? (
                    <div className="input-section">
                        <TextField
                            id="walletName"
                            label="Wallet Name"
                            className="mb-3"
                            errorState={this.state.errorText.walletName}
                            onChange={this.onInputChange}
                            value={this.state.inputValues.walletName}
                        />
                        <div className="default-check-wrapper mb-2">
                            <input
                                type="checkbox"
                                id="isDefaultWallet"
                                onChange={this.onCheckBoxChange}
                                value={this.state.inputValues.isDefaultWallet}
                            />
                            <label className="ml-1">
                                Make this my default wallet
                            </label>
                            {!!this.state.errorText.isDefaultWallet && (
                                <span className="text-danger">
                                    {this.state.errorText.isDefaultWallet}
                                </span>
                            )}
                        </div>
                        {!!this.state.errorText.nonField && (
                            <div className="alert alert-danger">
                                {this.state.errorText.nonField}
                            </div>
                        )}
                        <button
                            className="btn btn-dark btn-block"
                            onClick={this.onClickCreate}
                            disabled={this.state.walletIsCreating}>
                            {!this.state.walletIsCreating
                                ? 'Create Wallet'
                                : 'Wallet creation in progress..'}
                        </button>
                    </div>
                ) : (
                    <div className="info-section">
                        <p>
                            The wallet {this.state.walletData.name} created
                            successfully
                        </p>{' '}
                        <p>
                            Please copy following data and keep it somewhere
                            safe
                        </p>
                        <div className="well">
                            <p>
                                Wallet Address: {this.state.walletData.address}
                            </p>
                            <p>
                                Private Spend Key:{' '}
                                {this.state.walletData.privateSpendKey}
                            </p>
                            <p>
                                Public Spend Key:{' '}
                                {this.state.walletData.publicSpendKey}
                            </p>
                        </div>
                    </div>
                )}
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    getWebWallets: () => dispatch(userWebWalletActions.getWebWallets())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletDialog)
