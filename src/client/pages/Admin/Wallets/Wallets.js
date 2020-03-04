import React, { Component } from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'

import s from './Wallets.scss'

import AccountsSidebar from './AccountsSidebar'
import TransanctionsTable from './TransanctionsTable'
import PaymentDialog from './PaymentDialog'
import TransanctionsDialog from './TransanctionsDialog'
import CreateWalletDialog from './CreateWalletDialog'

class WalletsPage extends Component {
    state = {
        isPaymentDialogOpen: false,
        isTransanctionsDialogOpen: false,
        paymentDialogScreenIndex: 0,
        isCreateWalletDialogOpen: false
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

    toggleCreateWalletDialog = () => {
        this.setState({
            isCreateWalletDialogOpen: !this.state.isCreateWalletDialogOpen
        })
    }

    render() {
        const cx = classnames(s.container)
        return (
            <div className={cx}>
                <Helmet title="Wallets" />
                <div className="action-bar mb-2">
                    <div className="flex-1" />
                    <button
                        className="btn btn-dark create-new-button"
                        onClick={this.toggleCreateWalletDialog}>
                        Create New Baza Wallet
                    </button>
                </div>
                <div className="wallet-section">
                    <AccountsSidebar
                        onRequestReceive={this.openReceiveDialog}
                        onRequestSend={this.openSendDialog}
                        onRequestDetails={this.showDetailsDialog}
                    />
                    <TransanctionsTable />
                </div>
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
                {this.state.isCreateWalletDialogOpen && (
                    <CreateWalletDialog
                        isOpen={this.state.isCreateWalletDialogOpen}
                        onRequestClose={this.toggleCreateWalletDialog}
                    />
                )}
            </div>
        )
    }
}

export default WalletsPage
