import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import CoinSale from './CoinSale'
import PurchaseButton from './PurchaseButton'
import PurchaseDialog from './PurchaseDialog'
import CoinbaseInfoDialog from 'components/CoinbaseButton/CoinbaseInfoDialog'

import { getTotalCoinPurchased } from 'api/coinsale'

import { DateTime } from 'luxon'

import s from './CoinSale.scss'

const START_TIME = DateTime.fromObject({
    year: 2018,
    month: 11,
    days: 29,
    hours: 0,
    minutes: 0,
    seconds: 0
})

const END_TIME = DateTime.fromObject({
    year: 2018,
    month: 12,
    days: 29,
    hours: 6,
    minutes: 0,
    seconds: 0
})

const getCountdownValues = (startDate, endDate) => {
    const now = DateTime.local()
    const duration = endDate.diff(now, ['days', 'hours', 'minutes', 'seconds'])

    const diff = duration.toObject()
    const countdown = Object.keys(diff).reduce((result, key) => {
        var v = Math.floor(diff[key])
        result[key] = v.toString().length === 1 ? `0${v}` : v
        return result
    }, {})

    const countdownProgress = Math.floor(
        ((endDate.valueOf() - now.valueOf()) * 100) /
            (endDate.valueOf() - startDate.valueOf())
    )

    return { countdown, countdownProgress }
}

export default class CoinSalePage extends Component {
    state = {
        totalAvailableCoins: 15000,
        totalSoldCoins: 0,
        isSaleOpen: true,
        isSaleWaiting: false,
        selectedCurrency: 'USD',
        startTime: START_TIME,
        endTime: END_TIME,
        isPurchaseDialogOpen: false,
        countdownPercentage: 0,
        countdown: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        coinbaseInfo: {
            purchaseAmountInLocal: 1,
            chargeID: null
        }
    }

    static propTypes = {
        className: PropTypes.string
    }

    componentDidMount = () => {
        this.startIntervalTimer()
        getTotalCoinPurchased().then(res =>
            this.setState({
                totalSoldCoins: get(res.data, 'total_purchased', 0)
            })
        )
    }

    startIntervalTimer = () => {
        this.interval = window.setInterval(this.startTimer, 1000)
    }

    startTimer = () => {
        const { startTime, endTime } = this.state
        const { countdown, countdownProgress } = getCountdownValues(
            startTime,
            endTime
        )
        this.setState({ countdown, countdownProgress })
        // console.log('setting countdown: ', countdown, countdownProgress)
    }

    stopTimer = () => {
        if (this.interval) {
            window.clearInterval(this.interval)
        }
    }

    componentWillUnmount = () => {
        this.stopTimer()
    }

    openPurchaseDialog = () => {
        this.setState({ isPurchaseDialogOpen: true })
    }
    closePurchaseDialog = () => {
        this.setState({ isPurchaseDialogOpen: false })
    }

    onCurrencySelect = currency => {
        this.setState({ selectedCurrency: currency.name })
        console.log('selected currency: ', currency)
    }

    onChargeIDChange = (purchaseAmountInLocal, chargeID) => {
        this.setState({
            coinbaseInfo: {
                purchaseAmountInLocal,
                chargeID
            }
        })
    }

    render() {
        const cx = classnames(s.container, this.props.className)

        const {
            totalAvailableCoins,
            totalSoldCoins,
            isSaleOpen,
            countdown,
            selectedCurrency,
            countdownProgress,
            isSaleWaiting
        } = this.state

        return (
            <div className={cx}>
                <div className="page-inner container-fluid flex-vertical">
                    <CoinSale
                        totalAvailableCoins={totalAvailableCoins}
                        totalSoldCoins={totalSoldCoins}
                        isSaleWaiting={isSaleWaiting}
                        selectedCurrency={selectedCurrency}
                        onCurrencySelect={this.onCurrencySelect}
                        onDonateButtonClick={this.openPurchaseDialog}
                    />
                </div>
                {!!(
                    this.state.coinbaseInfo.chargeID &&
                    !this.state.isPurchaseDialogOpen
                ) && (
                    <CoinbaseInfoDialog
                        chargeID={this.state.coinbaseInfo.chargeID}
                    />
                )}
                <PurchaseButton
                    buttonText="PURCHASE"
                    isSaleOpen={isSaleOpen}
                    percentage={countdownProgress}
                    endTime={countdown}
                    isSaleWaiting={isSaleWaiting}
                    onClick={this.openPurchaseDialog}
                />
                {this.state.isPurchaseDialogOpen && (
                    <PurchaseDialog
                        selectedCurrency={selectedCurrency}
                        onCurrencySelect={this.onCurrencySelect}
                        isOpen={this.state.isPurchaseDialogOpen}
                        onRequestClose={this.closePurchaseDialog}
                        onChargeIDChange={this.onChargeIDChange}
                    />
                )}
            </div>
        )
    }
}
