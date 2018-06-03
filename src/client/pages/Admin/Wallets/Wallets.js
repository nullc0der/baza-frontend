import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { actions as walletTransactionsActions } from 'store/WalletTransanctions'
import { actions as walletAccountActions } from 'store/WalletAccounts'
import s from './Wallets.scss'

import WebSocketWrapper from 'components/WebSocketWrapper'
import AccountsSidebar from './AccountsSidebar'
import TransanctionsTable from './TransanctionsTable'
import PaymentDialog from './PaymentDialog'
import TransanctionsDialog from './TransanctionsDialog'

class WalletsPage extends Component {
    state = {
        isPaymentDialogOpen: false,
        isTransanctionsDialogOpen: false,
        paymentDialogScreenIndex: 0
    }

    onWebSocketData = action => {
        const { message } = action
        if (message.type === 'proxcdb-transaction') {
            this.props.receievedTXdata(message.data)
            this.props.fetchAccounts()
        }
    }

    openReceiveDialog = accountId => {
        this.setState({
            isPaymentDialogOpen: true,
            paymentDialogScreenIndex: 1
        })
    }
    openSendDialog = accountId => {
        this.setState({
            isPaymentDialogOpen: true,
            paymentDialogScreenIndex: 0
        })
    }

    closeDialog = () => {
        this.setState({ isPaymentDialogOpen: false })
    }

    showDetailsDialog = (wallet, index) => {
        this.setState({ isTransanctionsDialogOpen: true })
    }
    closeDetailsDialog = () => {
        this.setState({ isTransanctionsDialogOpen: false })
    }

    render() {
        const cx = classnames(s.container)
        const wsURL =
            process.env.NODE_ENV === 'production'
                ? '/ws/notifications/'
                : 'ws://localhost:8000/ws/notifications/'
        return (
            <div className={cx}>
                <WebSocketWrapper
                    url={wsURL}
                    onWebSocketData={this.onWebSocketData}
                />
                <AccountsSidebar
                    onRequestReceive={this.openReceiveDialog}
                    onRequestSend={this.openSendDialog}
                    onRequestDetails={this.showDetailsDialog}
                />
                <TransanctionsTable />
                {this.state.isPaymentDialogOpen && (
                    <PaymentDialog
                        id="wallet-payment-dialog"
                        selectedTab={this.state.paymentDialogScreenIndex}
                        isOpen={this.state.isPaymentDialogOpen}
                        onRequestClose={this.closeDialog}
                    />
                )}
                {this.state.isTransanctionsDialogOpen && (
                    <TransanctionsDialog
                        onRequestClose={this.closeDetailsDialog}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    receievedTXdata(transaction) {
        return dispatch(
            walletTransactionsActions.receivedTxdataOnWebsocket(transaction)
        )
    },
    fetchAccounts() {
        return dispatch(walletAccountActions.fetchAccounts())
    } // TODO: This is temporary in later version make store change the related account amount once
    // transactions is success
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletsPage)
