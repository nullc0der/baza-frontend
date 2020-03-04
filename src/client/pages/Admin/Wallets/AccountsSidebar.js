import React, { Component } from 'react'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'

import { actions as userWebWalletActions } from 'store/UserWebWallet'

class AccountsSidebar extends Component {
    componentDidMount = () => {
        this.props.getWebWallets()
    }

    onWalletItemClick = wallet => {
        this.props
            .getWebWalletDetails(wallet.id)
            .then(() => this.props.setSelectedWallet(wallet))
    }

    renderOneAccount = (wallet, index) => {
        const selectedWebWalletId = !isEmpty(this.props.selectedWebWallet)
            ? this.props.selectedWebWallet.id
            : -1
        const cx = classnames('account-sidebar-item', {
            'is-selected': wallet.id === selectedWebWalletId
        })
        return (
            <div
                className={cx}
                key={index}
                onClick={() => this.onWalletItemClick(wallet)}>
                <div className="account-details-wrap">
                    <div className="wallet-account-image">
                        <img
                            className="wallet-account-img"
                            alt=""
                            src="/public/img/baza_logo.svg"
                        />
                    </div>
                    <div className="wallet-account-details">
                        {/* <div className="wallet-download-transactions">
                            <i className="material-icons">cloud_download</i>
                        </div> */}
                        <div className="wallet-name">{wallet.name}</div>
                        <div className="wallet-conversion-rate">
                            <p className="mb-0">
                                Unlocked: {wallet.balance.unlocked}
                            </p>
                            <p className="mb-0">
                                Locked: {wallet.balance.locked}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="account-actions-wrap">
                    <div
                        className="action-btn"
                        onClick={e =>
                            this.props.onRequestSend(wallet, index, e)
                        }>
                        Send <i className="material-icons">arrow_upward</i>
                    </div>
                    <div
                        className="action-btn"
                        onClick={e =>
                            this.props.onRequestReceive(wallet, index, e)
                        }>
                        Receive <i className="material-icons">arrow_downward</i>
                    </div>
                    <div
                        className="action-btn show-details-btn"
                        onClick={e =>
                            this.props.onRequestDetails(wallet, index, e)
                        }>
                        DETAILS{' '}
                        <i className="material-icons">format_align_left</i>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { webWallets } = this.props

        return (
            <div className="accounts-sidebar">
                <div className="sidebar-title">ACCOUNTS</div>
                <div className="sidebar-items">
                    {webWallets.map(this.renderOneAccount)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    webWallets: state.UserWebWallet.webWallets,
    selectedWebWallet: state.UserWebWallet.selectedWebWallet
})

const mapDispatchToProps = dispatch => ({
    getWebWallets: () => dispatch(userWebWalletActions.getWebWallets()),
    getWebWalletDetails: walletId =>
        dispatch(userWebWalletActions.getWebWalletsDetails(walletId)),
    setSelectedWallet: wallet =>
        dispatch(userWebWalletActions.selectWebWallet(wallet))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountsSidebar)
