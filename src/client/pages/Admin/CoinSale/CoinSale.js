import React, { Fragment } from 'react'

import ProgressBar from 'components/ui/ProgressBar'
import SaleDescription from './SaleDescription'

const TitleAndProgress = props => (
  <div className="row">
    <div className="col-md-8 mx-auto">
      <h4 className="title top-title">
        BAZA FOUNDATION 1 MILLION COIN <br /> SALE
      </h4>
      <ProgressBar
        activeText={props.progressCurrentText}
        percentage={props.percentage}
        endText={props.progressEndText}
        currentTooltipText="Coin Sale"
        endTooltipText="Coins Remaining"
      />
    </div>
  </div>
)

const CoinSale = props => {
  const { totalAvailableCoins, totalSoldCoins } = props

  const progressEndText =
    (totalAvailableCoins || 0).toLocaleString(navigator.language) + ' BAZ'
  const progressCurrentText =
    (totalSoldCoins || 0).toLocaleString(navigator.language) + ' BAZ'
  const progressPercentage = Math.floor(
    totalSoldCoins * 100 / totalAvailableCoins
  )
  return (
    <Fragment>
      <TitleAndProgress
        progressEndText={progressEndText}
        percentage={progressPercentage}
        progressCurrentText={progressCurrentText}
      />
      <div className="flex-1" />
      <SaleDescription />
    </Fragment>
  )
}

export default CoinSale
