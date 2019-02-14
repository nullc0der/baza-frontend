import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import CoinbaseCommerceButton from 'react-coinbase-commerce'

import 'react-coinbase-commerce/dist/coinbase-commerce-button.css'

import s from './CoinbaseButton.scss'

import { initiatePayment } from 'api/coinbasepay'

class CoinbaseButton extends Component {
    static propTypes = {
        initiatePaymentURL: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        onChargeSuccess: PropTypes.func,
        onChargeFailure: PropTypes.func,
        onPaymentDetected: PropTypes.func,
        onCoinbaseLoad: PropTypes.func,
        onInitiatePaymentSuccess: PropTypes.func,
        onInitiatePaymentFailure: PropTypes.func
    }

    state = {
        chargeID: null
    }

    onClickContinue = () => {
        const {
            data,
            initiatePaymentURL,
            onInitiatePaymentFailure,
            onInitiatePaymentSuccess
        } = this.props
        initiatePayment(initiatePaymentURL, data)
            .then(res => {
                const chargeID = get(res.data, 'charge_id', null)
                this.setState(
                    {
                        chargeID
                    },
                    () => onInitiatePaymentSuccess(res.data)
                )
            })
            .catch(err => {
                onInitiatePaymentFailure(err)
            })
    }

    render() {
        const {
            title = 'Pay with CoinBase',
            className,
            onChargeFailure,
            onChargeSuccess,
            onPaymentDetected,
            onCoinbaseLoad,
            onCoinbaseClosed
        } = this.props
        const cx = classnames(s.container, className)
        return (
            <div className={cx}>
                <div
                    className={`btn btn-dark btn-block ${this.state.chargeID &&
                        'd-none'}`}
                    onClick={this.onClickContinue}>
                    Continue <i className="fa fa-arrow-right" />
                </div>
                {this.state.chargeID && (
                    <CoinbaseCommerceButton
                        chargeId={this.state.chargeID}
                        className="btn btn-dark btn-block"
                        onChargeFailure={onChargeFailure}
                        onChargeSuccess={onChargeSuccess}
                        onPaymentDetected={onPaymentDetected}
                        onLoad={onCoinbaseLoad}
                        onModalClosed={onCoinbaseClosed}>
                        {title}
                    </CoinbaseCommerceButton>
                )}
            </div>
        )
    }
}

export default CoinbaseButton
