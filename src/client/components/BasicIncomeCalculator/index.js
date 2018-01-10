import React, {Component} from 'react'
import classnames from 'classnames'

import s from './BasicIncomeCalculator.scss'

import TooltipDropdown from 'components/ui/TooltipDropdown'

const ENTITIES = [
  { label: "Coffee", value: "coffee", cost: 2 },
  { label: "Alcoholic Beverage", value: "alcholic-beverage", cost: 4 },
  { label: "Dinner", value: "dinner", cost: 6 },
  { label: "Brunch", value: "brunch", cost: 8 }
];

export default class BasicIncomeCalculator extends Component {
    state = {
        selectedIndex: 0
    }
    
    selectEntity = (item, selectedIndex)=> {
        this.setState({ selectedIndex })
    }

    render(){
        const {
            className
        } = this.props

        const cx = classnames(s.container, className)

        const selectedItem = ENTITIES[this.state.selectedIndex]

        return (
            <div className={cx}>
                <div className='form-inner px-3 flex-horizontal align-items-center'>
                    <span className='form-text'> Your 1 times </span>
                    <TooltipDropdown 
                        className='entity-dropdown' 
                        items={ENTITIES}
                        selectedIndex={this.state.selectedIndex}
                        onItemClick={this.selectEntity}/>
                    <span className='form-text'> is Basic Income of 1 person for </span>
                    <span className='badge badge-pill badge-dark mx-3'>
                        {selectedItem.cost}
                    </span>
                    <span className='form-text'> Days </span>
                </div>
            </div>
        )
    }
}