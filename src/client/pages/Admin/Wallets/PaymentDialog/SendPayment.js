import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import TextField from 'components/ui/TextField'

import SelectDropdown from 'components/ui/SelectDropdown'

const calcTotal = (amount, txfee) => {
    return parseFloat(amount) + parseFloat(txfee)
}

class SendPayment extends Component {
    state = {
        inputValues: {
            amount: 0,
            username: '',
            message: ''
        },
        inputError: {}
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.hasPaymentSendError) {
            const errors = nextProps.hasPaymentSendError
            if (typeof errors === 'boolean') {
                this.setState({
                    inputError: {}
                })
            }
            if (typeof errors === 'object') {
                this.setState({
                    inputError: errors
                })
            }
        }
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onSendSubmitClick = e => {
        this.props.onSendSubmitClick(this.state.inputValues)
    }

    render() {
        const cx = classnames('send-payment payment-tab-content flex-vertical')
        return (
            <div className={cx}>
                <div className="tab-content-inner">
                    <SelectDropdown
                        className="mt-3"
                        label="Username"
                        onChange={this.onInputChange}
                        value={this.state.inputValues.username}
                        id="username"
                        errorState={this.state.inputError.nonField || null}
                    />

                    <div className="row align-items-center">
                        {/* <div className="col-md-6 mt-3">
                        <TextField label="Select Account" />
                    </div> */}
                        <div className="col-md-12 mt-3">
                            <TextField
                                id="amount"
                                label="Enter Amount"
                                type="number"
                                onChange={this.onInputChange}
                                value={this.state.inputValues.amount}
                                step="0.01"
                                errorState={
                                    this.state.inputError.amount || null
                                }
                            />
                        </div>
                    </div>
                    <TextField
                        className="mt-3"
                        label="Message"
                        id="message"
                        onChange={this.onInputChange}
                        value={this.state.inputValues.message}
                        errorState={this.state.inputError.message || null}
                    />
                    {/* {this.state.inputError.nonField && (
                        <div className="row align-items-center no-gutters mt-3">
                            <div className="col-md-12 text-center non-field-error">
                                {this.state.inputError.nonField}
                            </div>
                        </div>
                    )} */}
                    <div className="row align-items-center justify-content-between mt-3">
                        <div className="col-md-6">
                            <div className="transanction-info">
                                <div className="label">Tx Fee</div>
                                <div className="value">0.01</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="transanction-info total-info">
                                <div className="label">Total</div>
                                <div className="value">
                                    {calcTotal(
                                        this.state.inputValues.amount,
                                        0.01
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1" />
                <button
                    className="btn btn-info bottom-submit-btn mt-3"
                    onClick={this.onSendSubmitClick}>
                    SUBMIT
                </button>
            </div>
        )
    }
}

SendPayment.propTypes = {
    onSendSubmitClick: PropTypes.func.isRequired
}

export default SendPayment
