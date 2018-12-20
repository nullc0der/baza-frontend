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
        amount: PropTypes.number.isRequired,
        onChargeSuccess: PropTypes.func,
        onChargeFailure: PropTypes.func,
        onPaymentDetected: PropTypes.func
    }

    state = {
        chargeID: null,
        errorState: null
    }

    onClickContinue = () => {
        initiatePayment(this.props.amount)
            .then(res => {
                this.setState({
                    chargeID: get(res.data, 'charge_id', null)
                })
            })
            .catch(err => {
                this.setState({
                    errorState: "Can't initiate payment now, please try later"
                })
            })
    }

    render() {
        const {
            className,
            onChargeFailure,
            onChargeSuccess,
            onPaymentDetected
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
                        onPaymentDetected={onPaymentDetected}>
                        Pay with Coinbase
                    </CoinbaseCommerceButton>
                )}
                <p className="text-danger my-1">{this.state.errorState}</p>
            </div>
        )
    }
}

export default CoinbaseButton
