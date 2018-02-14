import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import s from './CoinSale.scss'

export default class CoinSalePage extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const cx = classnames(s.container)
    return (
      <div className={cx}>
        <div className="page-inner" />
      </div>
    )
  }
}
