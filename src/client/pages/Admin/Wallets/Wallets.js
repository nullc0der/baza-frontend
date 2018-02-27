import React, { Component } from 'react'
import classnames from 'classnames'

import s from './Wallets.scss'

import AccountsSidebar from './AccountsSidebar'
import TransanctionsTable from './TransanctionsTable'
import PaymentDialog from './PaymentDialog'

export default class WalletsPage extends Component {
  state = {
    isPaymentDialogOpen: false,
    paymentDialogScreenIndex: 0
  }

  openReceiveDialog = accountId => {
    this.setState({ isPaymentDialogOpen: true, paymentDialogScreenIndex: 0 })
  }
  openSendDialog = accountId => {
    this.setState({ isPaymentDialogOpen: true, paymentDialogScreenIndex: 1 })
  }

  closeDialog = () => {
    this.setState({ isPaymentDialogOpen: false })
  }

  render() {
    const cx = classnames(s.container)
    return (
      <div className={cx}>
        <AccountsSidebar
          onRequestReceive={this.openReceiveDialog}
          onRequestSend={this.openSendDialog}
        />
        <TransanctionsTable />
        <PaymentDialog
          id="wallet-payment-dialog"
          isOpen={this.state.isPaymentDialogOpen}
          onRequestClose={this.closeDialog}
        />
      </div>
    )
  }
}
