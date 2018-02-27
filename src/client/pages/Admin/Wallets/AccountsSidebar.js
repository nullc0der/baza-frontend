import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { actions as walletAccountActions } from 'store/WalletAccounts'

class AccountsSidebar extends Component {
  componentDidMount = () => {
    this.props.fetchAccounts()
  }
  onWalletItemClick = (account, index) => e => {
    this.props.selectWallet(account.id)
  }

  renderOneAccount = (wallet, index) => {
    const cx = classnames('account-sidebar-item', {
      'is-selected': wallet.id === this.props.selectedWalletId
    })
    return (
      <div
        className={cx}
        key={index}
        onClick={this.onWalletItemClick(wallet, index)}>
        <div className="account-details-wrap">
          <div className="wallet-account-image">
            <img className="wallet-account-img" alt="" src={wallet.image} />
          </div>
          <div className="wallet-account-details">
            <div className="wallet-name">{wallet.name}</div>
            <div className="wallet-conversion-rate">xxxxx</div>
          </div>
        </div>
        <div className="account-actions-wrap">
          <div
            className="action-btn"
            onClick={e => this.props.onRequestSend(wallet, index, e)}>
            Send <i className="material-icons">arrow_upward</i>
          </div>
          <div
            className="action-btn"
            onClick={e => this.props.onRequestReceive(wallet, index, e)}>
            Receive <i className="material-icons">arrow_downward</i>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { list } = this.props

    return (
      <div className="accounts-sidebar">
        <div className="sidebar-title">ACCOUNTS</div>
        <div className="sidebar-items">{list.map(this.renderOneAccount)}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.WalletAccounts.list,
  isLoading: state.WalletAccounts.isLoading,
  selectedWalletId: state.WalletAccounts.selectedWalletId
})

const mapDispatchToProps = dispatch => ({
  fetchAccounts() {
    return dispatch(walletAccountActions.fetchAccounts())
  },
  selectWallet(walletId) {
    return dispatch(walletAccountActions.selectWallet(walletId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountsSidebar)
