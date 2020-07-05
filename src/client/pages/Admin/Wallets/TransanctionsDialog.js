import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import Dialog from 'components/ui/Dialog'

import { TransanctionDate } from './TransanctionsTable'

const LabelledValue = ({ className, label, value }) => (
    <div className={`labelled-value ${className}`}>
        <div className="label">{label}</div>
        <div className="value">{value}</div>
    </div>
)

class TransanctionsDialog extends Component {
    renderOneTransanction = (transanction, index) => {
        return (
            <div className="transanction-item" key={index}>
                <div className="row">
                    <div className="col-4">
                        <LabelledValue label="Hash" value={transanction.hash} />
                    </div>
                    <div className="col-4">
                        <LabelledValue
                            label="Timestamp"
                            value={
                                <TransanctionDate
                                    timestamp={transanction.timestamp}
                                />
                            }
                        />
                    </div>
                    <div className="col-4">
                        <LabelledValue
                            className="transanction-amount"
                            label="Amount"
                            value={transanction.transfers[0].amount / 1000000}
                        />
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const tableData = !isEmpty(this.props.selectedWebWalletDetails)
            ? this.props.selectedWebWalletDetails.transactions
            : []

        return (
            <Dialog
                isOpen={true}
                className="transanctions-dialog"
                onRequestClose={this.props.onRequestClose}>
                {tableData.map(this.renderOneTransanction)}
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    selectedWebWallet: state.UserWebWallet.selectedWebWallet,
    selectedWebWalletDetails: state.UserWebWallet.selectedWebWalletDetails
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TransanctionsDialog)
