import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import SwipeableViews from 'react-swipeable-views'

import Dialog from 'components/ui/Dialog'
import Tabs from 'components/ui/Tabs'

import { sendUserWebWalletTx } from 'api/userwebwallet'

import { actions as userWebWalletAction } from 'store/UserWebWallet'
import { actions as commonActions } from 'store/Common'

import ReceivePayment from './ReceivePayment'
import SendPayment from './SendPayment'

import s from './PaymentDialog.scss'
import get from 'lodash/get'

const calcTotal = (amount, txfee) => {
    return parseFloat(amount) + parseFloat(txfee) / 1000000
}

class PaymentsDialog extends Component {
    state = {
        selectedTab: 0,
        inputValues: {
            amount: '',
            destAddress: '',
        },
        inputError: {
            amount: null,
            destAddress: null,
            nonField: null,
        },
        txHash: null,
        txfee: 1000,
    }

    componentDidMount = () => {
        if (this.props.selectedTab) {
            this.setState({ selectedTab: this.props.selectedTab })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selectedTab) {
            this.setState({ selectedTab: nextProps.selectedTab })
        }
    }

    switchTab = (tab, selectedTab) => {
        this.setState({ selectedTab })
    }

    switchSwipeTab = (selectedTab) => {
        this.setState({ selectedTab })
    }

    onSendSubmitClick = () => {
        const { selectedWebWallet } = this.props
        sendUserWebWalletTx({
            source_address: selectedWebWallet.address,
            destination_address: this.state.inputValues.destAddress,
            amount: this.state.inputValues.amount * 1000000,
        })
            .then((response) => {
                this.setState({
                    txHash: get(response.data, 'transaction_hash', null),
                    inputValues: {
                        amount: '',
                        destAddress: '',
                    },
                })
            })
            .catch((responseData) => {
                this.setState({
                    inputError: {
                        amount: get(responseData, 'amount', null),
                        destAddress: get(
                            responseData,
                            'destination_address',
                            null
                        ),
                        nonField: get(responseData, 'non_field_errors', null),
                    },
                })
            })
    }

    onInputChange = (id, value) => {
        this.setState((prevState) => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value,
            },
        }))
    }

    cleanupAndCloseDialog = () => {
        this.setState(
            {
                selectedTab: 0,
                inputValues: {
                    amount: '',
                    destAddress: '',
                },
                inputError: {
                    amount: null,
                    destAddress: null,
                    nonField: null,
                },
                txHash: null,
                txfee: 1000,
            },
            () => this.props.onRequestClose()
        )
    }

    render() {
        const cx = classnames(s.container, 'payments-dialog')

        const tabsList = [{ label: 'SEND' }, { label: 'RECEIVE' }]

        return (
            <Dialog
                isOpen={this.props.isOpen}
                onRequestClose={this.cleanupAndCloseDialog}
                className={cx}
                showClose={false}>
                <Tabs
                    className="payment-tabs"
                    selectedIndex={this.state.selectedTab}
                    tabs={tabsList}
                    onTabClick={this.switchTab}
                />
                <SwipeableViews
                    index={this.state.selectedTab}
                    onChange={this.switchSwipeTab}>
                    <SendPayment
                        onSendSubmitClick={this.onSendSubmitClick}
                        hasPaymentSendError={this.props.hasPaymentSendError}
                        inputValues={this.state.inputValues}
                        onInputChange={this.onInputChange}
                        inputError={this.state.inputError}
                        txfee={this.state.txfee}
                        txHash={this.state.txHash}
                        totalAmount={calcTotal(
                            parseFloat(this.state.inputValues.amount) ||
                                0 * 1000000,
                            this.state.txfee
                        )}
                    />
                    <ReceivePayment
                        wallet={this.props.selectedWebWallet}
                        addNotification={this.props.addNotification}
                        onRequestClose={this.cleanupAndCloseDialog}
                    />
                </SwipeableViews>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedWebWallet: state.UserWebWallet.selectedWebWallet,
})

const mapDispatchToProps = (dispatch) => ({
    addNotification(notification) {
        return dispatch(commonActions.addNotification(notification))
    },
    getWebWalletsDetails(walletId) {
        return dispatch(userWebWalletAction.getWebWalletsDetails(walletId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsDialog)
