import React, { Component } from 'react'
import classnames from 'classnames'

import SwipeableViews from 'react-swipeable-views'

import Dialog from 'components/ui/Dialog'
import Tabs from 'components/ui/Tabs'

import ReceivePayment from './ReceivePayment'
import SendPayment from './SendPayment'

import s from './PaymentDialog.scss'

export default class PaymentsDialog extends Component {
  state = {
    selectedTab: 0
  }

  switchTab = (tab, selectedTab) => {
    this.setState({ selectedTab })
  }

  switchSwipeTab = selectedTab => {
    this.setState({ selectedTab })
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
          <SendPayment />
          <ReceivePayment />
        </SwipeableViews>
      </Dialog>
    )
  }
}
