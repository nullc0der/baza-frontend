import React, { Component } from 'react'
import classnames from 'classnames'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    injectStripe
} from 'react-stripe-elements'

import s from './StripePaymentForm.scss'

class StripePaymentForm extends Component {
    state = {
        errorMessage: ''
    }

    componentDidUpdate = prevProps => {
        if (
            prevProps.submitClicked !== this.props.submitClicked &&
            this.props.submitClicked
        ) {
            this.handleSubmit()
        }
    }

    handleSubmit = () => {
        this.setState({
            errorMessage: ''
        })
        this.props.stripe.createToken().then(payload => {
            if (payload.error) {
                this.setState(
                    {
                        errorMessage: payload.error.message
                    },
                    () => this.props.onTokenReceive(null)
                )
            } else {
                this.props.onTokenReceive(payload.token.id)
            }
        })
    }

    render() {
        const { className } = this.props
        const cx = classnames(s.container, className, 'well')
        return (
            <div className={cx}>
                <p className="font-weight-bold mb-3"> Payment Details </p>
                <div className={classnames(s.stripeElement, 'mb-3')}>
                    <CardNumberElement placeholder="" />
                    <label>
                        <span className="label-text">Card Number</span>
                    </label>
                </div>
                <div className={classnames(s.stripeElement, 'mb-3')}>
                    <CardExpiryElement placeholder="" />
                    <label>
                        <span className="label-text">Expiration date</span>
                    </label>
                </div>
                <div className={classnames(s.stripeElement, 'mb-3')}>
                    <CardCVCElement placeholder="" />
                    <label>
                        <span className="label-text">CVC</span>
                    </label>
                </div>
                <div className={classnames(s.stripeElement, 'mb-3')}>
                    <PostalCodeElement placeholder="" />
                    <label>
                        <span className="label-text">Postal Code</span>
                    </label>
                </div>
                {!!this.state.errorMessage && (
                    <div className="ui-textfield-error">
                        {' '}
                        {this.state.errorMessage}
                    </div>
                )}
            </div>
        )
    }
}

export default injectStripe(StripePaymentForm)
