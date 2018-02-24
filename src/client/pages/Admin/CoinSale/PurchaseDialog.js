import React, { Component } from 'react'
import classnames from 'classnames'
import Dialog from 'components/ui/Dialog'

// import last from 'lodash/last'

import TextField from 'components/ui/TextField'
import PaymentInformation, {
  PaymentBadges
} from 'components/PaymentInformation'

import { CurrencyDropdown } from './CoinSale'
import { CONVERSION_TABLE } from './data'

import s from './CoinSale.scss'

export default class PurchaseDialog extends Component {
  state = {
    purchaseAmount: '1',
    conversion: CONVERSION_TABLE['usd']
  }

  updatePurchaseAmount = purchaseAmount => {
    purchaseAmount = purchaseAmount || 0
    const conversion = this.convertAmountToBAZ(purchaseAmount)
    this.setState({ purchaseAmount, conversion })
  }

  convertAmountToBAZ = str => {
    const amount = (str + '').replace(/\D/g, '') || 0
    // const unit = last((str + '').split(' '))
    const unit = this.props.selectedCurrency.toLowerCase()
    const multiplier = CONVERSION_TABLE[unit]
    return multiplier ? amount * multiplier : 0
  }

  onCurrencySelect = currency => {
    this.setState({
      conversion: this.state.purchaseAmount * CONVERSION_TABLE[currency.key]
    })
    this.props.onCurrencySelect(currency)
  }

  getSubmitButton = device => {
    const cx = classnames('mt-3 mb-2 button-purchase-wrap', {
      'd-none d-md-block d-lg-block d-xl-block': device === 'desktop',
      'd-md-none d-lg-none d-xl-none': device === 'mobile'
    })
    return (
      <div className={cx}>
        <button className="btn btn-dark btn-block">
          <span>PURCHASE</span>
          <i className="material-icons">arrow_forward</i>
        </button>
        <div className="form-check form-check-inline mt-2 mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="add_to_newsletter"
            value="add_to_newsletter"
          />
          <label className="form-check-label" htmlFor="add_to_newsletter">
            Yes! Add me to your newsletter list
          </label>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Dialog
        className={s.purchaseDialog}
        title="Purchase BAZ Coins"
        isOpen={this.props.isOpen}
        footer="Contact your credit card holder about Baza Foundation purchase and limits to avoid any bank issues"
        onRequestClose={this.props.onRequestClose}>
        <div className="row">
          <div className="col-md-5">
            <CurrencyDropdown
              selectedCurrency={this.props.selectedCurrency}
              onCurrencySelect={this.onCurrencySelect}
            />
            <div className="text-center">Enter Amount</div>
            <TextField
              className="purchase-amount-input"
              onChange={this.updatePurchaseAmount}
              value={this.state.purchaseAmount}
            />
            <div className="baz-conversion well p-2 mt-3">
              {this.state.conversion} <span className="baz-unit">BAZ</span>
            </div>
            {this.getSubmitButton('desktop')}
          </div>
          <div className="col-md-7 mt-2 mt-md-0 mt-lg-0 mt-xl-0">
            <PaymentInformation />
          </div>
        </div>
        {this.getSubmitButton('mobile')}
        <PaymentBadges />
      </Dialog>
    )
  }
}
