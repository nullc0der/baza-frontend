import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import ProgressBar from 'components/ui/ProgressBar'

import s from './CoinSale.scss'

const ACTION_STATUS_TEXT_MAP = {
  'sold-out': 'Sold Out',
  'almost-gone': 'Almost Gone',
  available: 'Available'
}

const PurchaseButton = props => {
  return (
    <div className="purchase-button" onClick={props.onClick}>
      PURCHASE
    </div>
  )
}

const SaleItem = props => {
  const actionClass = classnames('sale-action btn', {
    'btn-danger': props.status === 'sold-out',
    'btn-warning': props.status === 'almost-gone',
    'btn-success': props.status === 'available'
  })

  const actionText = ACTION_STATUS_TEXT_MAP[props.status]

  return (
    <div className="sale-item">
      <div className="sale-item-title">{props.title}</div>
      <div className="sale-item-amount">{props.amount}</div>
      <button className={actionClass}>{actionText}</button>
    </div>
  )
}

SaleItem.propTypes = {
  status: PropTypes.oneOf(['sold-out', 'almost-gone', 'available'])
}

export default class CoinSalePage extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const cx = classnames(s.container)

    return (
      <div className={cx}>
        <div className="page-inner container-fluid flex-1 flex-vertical">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h4 className="title">
                BAZA FOUNDATION 1 MILLION COIN <br /> SALE
              </h4>
              <div className="progress-title">Coin Sale</div>
              <ProgressBar
                activeText="400,000 BAZ"
                percentage={60}
                endText="600,000 BAZ"
              />
            </div>
          </div>
          <div className="flex-1" />
          <div className="sale-description-container">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <h4 className="title mb-1">DETAILS</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="row">
                  <div className="col-md-3">
                    <SaleItem
                      status="sold-out"
                      title="FIrst 100K BAZ Coins"
                      amount="$0.50 USD"
                    />
                  </div>
                  <div className="col-md-3">
                    <SaleItem
                      status="almost-gone"
                      title="FIrst 100K BAZ Coins"
                      amount="$0.50 USD"
                    />
                  </div>
                  <div className="col-md-3">
                    <SaleItem
                      status="available"
                      title="FIrst 100K BAZ Coins"
                      amount="$0.50 USD"
                    />
                  </div>
                  <div className="col-md-3">
                    <SaleItem
                      status="available"
                      title="FIrst 100K BAZ Coins"
                      amount="$0.50 USD"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PurchaseButton />
      </div>
    )
  }
}
