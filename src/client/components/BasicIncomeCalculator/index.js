import React, { Component } from 'react'
import classnames from 'classnames'

import s from './BasicIncomeCalculator.scss'

import TooltipDropdown from 'components/ui/TooltipDropdown'

import * as bsutils from 'utils/bsutils'

const ENTITIES = [
  { label: 'Coffee', value: 'coffee', cost: 2 },
  { label: 'Wine', value: 'alcholic-beverage', cost: 4 },
  { label: 'Dinner', value: 'dinner', cost: 6 },
  { label: 'Travel Ticket', value: 'brunch', cost: 8 }
]

export default class BasicIncomeCalculator extends Component {
  state = {
    selectedIndex: 0
  }

  selectEntity = (item, selectedIndex) => {
    this.setState({ selectedIndex })
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
            <span className="form-text"> Your 1 times </span>
            <TooltipDropdown
              className="entity-dropdown"
              items={ENTITIES}
              selectedIndex={this.state.selectedIndex}
              onItemClick={this.selectEntity}
            />
          </div>
          <div className={columnClasses}>
            <span className="form-text"> is Basic Income of 1 person for </span>
          </div>
          <div className={columnClasses}>
            <span className="badge badge-pill badge-dark mx-3">
              {selectedItem.cost}
            </span>
            <span className="form-text"> Days </span>
          </div>
        </div>
      </div>
    )
  }
}
