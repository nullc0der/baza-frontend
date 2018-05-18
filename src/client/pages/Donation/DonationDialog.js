import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import isBoolean from 'lodash/isBoolean'

import TextField from 'components/ui/TextField'
import Dialog from 'components/ui/Dialog'

import PaymentInformation, {
    PaymentBadges
} from 'components/PaymentInformation'

import { CurrencyDropdown } from 'pages/Admin/CoinSale/CoinSale'

import s from './Donation.scss'
import ContactInformation from './ContactInformation'

class DonationDialog extends Component {
    state = {
        isOtherInputVisible: false,
        selectedCurrency: 'USD',
        otherInputAmount: 200
    }

    toggleOtherInput = force => {
        this.setState({
            isOtherInputVisible: isBoolean(force)
                ? force
                : !this.state.isOtherInputVisible
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

    updateOtherInputAmount = otherInputAmount => {
        this.setState({ otherInputAmount })
    }

    onCurrencyChange = currency => {
        this.setState({ selectedCurrency: currency.name })
    }

    render() {
        const cx = classnames(s.donationDialog, 'donation-dialog')
        const { selectedDonation } = this.props
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
                        className="btn btn-outline-dark"
                        onClick={e => this.toggleOtherInput(false)}>
                        {selectedDonation && selectedDonation.value === 'coffee'
                            ? `$${selectedDonation.price}`
                            : '$2'}
                    </button>
                    <button
                        className="btn btn-outline-dark"
                        onClick={e => this.toggleOtherInput(false)}>
                        {selectedDonation && selectedDonation.value === 'wine'
                            ? `$${selectedDonation.price}`
                            : '$5'}
                    </button>
                    <button
                        className="btn btn-outline-dark"
                        onClick={e => this.toggleOtherInput(false)}>
                        {selectedDonation && selectedDonation.value === 'dinner'
                            ? `$${selectedDonation.price}`
                            : '$25'}
                    </button>
                    <button
                        className="btn btn-outline-dark"
                        onClick={e => this.toggleOtherInput(false)}>
                        {selectedDonation &&
                        selectedDonation.value === 'travel-ticket'
                            ? `$${selectedDonation.price}`
                            : '$100'}
                    </button>
                    {!this.state.isOtherInputVisible && (
                        <button
                            className="btn btn-outline-dark other-donation-button"
                            onClick={this.toggleOtherInput}>
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
                            type="number"
                            autoFocus
                            plceholder="Enter custom amount"
                            className="purchase-amount-input"
                            onChange={this.updateOtherInputAmount}
                            value={this.state.otherInputAmount}
                        />
                    </div>
                )}
                <div className="row mb-1">
                    <div className="col-md-5 mt-4">
                        <ContactInformation />
                    </div>
                    <div className="col-md-7 mt-3">
                        <PaymentInformation />
                    </div>
                </div>
                <div className="mt-3 mb-2 button-submit-wrap d-md-none d-lg-none d-xl-none">
                    <button className="btn btn-dark btn-block">SUBMIT</button>
                    <div className="form-check form-check-inline mt-2 mb-2">
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

export default connect(mapStateToProps, mapDispatchToProps)(DonationDialog)
