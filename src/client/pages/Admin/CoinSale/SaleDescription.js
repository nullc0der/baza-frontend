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
                        Coin sales help us raise funds, strengthen our
                        foundation, build platform features, gain value and show
                        returns. All buyers are required to have an account for
                        participation in all Initial Coin Offering ( ICO )
                        sales. Be sure to create an account before the sale
                        begins. After sale, all unsold tokens will be destroyed.
                    </p>
                    <div className="row sale-item-container">
                        <SaleItem
                            status="sold-out"
                            title="Pre-Coin Sale"
                            amount="Pre-Coin 1.3M USD"
                        />

                        <SaleItem
                            status="almost-gone"
                            title="Series A"
                            amount="Series A 15M USD"
                        />

                        <SaleItem
                            status="available"
                            title="Series B"
                            amount="Series B 50M USD"
                        />

                        <SaleItem
                            status="available"
                            title="Series C"
                            amount="Series B 100M USD"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleDescription
