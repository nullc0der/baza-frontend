import React, { Component } from 'react'
import Dialog from 'components/ui/Dialog'
import { create } from 'apisauce'
import { Elements, StripeProvider } from 'react-stripe-elements'
import get from 'lodash/get'

// import last from 'lodash/last'

import Auth from 'utils/authHelpers'

import TextField from 'components/ui/TextField'
import { PaymentBadges } from 'components/PaymentInformation'
import StripePaymentForm from 'components/StripePaymentForm'

import { CurrencyDropdown } from './CoinSale'
// import { CONVERSION_TABLE } from './data'

import s from './CoinSale.scss'

export default class PurchaseDialog extends Component {
    state = {
        purchaseAmount: '1',
        conversion: 0,
        perDollarCost: 0,
        purchaseAmountError: null,
        nonFieldErrors: null,
        coinPurchaseDone: false,
        paymentProcessing: false
    }

    componentDidMount = () => {
        if (Auth.isAuthenticated()) {
            const api = create({
                baseURL:
                    process.env.NODE_ENV === 'development'
                        ? 'http://localhost:8000/api/v1'
                        : '/api/v1',
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
                        conversion: response.data,
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

    purchaseCoin = token => {
        this.setState({
            paymentProcessing: true
        })
        const api = create({
            baseURL:
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8000/api/v1'
                    : '/api/v1',
            headers: {
                Accept: 'application/json'
            }
        })
        api.setHeader('Authorization', `Bearer ${Auth.getToken()}`)
        api.post('/purchasecoin/', {
            price: this.state.purchaseAmount,
            currency: this.props.selectedCurrency,
            stripe_token: token,
            coin_name: 'proxcdb'
        }).then(response => {
            if (response.ok) {
                this.setState({
                    coinPurchaseDone: true
                })
            } else {
                this.setState({
                    purchaseAmountError: get(response.data, 'price', null),
                    nonFieldErrors: get(response.data, 'non_field_errors', null)
                })
            }
            this.setState({
                paymentProcessing: false
            })
        })
    }

    // getSubmitButton = device => {
    //     const cx = classnames('mt-3 mb-2 button-purchase-wrap', {
    //         'd-none d-md-block d-lg-block d-xl-block': device === 'desktop',
    //         'd-md-none d-lg-none d-xl-none': device === 'mobile'
    //     })
    //     return (
    //         <div className={cx}>
    //             <button className="btn btn-dark btn-block">
    //                 <span>PURCHASE</span>
    //                 <i className="material-icons">arrow_forward</i>
    //             </button>
    //             <div className="form-check form-check-inline mt-2 mb-2">
    //                 <input
    //                     className="form-check-input"
    //                     type="checkbox"
    //                     id="add_to_newsletter"
    //                     value="add_to_newsletter"
    //                 />
    //                 <label
    //                     className="form-check-label"
    //                     htmlFor="add_to_newsletter">
    //                     Yes! Add me to your newsletter list
    //                 </label>
    //             </div>
    //         </div>
    //     )
    // }

    render() {
        return Auth.isAuthenticated() ? (
            <Dialog
                className={s.purchaseDialog}
                title="Purchase BAZ Coins"
                isOpen={this.props.isOpen}
                footer="Contact your credit card holder about Baza Foundation purchase and limits to avoid any bank issues"
                onRequestClose={this.props.onRequestClose}>
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
                        <StripeProvider apiKey="pk_test_brOdNv1xxyyZ8GiqvRF9H9ID">
                            <Elements>
                                <StripePaymentForm
                                    onTokenReceive={this.purchaseCoin}
                                    className="mt-3"
                                    paymentProcessing={
                                        this.state.paymentProcessing
                                    }
                                />
                            </Elements>
                        </StripeProvider>
                        {this.state.coinPurchaseDone && (
                            <div className="well mb-2 mt-2 error-well text-center">
                                <p>
                                    Thank you for purchasing baza, your wallet
                                    will be updated soon
                                </p>
                            </div>
                        )}
                        {/* {this.getSubmitButton('desktop')} */}
                    </div>
                    {/* <div className="col-md-7 mt-2 mt-md-0 mt-lg-0 mt-xl-0">
                        <PaymentInformation />
                    </div> */}
                </div>
                {/* {this.getSubmitButton('mobile')} */}
                <PaymentBadges />
            </Dialog>
        ) : (
            <Dialog
                className={s.purchaseDialog}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}>
                <div className="row">
                    <div className="col-md-12 text-center">
                        You need to be logged in first to purchase coin.
                    </div>
                </div>
            </Dialog>
        )
    }
}
