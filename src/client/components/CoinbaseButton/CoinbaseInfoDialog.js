import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CoinbaseCommerceButton from 'react-coinbase-commerce'

import s from './CoinbaseButton.scss'

import 'react-coinbase-commerce/dist/coinbase-commerce-button.css'

class CoinbaseInfoDialog extends Component {
    static propTypes = {
        chargeID: PropTypes.string.isRequired
    }

    render() {
        const { className } = this.props
        const cx = classnames(s.coinbaseInfoDialog, className, 'text-center')
        return this.props.chargeID ? (
            <div className={cx}>
                <CoinbaseCommerceButton
                    chargeId={this.props.chargeID}
                    className="btn btn-link">
                    Click here to check your previous transaction
                </CoinbaseCommerceButton>
            </div>
        ) : null
    }
}

export default CoinbaseInfoDialog
