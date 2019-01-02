import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'

import capitalize from 'lodash/capitalize'

import { actions as walletTransanctionActions } from 'store/WalletTransanctions'
import moment from 'moment'

export const TransanctionStatus = ({ status, className }) => {
    const cx = classnames(
        'td-status',
        {
            'text-success': status === 'success',
            'text-danger': status === 'cancelled',
            'text-info': status === 'pending'
        },
        className
    )
    return <div className={cx}>{capitalize(status)}</div>
}

export const TransanctionFromTo = ({ transanction }) => {
    return transanction.account
        ? `${transanction.account.user.username} -> ${
              transanction.to_account.user.username
          }`
        : `Baza Foundation -> ${transanction.to_account.user.username}`
}

export const TransanctionDate = ({ date }) =>
    moment(date).format('MM/DD/YYYY, h:mm a')

export const TransanctionReceipt = ({ receiptLink }) => {
    return receiptLink ? (
        <a href={`${receiptLink}`} className="receipt-link" target="_blank">
            <i className="fa fa-arrow-circle-right" />
        </a>
    ) : null
}

class TransanctionsTable extends Component {
    componentDidMount = () => {
        const { selectedWalletId } = this.props
        if (selectedWalletId) {
            this.props.fetchTransanctions(selectedWalletId)
        }
    }

    componentWillReceiveProps = nextProps => {
        const { selectedWalletId } = this.props
        if (
            nextProps.selectedWalletId &&
            nextProps.selectedWalletId !== selectedWalletId
        ) {
            this.props.fetchTransanctions(nextProps.selectedWalletId)
        }
        if (!nextProps.selectedWalletId) {
            this.props.clearTransanctions()
        }
    }

    render() {
        const tableData = this.props.list || []

        if (!this.props.selectedWalletId) {
            return null
        }

        const columns = [
            {
                id: 'id',
                Header: 'ID',
                accessor: 'id',
                show: false
            },
            {
                id: 'from-to',
                Header: 'From -> To',
                accessor: d => <TransanctionFromTo transanction={d} />
            },
            {
                id: 'message',
                Header: 'Description',
                accessor: 'message'
            },
            {
                id: 'txid',
                Header: 'TransanctionID',
                accessor: 'txid'
            },
            {
                id: 'status',
                Header: 'Status',
                accessor: d => <TransanctionStatus status={d.status} />
            },
            {
                id: 'date',
                Header: 'Date',
                accessor: d => <TransanctionDate date={d.timestamp} />
            },
            {
                id: 'amount',
                Header: 'Amount',
                accessor: d => `${d.amount.toLocaleString()}`
            },
            {
                id: 'receipt',
                Header: 'Receipt',
                accessor: d => (
                    <TransanctionReceipt receiptLink={d.receipt_link} />
                )
            }
        ]

        const tableOptions = {
            loading: this.props.isLoading,
            showPagination: false,
            showPageSizeOptions: false,
            minRows: 0,
            multisort: false,
            defaultSorted: [
                {
                    id: 'id',
                    desc: true
                }
            ]
        }

        return (
            <div className="transanctions-table">
                <ReactTable
                    data={tableData}
                    columns={columns}
                    {...tableOptions}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.WalletTransanctions.list,
    isLoading: state.WalletTransanctions.isLoading,
    selectedWalletId: state.WalletAccounts.selectedWalletId
})

const mapDispatchToProps = dispatch => ({
    fetchTransanctions(walletId) {
        return dispatch(walletTransanctionActions.fetchTransanctions(walletId))
    },
    clearTransanctions() {
        return dispatch(walletTransanctionActions.clearTransanctions())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransanctionsTable)
