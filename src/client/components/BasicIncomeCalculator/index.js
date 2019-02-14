import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { actions as commonActions } from 'store/Common'

import s from './BasicIncomeCalculator.scss'

import TooltipDropdown from 'components/ui/TooltipDropdown'

import * as bsutils from 'utils/bsutils'

const ENTITIES = [
    { label: 'Coffee', value: 'coffee', cost: 2, price: 4 },
    { label: 'Wine', value: 'wine', cost: 3.5, price: 7 },
    { label: 'Dinner', value: 'dinner', cost: 14.5, price: 27 },
    {
        label: 'Travel Ticket',
        value: 'travel-ticket',
        cost: 60,
        price: 120
    }
]

class BasicIncomeCalculator extends Component {
    state = {
        selectedIndex: 0
    }

    selectEntity = (item, selectedIndex) => {
        this.setState({ selectedIndex })
        this.props.selectDonation(item)
    }

    render() {
        const { className } = this.props

        const cx = classnames(s.container, className)

        const selectedItem = ENTITIES[this.state.selectedIndex]

        const formInnerClasses = classnames(
            'form-inner row align-items-center',
            bsutils.toStringWithPrefix('px', [1, 2, 3, 3, 3])
        )

        const columnClasses = classnames('flex-horizontal align-items-center')

        return (
            <div className={cx}>
                <div className={formInnerClasses}>
                    <div className={columnClasses}>
                        <span className="form-text"> Your </span>
                        <TooltipDropdown
                            className="entity-dropdown"
                            items={ENTITIES}
                            selectedIndex={this.state.selectedIndex}
                            onItemClick={this.selectEntity}
                        />
                    </div>
                    <div className={columnClasses}>
                        <span className="form-text">
                            {' '}
                            is basic income for a person for{' '}
                        </span>
                    </div>
                    <div className={columnClasses}>
                        <span className="badge badge-pill badge-dark mx-3">
                            {selectedItem.cost}
                        </span>
                        <span className="form-text"> days </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    selectDonation(selected) {
        dispatch(commonActions.selectDonation(selected))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    BasicIncomeCalculator
)
