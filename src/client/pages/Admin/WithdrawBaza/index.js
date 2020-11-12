import React from 'react'
import classnames from 'classnames'
import get from 'lodash/get'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { withdrawBaza } from 'api/wallet-accounts'

import { actions as walletAccountsActions } from 'store/WalletAccounts'

import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'
import Dialog from 'components/ui/Dialog'

import s from './WithdrawBaza.scss'

class WithdrawBazaDialog extends React.Component {
    state = {
        inputValues: {
            password: '',
        },
        errorState: {
            password: null,
            nonField: [],
        },
        confirmClicked: false,
        txHash: '',
    }

    closeWithdrawBazaDialog = () => {
        const { pathname, hash } = this.props.location
        this.props.navigate(
            pathname + (hash || '').replace('#!withdraw-baza', '')
        )
    }

    onInputChange = (id, value) => {
        this.setState((prevState) => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value,
            },
        }))
    }

    onClickConfirm = () => {
        this.setState({ confirmClicked: true })
        withdrawBaza(this.state.inputValues.password)
            .then((response) => {
                this.setState(
                    {
                        confirmClicked: false,
                        txHash: response.data.transaction_hash,
                    },
                    () => this.props.clearProxcBalance()
                )
            })
            .catch((responseData) => {
                this.setState({
                    confirmClicked: false,
                    errorState: {
                        nonField: get(responseData, 'non_field_errors', [
                            'There is some issue processing your withdrawal at this moment, please try later',
                        ]),
                    },
                })
            })
    }

    render() {
        const cx = classnames(s.container)
        const { withdrawBazaInfo } = this.props
        const { inputValues, errorState, txHash, confirmClicked } = this.state

        return (
            <Dialog
                isOpen={true}
                className={cx}
                onRequestClose={this.closeWithdrawBazaDialog}>
                {withdrawBazaInfo.has_baza_web_wallet ? (
                    !txHash ? (
                        <>
                            <h6>
                                You are about to transfer your $BAZA balance of{' '}
                                {withdrawBazaInfo.balance} to your default
                                online wallet.
                            </h6>
                            <EnhancedPasswordField
                                id="password"
                                label="Type your account password"
                                className="my-3"
                                value={inputValues.password}
                                errorState={errorState.password}
                                onChange={this.onInputChange}
                                icon={
                                    <i className="material-icons">
                                        lock_outline
                                    </i>
                                }
                            />
                            {!!errorState.nonField.length && (
                                <div className="alert alert-danger">
                                    {errorState.nonField.map((x, i) => (
                                        <p className="m-0" key={i}>
                                            {x}
                                        </p>
                                    ))}
                                </div>
                            )}
                            <button
                                className="btn btn-dark btn-block"
                                onClick={this.onClickConfirm}
                                disabled={confirmClicked}>
                                Confirm
                            </button>
                        </>
                    ) : (
                        <h6 className="tx-hash">
                            Baza sent successfully!! Here is the transaction
                            hash {txHash}
                        </h6>
                    )
                ) : (
                    <h6>
                        It seems you don't have a web wallet, please go to{' '}
                        <Link to="/wallets">Wallets</Link> page and create one
                        first
                    </h6>
                )}
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.router.location,
    withdrawBazaInfo: state.WalletAccounts.withdrawBazaInfo,
})

const mapDispatchToProps = (dispatch) => ({
    navigate(url) {
        return dispatch(push(url))
    },
    clearProxcBalance: () =>
        dispatch(walletAccountsActions.clearProxcBalance()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawBazaDialog)
