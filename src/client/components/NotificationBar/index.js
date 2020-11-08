import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { actions as walletAccountsActions } from 'store/WalletAccounts'

import s from './NotificationBar.scss'

const INITIAL_EVENTS = [
    {
        title:
            'Register for baza distribution or check your application status',
        href: '#!baza-registration',
        bgColorClass: 'info',
    },
]

class NotificationBar extends Component {
    state = {
        events: [...INITIAL_EVENTS],
    }

    componentDidMount() {
        this.props
            .fetchWithdrawBazaInfo()
            .then(() => {})
            .catch(() => {})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.withdrawBazaInfo !== this.props.withdrawBazaInfo) {
            const { withdrawBazaInfo } = this.props
            if (withdrawBazaInfo.balance > 0) {
                this.setState({
                    events: [
                        ...INITIAL_EVENTS,
                        {
                            title: `You have ${withdrawBazaInfo.balance} BAZA ready to withdraw`,
                            href: '#!withdraw-baza',
                            bgColorClass: 'success',
                        },
                    ],
                })
            } else {
                this.setState({
                    events: [...INITIAL_EVENTS],
                })
            }
        }
    }

    render() {
        const { className } = this.props
        const { events } = this.state
        const cx = classnames(s.container, className)
        return (
            <div className={cx}>
                {events.map((x, i) => (
                    <div
                        className={`notification-item bg-${x.bgColorClass}`}
                        key={i}>
                        <Link to={x.href}>
                            {x.title} <i className="fa fa-arrow-right" />
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    withdrawBazaInfo: state.WalletAccounts.withdrawBazaInfo,
})

const mapDispatchToProps = (dispatch) => ({
    fetchWithdrawBazaInfo: () =>
        dispatch(walletAccountsActions.fetchWithdrawBazaInfo()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar)
