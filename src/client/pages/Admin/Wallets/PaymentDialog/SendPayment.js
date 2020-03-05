import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import TextField from 'components/ui/TextField'

class SendPayment extends Component {
    onSendSubmitClick = e => {
        this.props.onSendSubmitClick()
    }

    render() {
        const cx = classnames('send-payment payment-tab-content flex-vertical')
        return (
            <div className={cx}>
                <div className="tab-content-inner">
                    {/* <SelectDropdown
                        className="mt-3"
                        label="Username"
                        onChange={this.onInputChange}
                        value={this.state.inputValues.username}
                        id="username"
                        errorState={this.state.inputError.nonField || null}
                        items={this.state.userList}
                        onDDItemClick={this.onDDItemClick}
                        itemRenderer={this.userDDRenderer}
                        autoComplete="off"
                        data-lpignore="true"
                    /> */}
                    <TextField
                        id="destAddress"
                        label="Enter Destination Address"
                        onChange={this.props.onInputChange}
                        value={this.props.inputValues.destAddress}
                        errorState={this.props.inputError.destAddress}
                    />

                    <div className="row align-items-center">
                        {/* <div className="col-md-6 mt-3">
                        <TextField label="Select Account" />
                    </div> */}
                        <div className="col-md-12 mt-3">
                            <TextField
                                id="amount"
                                label="Enter Amount"
                                onChange={this.props.onInputChange}
                                value={this.props.inputValues.amount}
                                errorState={this.props.inputError.amount}
                            />
                        </div>
                    </div>
                    {/* <TextField
                        className="mt-3"
                        label="Message"
                        id="message"
                        onChange={this.onInputChange}
                        value={this.state.inputValues.message}
                        errorState={this.state.inputError.message || null}
                    /> */}
                    {this.props.inputError.nonField && (
                        <div className="row align-items-center no-gutters mt-3">
                            <div className="col-md-12 text-center non-field-error">
                                {this.props.inputError.nonField}
                            </div>
                        </div>
                    )}
                    <div className="row align-items-center justify-content-between mt-3">
                        <div className="col-6">
                            <div className="transanction-info">
                                <div className="label">Tx Fee</div>
                                <div className="value">
                                    {this.props.txfee / 1000000}
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="transanction-info total-info">
                                <div className="label">Total</div>
                                <div className="value">
                                    {this.props.totalAmount}
                                </div>
                            </div>
                        </div>
                    </div>
                    {!!this.props.txHash && (
                        <div className="well mt-2 transaction-hash">
                            <h6 className="text-center">
                                Transaction has been sent
                            </h6>
                            <p className="mb-0">Hash: {this.props.txHash}</p>
                        </div>
                    )}
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
