import React, { Component } from 'react'
import classnames from 'classnames'

import s from './Avatar.scss'

export default class Avatar extends Component {
  render() {
    const { className, name = '' } = this.props
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map(x => x[0])
      .join('')
    const cx = classnames(s.container, 'ui-avatar', className)
    return (
      <div className={cx}>
        {!!name && <div className="avatar-name"> {initials} </div>}
      </div>
    )
  }
}
