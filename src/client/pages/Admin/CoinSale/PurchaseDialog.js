import React, { Component } from 'react'
import Dialog from 'components/ui/Dialog'

import last from 'lodash/last'

import TextField from 'components/ui/TextField'
import PaymentInformation, {
  PaymentBadges
} from 'components/PaymentInformation'

import s from './CoinSale.scss'

const CONVERSION_TABLE = {
  usd: 0.00434,
  inr: 0.00043
}

export default class PurchaseDialog extends Component {
  state = {
    purchaseAmount: '$1 USD',
    conversion: CONVERSION_TABLE['usd']
  }

  updatePurchaseAmount = purchaseAmount => {
    purchaseAmount = purchaseAmount || 0
    const conversion = this.convertAmountToBAZ(purchaseAmount)
    this.setState({ purchaseAmount, conversion })
  }

  convertAmountToBAZ = str => {
    const amount = (str + '').replace(/\D/g, '') || 0
    const unit = last((str + '').split(' '))

    const multiplier = CONVERSION_TABLE[unit.toLowerCase()]
    return multiplier ? amount * multiplier : 0
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
            <div className="text-center">Enter Amount</div>
            <TextField
              className="purchase-amount-input"
              onChange={this.updatePurchaseAmount}
              value={this.state.purchaseAmount}
            />
            <div className="baz-conversion well p-2 mt-3">
              {this.state.conversion} <span className="baz-unit">BAZ</span>
            </div>
          </div>
          <div className="col-md-7">
            <PaymentInformation />
          </div>
        </div>
        <PaymentBadges />
      </Dialog>
    )
  }
}
