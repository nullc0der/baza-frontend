import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'components/ui/Dialog'

import { actions as walletTransanctionActions } from 'store/WalletTransanctions'

import {
  TransanctionStatus,
  TransanctionFromTo,
  TransanctionDate
} from './TransanctionsTable'

const LabelledValue = ({ className, label, value }) => (
  <div className={`labelled-value ${className}`}>
    <div className="label">{label}</div>
    <div className="value">{value}</div>
  </div>
)

class TransanctionsDialog extends Component {
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

  renderOneTransanction = (transanction, index) => {
    return (
      <div className="transanction-item" key={index}>
        <div className="row">
          <div className="col-6">
            <LabelledValue
              label="From/To"
              value={<TransanctionFromTo transanction={transanction} />}
            />
          </div>
          <div className="col-6">
            <LabelledValue
              label="Transanction ID"
              value={transanction.transanctionId}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <LabelledValue
              label="Description"
              value={transanction.description}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <LabelledValue
              label="Status"
              value={<TransanctionStatus status={transanction.status} />}
            />
          </div>
          <div className="col-4">
            <LabelledValue
              label="Date"
              value={<TransanctionDate date={transanction.date} />}
            />
          </div>
          <div className="col-4">
            <LabelledValue
              className="transanction-amount"
              label="Amount"
              value={`$${transanction.amount.toLocaleString()}`}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { list = [] } = this.props
    return (
      <Dialog
        isOpen={true}
        className="transanctions-dialog"
        onRequestClose={this.props.onRequestClose}>
        {list.map(this.renderOneTransanction)}
      </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransanctionsDialog)
