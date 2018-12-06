import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { jsonAPI } from 'api/base'

import TextField from 'components/ui/TextField'
import SelectDropdown from 'components/ui/SelectDropdown'
import Avatar from 'components/Avatar'

const calcTotal = (amount, txfee) => {
    return parseFloat(amount) + parseFloat(txfee)
}

class SendPayment extends Component {
    state = {
        inputValues: {
            amount: '',
            username: '',
            message: ''
        },
        inputError: {},
        userList: [],
        txfee: 0.01
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

    setUserList = list => {
        this.setState({
            userList: list
        })
    }

    clearUserList = () => {
        this.setState({
            userList: []
        })
    }

    fetchProxcUserList = value => {
        if (value.length) {
            const url = '/proxc/users/'
            jsonAPI(api => api.get(url, { username: value }))
                .then(response => {
                    this.setUserList(response.data)
                })
                .catch(err => {
                    this.clearUserList()
                })
        } else {
            this.clearUserList()
        }
    }

    onInputChange = (id, value) => {
        if (id === 'username') {
            this.fetchProxcUserList(value)
        } else {
            this.clearUserList()
        }
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onDDItemClick = (e, value) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                username: value
            },
            userList: []
        }))
    }

    onSendSubmitClick = e => {
        this.clearUserList()
        this.props.onSendSubmitClick(this.state.inputValues)
    }

    userDDRenderer = item => {
        return (
            <div className="flex flex-horizontal a-center">
                <Avatar
                    own={false}
                    otherProfile={{
                        username: item.user.username,
                        profile_photo: item.user.user_image_url,
                        default_avatar_color: item.user.user_avatar_color
                    }}
                />
                <span className="ml-1">{item.label}</span>
            </div>
        )
    }

    render() {
        const cx = classnames('send-payment payment-tab-content flex-vertical')
        const amount =
            this.state.inputValues.amount !== ''
                ? parseFloat(this.state.inputValues.amount)
                : 0
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
                        items={this.state.userList}
                        onDDItemClick={this.onDDItemClick}
                        itemRenderer={this.userDDRenderer}
                        autoComplete="off"
                        data-lpignore="true"
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
                        <div className="col-6">
                            <div className="transanction-info">
                                <div className="label">Tx Fee</div>
                                <div className="value">{this.state.txfee}</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="transanction-info total-info">
                                <div className="label">Total</div>
                                <div className="value">
                                    {calcTotal(amount, this.state.txfee)}
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
