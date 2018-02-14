import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './ChatBodyItem.scss'

import Avatar from 'components/Avatar'

import moment from 'moment'

export default class ChatBodyItem extends Component {
  render() {
    const {
      className,
      user = '',
      message = '',
      stamp = new Date(),
      left = false
    } = this.props

    const cx = classnames(s.container, className, 'chat-body-item', {
      'in-left': left
    })

    return (
      <div className={cx}>
        <Avatar name={user} />
        <div className="msg">
          {message}
          <div className="stamp">{moment(stamp).fromNow()}</div>
        </div>
      </div>
    )
  }
}
