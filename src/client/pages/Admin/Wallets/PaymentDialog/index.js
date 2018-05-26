import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import SwipeableViews from 'react-swipeable-views'

import Dialog from 'components/ui/Dialog'
import Tabs from 'components/ui/Tabs'

import { actions as walletTransactionActions } from 'store/WalletTransanctions'
import { actions as walletAccountActions } from 'store/WalletAccounts'

import ReceivePayment from './ReceivePayment'
import SendPayment from './SendPayment'

import s from './PaymentDialog.scss'

class PaymentsDialog extends Component {
    state = {
        selectedTab: 0
    }

    componentDidMount = () => {
        if (this.props.selectedTab) {
            this.setState({ selectedTab: this.props.selectedTab })
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.selectedTab) {
            this.setState({ selectedTab: nextProps.selectedTab })
        }
    }

    switchTab = (tab, selectedTab) => {
        this.setState({ selectedTab })
    }

    switchSwipeTab = selectedTab => {
        this.setState({ selectedTab })
    }

    onReceiveSubmitClick = () => {
        console.log('receive submit clicked')
    }

    onSendSubmitClick = data => {
        this.props
            .sendPayment(data)
            .then(() => {
                this.props.onRequestClose()
                this.props.fetchAccounts()
            })
            .catch(err => err)
    }

    render() {
        const cx = classnames(s.container, 'payments-dialog')

        const tabsList = [{ label: 'SEND' }, { label: 'RECEIVE' }]

        return (
            <Dialog
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                className={cx}>
                <Tabs
                    className="payment-tabs"
                    selectedIndex={this.state.selectedTab}
                    tabs={tabsList}
                    onTabClick={this.switchTab}
                />
                <SwipeableViews
                    index={this.state.selectedTab}
                    onChange={this.switchSwipeTab}>
                    <SendPayment
                        onSendSubmitClick={this.onSendSubmitClick}
                        hasPaymentSendError={this.props.hasPaymentSendError}
                    />
                    <ReceivePayment
                        onReceiveSubmitClick={this.onReceiveSubmitClick}
                    />
                </SwipeableViews>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    hasPaymentSendError: state.WalletTransanctions.hasPaymentSendError
})

const mapDispatchToProps = dispatch => ({
    sendPayment(data) {
        return dispatch(walletTransactionActions.sendPayment(data))
    },
    fetchAccounts() {
        return dispatch(walletAccountActions.fetchAccounts())
    } // TODO: This is temporary in later version make store change the related account amount once
    // transactions is success
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsDialog)
