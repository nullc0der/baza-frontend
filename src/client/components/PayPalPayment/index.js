import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Config from 'utils/config'

class PayPalPayment extends Component {
    payment = (data, actions) => {
        return actions.request
            .post(`${Config.get('API_ROOT')}/paypal/createpayment/`, {
                amount: this.props.amount
            })
            .then(res => res.id)
    }

    onAuthorize = (data, actions) => {
        return actions.request
            .post(`${Config.get('API_ROOT')}/paypal/executepayment/`, {
                payment_id: data.paymentID,
                payer_id: data.payerID
            })
            .then(res => this.props.onPaymentAuthorized())
    }

    render() {
        const client = {
            sandbox:
                'AbY19geS0t8PRkT2DAzf9Ztut-avodvX6IZfI7vpz_RGtYQZmuzZrZ9l8l5kAy0Bjcct3Gj8fROD4Jo1',
            production:
                'AfiyuriLBkZZMxcYEywYepywpuoZP8w0q3xzFdt8PJyAxz-w3017K6i78ZCzHQwecFJY8azGy9BZ6oF3'
        }
        const PayPalButton = window.paypal.Button.driver('react', {
            React,
            ReactDOM
        })
        return (
            <div className={this.props.className}>
                <PayPalButton
                    client={client}
                    payment={this.payment}
                    commit={true}
                    onAuthorize={this.onAuthorize}
                    env={'production'}
                    style={{
                        size: 'responsive',
                        color: 'black',
                        shape: 'rect',
                        label: 'pay',
                        tagline: 'false'
                    }}
                />
            </div>
        )
    }
}

export default PayPalPayment
