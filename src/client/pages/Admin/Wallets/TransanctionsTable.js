import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'

import capitalize from 'lodash/capitalize'

import { actions as walletTransanctionActions } from 'store/WalletTransanctions'
import { DateTime } from 'luxon'

export const TransanctionStatus = ({ status, className }) => {
  const cx = classnames(
    'td-status',
    {
      'text-success': status === 'executed',
      'text-danger': status === 'cancelled',
      'text-info': status === 'pending'
    },
    className
  )
  return <div className={cx}>{capitalize(status)}</div>
}

export const TransanctionFromTo = ({ transanction }) =>
  `${transanction.from.fullName} -> ${transanction.to.fullName}`

export const TransanctionDate = ({ date }) =>
  DateTime.fromISO(date).toFormat('D')

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
        id: 'from-to',
        Header: 'From -> To',
        accessor: d => <TransanctionFromTo transanction={d} />
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'TransanctionID',
        accessor: 'transanctionId'
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: d => <TransanctionStatus status={d.status} />,
        sortMethod: (a, b) => {
          if (a.props.children < b.props.children) {
            return -1
          }
          if (a.props.children > b.props.children) {
            return 1
          }
          return 0
        }
      },
      {
        id: 'date',
        Header: 'Date',
        accessor: d => <TransanctionDate date={d.date} />
      },
      {
        id: 'amount',
        Header: 'Amount',
        accessor: d => `$${d.amount.toLocaleString()}`
      }
    ]

    const tableOptions = {
      loading: this.props.isLoading,
      showPagination: false,
      showPageSizeOptins: false,
      defaultPageSize: tableData.length,
      multisort: false
    }

    return (
      <div className="transanctions-table">
        <ReactTable data={tableData} columns={columns} {...tableOptions} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TransanctionsTable)
