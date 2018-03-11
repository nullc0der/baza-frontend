import React, { Fragment } from 'react'

import s from './CoinSale.scss'

import noop from 'lodash/noop'
import ProgressBar from 'components/ui/ProgressBar'

const createDateText = (title, date) => {
  return (
    <Fragment>
      <span className="date-title">{title}</span>
      {!!date.days && <span className="time-item">{date.days} d</span>}
      {!!date.hours && <span className="time-item">{date.hours} hr</span>}
      {!!date.minutes && <span className="time-item">{date.minutes} min</span>}
      <span className="time-item">{date.seconds} sec</span>
    </Fragment>
  )
}

const PurchaseButton = props => {
  const percentage = props.isSaleOpen ? props.percentage : 0
  const buttonText = props.isSaleOpen
    ? createDateText('Coin Sale', props.endTime)
    : props.isSaleWaiting
      ? createDateText('Next Release', props.endTime)
      : props.buttonText

  const onClickFn = props.isSaleOpen ? props.onClick : noop

  return (
    <div className={s.purchaseButton} onClick={onClickFn}>
      <div className="purchase-button-text">{buttonText}</div>
      <ProgressBar
        className={`${percentage === 0 ? 'is-hidden' : ''}`}
        percentage={percentage}
      />
    </div>
  )
}

export default PurchaseButton
