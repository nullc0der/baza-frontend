import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import isBoolean from 'lodash/isBoolean'
import get from 'lodash/get'

import Auth from 'utils/authHelpers'

import TextField from 'components/ui/TextField'
import Dialog from 'components/ui/Dialog'

import CoinbaseButton from 'components/CoinbaseButton'

import { CurrencyDropdown } from 'pages/Admin/CoinSale/CoinSale'

import s from './Donation.scss'
import ContactInformation from './ContactInformation'

class DonationDialog extends Component {
    state = {
        isOtherInputVisible: false,
        selectedCurrency: 'USD',
        otherInputAmount: 200,
        selectedAmount: 27,
        isAnonymous: false,
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
        donationDone: '',
        isDonateDialogContentHidden: false
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
        if (id === 'name') {
            const values = value.split(' ')
            const newValues = values.map(x => {
                if (x.length) {
                    let letters = x.split('')
                    letters[0] = letters[0].toUpperCase()
                    return letters.join('')
                }
                return x
            })
            value = newValues.join(' ')
        }
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onChargeSuccess = () => {
        this.setState({
            donationDone: 'Thank you for donating to the Foundation'
        })
    }

    onChargeFailure = () => {
        this.setState({
            donationDone: "Your payment couldn't be processed, please try again"
        })
    }

    onPaymentDetected = () => {
        this.setState({
            donationDone: `A payment has been detected, but it is not confirmed yet,
                you will get an email on confirm.`
        })
    }

    onCoinbaseLoad = () => {
        this.setState({
            isDonateDialogContentHidden: true
        })
    }

    onCoinbaseClosed = () => {
        this.setState({
            isDonateDialogContentHidden: false
        })
    }

    onInitiatePaymentSuccess = data => {}

    onInitiatePaymentFailure = err => {
        this.setState({
            errorValues: {
                name: get(err, 'name', null),
                email: get(err, 'email', null),
                phoneNumber: get(err, 'phone_no', null),
                nonField: get(err, 'non_field_errors', null),
                amount: get(err, 'amount', null)
            }
        })
    }

    handleIsAnonymousChange = () => {
        this.setState({
            isAnonymous: !this.state.isAnonymous
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
        const initiatePaymentURL = Auth.isAuthenticated()
            ? '/donate/initiate/'
            : '/donate/initiate/anon/'
        // return (
        //     <Dialog
        //         className={cx}
        //         isOpen={true}
        //         title={_dialogTitle}
        //         onRequestClose={this.closeDonationDialog}>
        //         <p>
        //             Donation is disabled for sometime, we will send a
        //             notification once it is enabled
        //         </p>
        //     </Dialog>
        // )
        return (
            <Dialog
                className={cx}
                isOpen={true}
                title={_dialogTitle}
                onRequestClose={this.closeDonationDialog}
                hideModalContent={this.state.isDonateDialogContentHidden}>
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
                    <div className="col-md-12">
                        {this.state.errorValues.nonField && (
                            <div className="well mt-2 error-well">
                                {this.state.errorValues.nonField.map((x, i) => (
                                    <p key={i}>{x}</p>
                                ))}
                            </div>
                        )}
                        {this.state.errorValues.amount && (
                            <div className="well mb-2 mt-2 error-well">
                                <p>{this.state.errorValues.amount}</p>
                            </div>
                        )}
                        <div className="row mb-1">
                            <div className="col-md-12 mt-4">
                                {!Auth.isAuthenticated() && (
                                    <ContactInformation
                                        onInputChange={this.onInputChange}
                                        values={this.state.inputValues}
                                        errors={this.state.errorValues}
                                    />
                                )}
                                <input
                                    name="is_anonymous_checkbox"
                                    type="checkbox"
                                    checked={this.state.isAnonymous}
                                    onChange={this.handleIsAnonymousChange}
                                    className="mr-1"
                                />
                                <label
                                    htmlFor="is_anonymous_checkbox"
                                    className="mb-0">
                                    {' '}
                                    Donate Anonymously
                                </label>
                                {this.state.donationDone.length > 0 && (
                                    <div className="well mt-2 error-well text-center">
                                        <p className="mb-0">
                                            {this.state.coinPurchaseDone}
                                        </p>
                                    </div>
                                )}
                                <CoinbaseButton
                                    className="mt-3"
                                    title="Donate with CoinBase"
                                    data={{
                                        amount: Number(
                                            this.state.selectedAmount
                                        ),
                                        name: this.state.inputValues.name,
                                        email: this.state.inputValues.email,
                                        phone_no: this.state.inputValues
                                            .phoneNumber,
                                        is_anonymous: this.state.isAnonymous
                                    }}
                                    initiatePaymentURL={initiatePaymentURL}
                                    onChargeSuccess={this.onChargeSuccess}
                                    onChargeFailure={this.onChargeFailure}
                                    onPaymentDetected={this.onPaymentDetected}
                                    onCoinbaseLoad={this.onCoinbaseLoad}
                                    onCoinbaseClosed={this.onCoinbaseClosed}
                                    onInitiatePaymentSuccess={
                                        this.onInitiatePaymentSuccess
                                    }
                                    onInitiatePaymentFailure={
                                        this.onInitiatePaymentFailure
                                    }
                                />
                                {/* <div className="form-check form-check-inline mt-2 mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="add_to_newsletter"
                                        value="add_to_newsletter"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="add_to_newsletter">
                                        Yes! Add me to your newsletter list
                                    </label>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
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
