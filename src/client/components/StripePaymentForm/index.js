import React, { Component } from 'react'
import classnames from 'classnames'
import { CardElement, injectStripe } from 'react-stripe-elements'

import s from './StripePaymentForm.scss'

class StripePaymentForm extends Component {
    handleSubmit = () => {
        this.props.stripe
            .createToken()
            .then(payload => this.props.submitDonation(payload.token.id))
    }

    render() {
        const { className } = this.props
        const cx = classnames(s.container, className)
        return (
            <div className={cx}>
                <CardElement />
                <button
                    onClick={this.handleSubmit}
                    className="btn btn-dark btn-block mt-3">
                    SUBMIT
                </button>
            </div>
        )
    }
}

export default injectStripe(StripePaymentForm)
