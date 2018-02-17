import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const ACTION_STATUS_TEXT_MAP = {
  'sold-out': 'Sold Out',
  'almost-gone': 'Almost Gone',
  available: 'Available'
}

const SaleItem = props => {
  const actionClass = classnames('sale-action btn', {
    'btn-danger': props.status === 'sold-out',
    'btn-warning': props.status === 'almost-gone',
    'btn-success': props.status === 'available'
  })

  const actionText = ACTION_STATUS_TEXT_MAP[props.status]

  return (
    <div className="col-md-3 col-sm-6 col-xs-12 pt-2 pt-md-0 pt-lg-0 pt-xl-0">
      <div className="sale-item">
        <div className="sale-item-title">{props.title}</div>
        <div className="sale-item-amount">{props.amount}</div>
        <button className={actionClass}>{actionText}</button>
      </div>
    </div>
  )
}

SaleItem.propTypes = {
  status: PropTypes.oneOf(['sold-out', 'almost-gone', 'available'])
}

const SaleDescription = props => {
  return (
    <div className="sale-description-container">
      <div className="row">
        <div className="col-md-10 col-sm-12 col-xs-12 mx-auto">
          <h4 className="title">DETAILS</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="row sale-item-container">
            <SaleItem
              status="sold-out"
              title="FIrst 100K BAZ Coins"
              amount="$0.50 USD"
            />

            <SaleItem
              status="almost-gone"
              title="FIrst 100K BAZ Coins"
              amount="$0.50 USD"
            />

            <SaleItem
              status="available"
              title="FIrst 100K BAZ Coins"
              amount="$0.50 USD"
            />

            <SaleItem
              status="available"
              title="FIrst 100K BAZ Coins"
              amount="$0.50 USD"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleDescription
