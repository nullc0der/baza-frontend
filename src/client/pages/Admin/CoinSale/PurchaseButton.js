import React, { Fragment } from 'react'

import s from './CoinSale.scss'

import ProgressBar from 'components/ui/ProgressBar'

const createDateText = (title, date) => {
  return (
    <Fragment>
      <span className="date-title">{title}</span>
      <span className="time-item">{date.days} d</span>
      <span className="time-item">{date.hours} hr</span>
      <span className="time-item">{date.minutes} min</span>
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

  return (
    <div className={s.purchaseButton}>
      <div className="purchase-button-text">{buttonText}</div>
      <ProgressBar
        className={`${percentage === 0 ? 'is-hidden' : ''}`}
        percentage={percentage}
      />
    </div>
  )
}

export default PurchaseButton
