import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import s from './AdminFooter.scss'

export default class Footer extends Component {
  render() {
    const { className } = this.props
    const cx = classnames(
      s.container,
      className,
      'ui-footer flex-horizontal',
      'a-stretch'
    )
    return (
      <div className={cx}>
        <div className="flex-horizontal a-center">
          <b>Copyright &copy; 2014-2016 Ekata.&nbsp;</b>
          <span>All rights reserved.</span>
          <span className="badge badge-pill pill-blue pill-powered">
            {' '}
            Powered by Ekata{' '}
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex-horizontal a-center">
          <div className="badge badge-pill pill-red pill-beta"> beta </div>
          <b> v0.7.5 </b>
        </div>
      </div>
    )
  }
}
