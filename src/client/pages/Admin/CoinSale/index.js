import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import s from './CoinSale.scss'

export default class CoinSalePage extends Component {
  render() {
    const cx = classnames(s.container)
    return (
      <div className={cx}>
        <h1> Coin Sale </h1>
      </div>
    )
  }
}
