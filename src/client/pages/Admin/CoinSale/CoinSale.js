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
            <h4 className="title top-title">BAZA FOUNDATION FUNDRAISER</h4>
            <h4 className="title top-title">1.5M USD GOAL</h4>
            <ProgressBar
                activeText={props.progressCurrentText}
                percentage={props.percentage}
                endText={props.progressEndText}
                currentTooltipText="Tokens Rewarded"
                endTooltipText="Tokens Remaining"
            />
        </div>
    </div>
)

const CoinSale = props => {
    const {
        totalAvailableCoins,
        selectedCurrency,
        totalSoldCoins,
        onDonateButtonClick
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
            {/* <CurrencyDropdown
                selectedCurrency={selectedCurrency}
                onCurrencySelect={onCurrencySelect}
            /> */}
            <button
                className="btn btn-light currency-dropdown-group"
                onClick={onDonateButtonClick}>
                Purchase
            </button>
            <TitleAndProgress
                progressEndText={progressEndText}
                percentage={progressPercentage > 17 ? progressPercentage : 17}
                progressCurrentText={progressCurrentText}
            />
            <div className="flex-1" />
            <SaleDescription selectedCurrency={selectedCurrency} />
        </Fragment>
    )
}

export default CoinSale
