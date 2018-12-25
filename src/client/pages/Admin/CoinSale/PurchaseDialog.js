import React, { Component } from 'react'
import Dialog from 'components/ui/Dialog'
import { create } from 'apisauce'
// import get from 'lodash/get'

// import last from 'lodash/last'

import Auth from 'utils/authHelpers'

import TextField from 'components/ui/TextField'

import CoinbaseButton from 'components/CoinbaseButton'

import { CurrencyDropdown } from './CoinSale'
// import { CONVERSION_TABLE } from './data'

import s from './CoinSale.scss'
import Config from 'utils/config'

export default class PurchaseDialog extends Component {
    state = {
        purchaseAmount: '1',
        conversion: 0,
        perDollarCost: 0,
        purchaseAmountError: null,
        nonFieldErrors: null,
        coinPurchaseDone: '',
        isPurchaseDialogContentHidden: false
    }

    componentDidMount = () => {
        if (Auth.isAuthenticated()) {
            const api = create({
                baseURL: Config.get('API_ROOT'),
                headers: {
                    Accept: 'application/json'
                }
            })
            api.setHeader('Authorization', `Bearer ${Auth.getToken()}`)
            api.get('/purchasecoin/coinvalue/', {
                coin_name: 'proxcdb'
            }).then(response => {
                if (response.ok) {
                    this.setState({
                        conversion: parseFloat(response.data),
                        perDollarCost: response.data
                    })
                }
            })
        }
    }

    updatePurchaseAmount = (id, purchaseAmount) => {
        purchaseAmount = purchaseAmount || 0
        const conversion = this.convertAmountToBAZ(purchaseAmount)
        this.setState({ purchaseAmount, conversion })
    }

    convertAmountToBAZ = str => {
        const amount = (str + '').replace(/\D/g, '') || 0
        // // const unit = last((str + '').split(' '))
        // const unit = this.props.selectedCurrency.toLowerCase()
        // const multiplier = CONVERSION_TABLE[unit]
        // return multiplier ? amount * multiplier : 0
        return this.state.perDollarCost * amount
    }

    onCurrencySelect = currency => {
        this.setState({
            conversion: this.state.purchaseAmount * this.state.perDollarCost
        })
        this.props.onCurrencySelect(currency)
    }

    onChargeSuccess = () => {
        this.setState({
            coinPurchaseDone:
                'Thank you for funding the Foundation, your token reward will be updated to your online wallet soon.'
        })
    }

    onChargeFailure = () => {
        this.setState({
            coinPurchaseDone:
                "Your payment couldn't be processed, please try again"
        })
    }

    onPaymentDetected = () => {
        this.setState({
            coinPurchaseDone: `A payment has been detected, but it is not confirmed yet,
                you will get an email on confirm and your reward will be updated to your online wallet`
        })
    }

    onCoinbaseLoad = () => {
        this.setState({
            isPurchaseDialogContentHidden: true
        })
    }

    render() {
        return Auth.isAuthenticated() ? (
            <Dialog
                className={s.purchaseDialog}
                title="Donate to Fundraiser"
                isOpen={this.props.isOpen}
                // footer="Contact your credit card holder about Baza Foundation donation and limits to avoid any bank issues"
                onRequestClose={this.props.onRequestClose}
                hideModalContent={this.state.isPurchaseDialogContentHidden}>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.nonFieldErrors && (
                            <div className="well mb-2 mt-2 error-well">
                                {this.state.nonFieldErrors.map((x, i) => (
                                    <p key={i}>{x}</p>
                                ))}
                            </div>
                        )}
                        <CurrencyDropdown
                            selectedCurrency={this.props.selectedCurrency}
                            onCurrencySelect={this.onCurrencySelect}
                        />
                        <div className="text-center">Enter Amount</div>
                        <TextField
                            id="price"
                            className="purchase-amount-input"
                            onChange={this.updatePurchaseAmount}
                            value={this.state.purchaseAmount}
                            errorState={this.state.purchaseAmountError}
                        />
                        <div className="baz-conversion well p-2 mt-3">
                            {this.state.conversion}{' '}
                            <span className="baz-unit">BAZ</span>
                        </div>
                        {this.state.coinPurchaseDone.length > 0 && (
                            <div className="well mt-2 error-well text-center">
                                <p className="mb-0">
                                    {this.state.coinPurchaseDone}
                                </p>
                            </div>
                        )}
                        <CoinbaseButton
                            className="mt-3"
                            amount={Number(this.state.purchaseAmount)}
                            onChargeSuccess={this.onChargeSuccess}
                            onChargeFailure={this.onChargeFailure}
                            onPaymentDetected={this.onPaymentDetected}
                            onCoinbaseLoad={this.onCoinbaseLoad}
                            onChargeIDChange={this.props.onChargeIDChange}
                        />
                    </div>
                </div>
            </Dialog>
        ) : (
            <Dialog
                className={s.notAuthenticatedDialog}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}>
                <div className="row">
                    <div className="col-md-12 text-center">
                        You need to be logged in first to participate in a
                        fundraiser.
                    </div>
                </div>
            </Dialog>
        )
    }
}
