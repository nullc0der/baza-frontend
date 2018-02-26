import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { actions as walletAccountActions } from 'store/WalletAccounts'

class AccountsSidebar extends Component {
  componentDidMount = () => {
    this.props.fetchAccounts()
  }
  onAccountItemClick = (account, index) => e => {
    this.props.selectAccount(account.id)
  }

  renderOneAccount = (account, index) => {
    const cx = classnames('account-sidebar-item')
    return (
      <div className={cx} onClick={this.onAccountItemClick(account, index)}>
        {account.name}
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
  isLoading: state.WalletAccounts.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchAccounts() {
    return dispatch(walletAccountActions.fetchAccounts())
  },
  selectAccount(accountId) {
    return dispatch(walletAccountActions.selectAccount(accountId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountsSidebar)
