import React, { Fragment } from 'react'
import classnames from 'classnames'

import s from './CoinSale.scss'

import noop from 'lodash/noop'
import ProgressBar from 'components/ui/ProgressBar'

const NOT_STARTED = 'NS'
const STARTED = 'S'

const createDateText = (title, date) => {
    return (
        <Fragment>
            <span className="date-title">{title}</span>
            {!!date.days && <span className="time-item">{date.days} d</span>}
            {!!date.hours && <span className="time-item">{date.hours} hr</span>}
            {!!date.minutes && (
                <span className="time-item">{date.minutes} min</span>
            )}
            {!!date.seconds && (
                <span className="time-item">{date.seconds} sec</span>
            )}
        </Fragment>
    )
}

const PurchaseButton = props => {
    const cx = classnames(
        s.purchaseButton,
        props.status === NOT_STARTED
            ? 'sale-not-started'
            : props.status === STARTED
            ? 'sale-started'
            : 'sale-finished'
    )
    const percentage = props.isSaleOpen ? props.percentage : 0
    // const buttonText = props.isSaleOpen
    //     ? createDateText('Fundraiser Begins', props.endTime)
    //     : props.isSaleWaiting
    //     ? createDateText('Next Release', props.endTime)
    //     : props.buttonText
    const buttonText =
        props.status === NOT_STARTED
            ? createDateText('Fundraiser Begins :', props.endTime)
            : props.status === STARTED
            ? createDateText('Fundraiser Active :', props.endTime)
            : createDateText('Fundraiser Finished', {})

    const onClickFn = props.isSaleOpen ? props.onClick : noop

    return (
        <div className={cx} onClick={onClickFn}>
            <div className="purchase-button-text">{buttonText}</div>
            <ProgressBar
                className={`${percentage === 0 ? 'is-hidden' : ''}`}
                percentage={percentage}
            />
        </div>
    )
}

export default PurchaseButton
