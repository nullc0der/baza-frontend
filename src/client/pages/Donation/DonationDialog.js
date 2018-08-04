import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import isBoolean from 'lodash/isBoolean'
import get from 'lodash/get'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { create } from 'apisauce'

import Auth from 'utils/authHelpers'

import TextField from 'components/ui/TextField'
import Dialog from 'components/ui/Dialog'

import { PaymentBadges } from 'components/PaymentInformation'
import StripePaymentForm from 'components/StripePaymentForm'

import { CurrencyDropdown } from 'pages/Admin/CoinSale/CoinSale'

import s from './Donation.scss'
import ContactInformation from './ContactInformation'

class DonationDialog extends Component {
    state = {
        isOtherInputVisible: false,
        selectedCurrency: 'USD',
        otherInputAmount: 200,
        selectedAmount: 0,
        inputValues: {
            name: '',
            email: '',
            phoneNumber: ''
        },
        errorValues: {
            name: null,
            email: null,
            phoneNumber: null,
            amount: '',
            nonField: ''
        },
        paymentSuccess: false
    }

    toggleOtherInput = (force, amount) => {
        this.setState({
            isOtherInputVisible: isBoolean(force)
                ? force
                : !this.state.isOtherInputVisible
        })
        this.setSelectedAmount(amount)
    }

    setSelectedAmount = amount => {
        this.setState({
            selectedAmount: amount
        })
    }

    closeDonationDialog = () => {
        const { pathname, hash } = this.props.location
        this.props.navigate(pathname + (hash || '').replace('#!donate', ''))
    }

    onOtherInputBlur = e => {
        const isValueNumber = Number.isInteger(Number(e.target.value))
        if (e.target.value === '' || !isValueNumber) {
            e.target.value = 'Other'
        }
    }

    onOtherInputFocus = e => {
        if (e.target.value === 'Other') {
            e.target.value = ''
        }
    }

    updateOtherInputAmount = (id, otherInputAmount) => {
        this.setState({
            otherInputAmount: otherInputAmount,
            selectedAmount: otherInputAmount
        })
    }

    onCurrencyChange = currency => {
        this.setState({ selectedCurrency: currency.name })
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    submitDonation = token => {
        const api = create({
            baseURL:
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8000/api/v1'
                    : '/api/v1',
            headers: {
                Accept: 'application/json'
            }
        })
        let url = '/donate/anon/'
        if (Auth.isAuthenticated()) {
            api.setHeader('Authorization', `Bearer ${Auth.getToken()}`)
            url = '/donate/'
        }
        api.post(url, {
            stripe_token: token,
            amount: this.state.selectedAmount,
            name: this.state.inputValues.name,
            email: this.state.inputValues.email,
            phone_no: this.state.inputValues.phoneNumber
        }).then(response => {
            if (response.ok) {
                this.setState({
                    paymentSuccess: true
                })
            } else {
                this.setState({
                    errorValues: {
                        name: get(response.data, 'name', null),
                        email: get(response.data, 'email', null),
                        phoneNumber: get(response.data, 'phone_no', null),
                        nonField: get(response.data, 'non_field_errors', null),
                        amount: get(response.data, 'amount', null)
                    }
                })
            }
        })
    }

    render() {
        const cx = classnames(s.donationDialog, 'donation-dialog')
        const { selectedDonation } = this.props
        const { selectedAmount } = this.state
        const _dialogTitle = (
            <p className="text-center">
                We Thank You for Your
                <br /> Support!
            </p>
        )
        return (
            <Dialog
                className={cx}
                isOpen={true}
                title={_dialogTitle}
                onRequestClose={this.closeDonationDialog}>
                <div className="donate-buttons flex-horizontal">
                    <button
                        className={`btn btn-outline-dark ${
                            selectedAmount === 4 ? 'active' : ''
                        }`}
                        onClick={e => this.toggleOtherInput(false, 4)}>
                        {selectedDonation && selectedDonation.value === 'coffee'
                            ? `$${selectedDonation.price}`
                            : '$4'}
                    </button>
                    <button
                        className={`btn btn-outline-dark ${
                            selectedAmount === 7 ? 'active' : ''
                        }`}
                        onClick={e => this.toggleOtherInput(false, 7)}>
                        {selectedDonation && selectedDonation.value === 'wine'
                            ? `$${selectedDonation.price}`
                            : '$7'}
                    </button>
                    <button
                        className={`btn btn-outline-dark ${
                            selectedAmount === 27 ? 'active' : ''
                        }`}
                        onClick={e => this.toggleOtherInput(false, 27)}>
                        {selectedDonation && selectedDonation.value === 'dinner'
                            ? `$${selectedDonation.price}`
                            : '$27'}
                    </button>
                    <button
                        className={`btn btn-outline-dark ${
                            selectedAmount === 120 ? 'active' : ''
                        }`}
                        onClick={e => this.toggleOtherInput(false, 120)}>
                        {selectedDonation &&
                        selectedDonation.value === 'travel-ticket'
                            ? `$${selectedDonation.price}`
                            : '$120'}
                    </button>
                    {!this.state.isOtherInputVisible && (
                        <button
                            className="btn btn-outline-dark other-donation-button"
                            onClick={e => this.toggleOtherInput(true, 0)}>
                            Other
                        </button>
                    )}
                </div>

                {this.state.isOtherInputVisible && (
                    <div className="other-input-container">
                        <CurrencyDropdown
                            selectedCurrency={this.state.selectedCurrency}
                            onCurrencyChange={this.onCurrencyChange}
                        />
                        <div className="text-center">Enter Amount</div>
                        <TextField
                            id="amount"
                            type="number"
                            autoFocus
                            placeholder="Enter custom amount"
                            className="purchase-amount-input"
                            onChange={this.updateOtherInputAmount}
                            value={this.state.otherInputAmount}
                        />
                    </div>
                )}
                <div className="row mb-1 justify-content-center">
                    <div className="col-md-11 mt-4">
                        {this.state.errorValues.nonField && (
                            <div className="well mb-2 mt-2 error-well">
                                {this.state.errorText.nonField.map((x, i) => (
                                    <p key={i}>{x}</p>
                                ))}
                            </div>
                        )}
                        {this.state.errorValues.amount && (
                            <div className="well mb-2 mt-2 error-well">
                                <p>{this.state.errorValues.amount}</p>
                            </div>
                        )}
                        <ContactInformation
                            onInputChange={this.onInputChange}
                            values={this.state.inputValues}
                            errors={this.state.errorValues}
                        />
                        <StripeProvider apiKey="pk_test_brOdNv1xxyyZ8GiqvRF9H9ID">
                            <Elements>
                                <StripePaymentForm
                                    onTokenReceive={this.submitDonation}
                                />
                            </Elements>
                        </StripeProvider>
                        {this.state.paymentSuccess && (
                            <div className="well mb-2 mt-2 error-well text-center">
                                <p>
                                    Thank you for your support, your payment
                                    processed successfully
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <PaymentBadges />
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    location: state.router.location,
    selectedDonation: state.Common.selectedDonation
})

const mapDispatchToProps = dispatch => ({
    navigate(url) {
        return dispatch(push(url))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DonationDialog)
