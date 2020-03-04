import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import capitalize from 'lodash/capitalize'

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
        ? `${transanction.account.user.username} -> ${transanction.to_account.user.username}`
        : `Baza Foundation -> ${transanction.to_account.user.username}`
}

export const TransanctionDate = ({ timestamp }) =>
    moment(timestamp).format('MM/DD/YYYY, h:mm a')

export const TransanctionReceipt = ({ receiptLink }) => {
    return receiptLink ? (
        <a href={`${receiptLink}`} className="receipt-link" target="_blank">
            <i className="fa fa-arrow-circle-right" />
        </a>
    ) : null
}

class TransanctionsTable extends Component {
    render() {
        const tableData = !isEmpty(this.props.selectedWebWalletDetails)
            ? this.props.selectedWebWalletDetails.transactions
            : []

        if (isEmpty(tableData)) {
            return null
        }

        const columns = [
            {
                id: 'hash',
                Header: 'Transanction Hash',
                accessor: 'hash'
            },
            {
                id: 'timestamp',
                Header: 'Timestamp',
                accessor: d => <TransanctionDate date={d.timestamp} />
            },
            {
                id: 'amount',
                Header: 'Amount',
                accessor: d => `${d.transfers[0].amount}`
            }
        ]

        const tableOptions = {
            showPagination: false,
            showPageSizeOptions: false,
            minRows: 0,
            multisort: false,
            defaultSorted: [
                {
                    id: 'timestamp',
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
    selectedWebWallet: state.UserWebWallet.selectedWebWallet,
    selectedWebWalletDetails: state.UserWebWallet.selectedWebWalletDetails
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TransanctionsTable)
