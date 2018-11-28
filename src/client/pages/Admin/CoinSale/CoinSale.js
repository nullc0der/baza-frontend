import React, { Fragment } from 'react'

import ProgressBar from 'components/ui/ProgressBar'
import SaleDescription from './SaleDescription'

import { CURRENCIES } from './data'

export const CurrencyDropdown = props => (
    <div className="currency-dropdown-group btn-group">
        <button
            type="button"
            className="btn btn-light dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {props.selectedCurrency}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
            {CURRENCIES.map(item => (
                <div
                    key={item.key}
                    className="dropdown-item"
                    onClick={() => props.onCurrencySelect(item)}>
                    {item.name}
                </div>
            ))}
        </div>
    </div>
)

const TitleAndProgress = props => (
    <div className="row">
        <div className="col-md-8 mx-auto">
            <h4 className="title top-title">
                BAZA FOUNDATION 1.5M PRE-FUNDRAISER
            </h4>
            <ProgressBar
                activeText={props.progressCurrentText}
                percentage={props.percentage}
                endText={props.progressEndText}
                currentTooltipText="Coins Sold"
                endTooltipText="Coins Remaining"
            />
        </div>
    </div>
)

const CoinSale = props => {
    const {
        totalAvailableCoins,
        selectedCurrency,
        onCurrencySelect,
        totalSoldCoins
    } = props

    const progressEndText =
        (totalAvailableCoins - totalSoldCoins || 0).toLocaleString(
            navigator.language
        ) + ' BAZ'
    const progressCurrentText =
        (totalSoldCoins || 0).toLocaleString(navigator.language) + ' BAZ'
    const progressPercentage = Math.floor(
        (totalSoldCoins * 100) / totalAvailableCoins
    )
    return (
        <Fragment>
            <CurrencyDropdown
                selectedCurrency={selectedCurrency}
                onCurrencySelect={onCurrencySelect}
            />
            <TitleAndProgress
                progressEndText={progressEndText}
                percentage={progressPercentage}
                progressCurrentText={progressCurrentText}
            />
            <div className="flex-1" />
            <SaleDescription selectedCurrency={selectedCurrency} />
        </Fragment>
    )
}

export default CoinSale
