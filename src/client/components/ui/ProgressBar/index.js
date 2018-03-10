import React, { Component } from 'react'
import classnames from 'classnames'

import s from './ProgressBar.scss'

export default class ProgressBar extends Component {
  render() {
    const {
      className,
      percentage,
      activeText,
      endText,
      currentTooltipText,
      endTooltipText
    } = this.props
    const cx = classnames(s.container, 'ui-progress', className)
    return (
      <div className={cx}>
        <div className="ui-progress-end-text">{endText}</div>
        <div className="ui-progress-bar" style={{ width: `${percentage}%` }}>
          <span className="ui-progress-active-text">
            {!!currentTooltipText && (
              <div className="ui-progress-tooltip current-tooltip">
                {currentTooltipText}
              </div>
            )}
            {activeText}
          </span>
        </div>
        {!!endTooltipText && (
          <div className="ui-progress-tooltip end-tooltip">
            {endTooltipText}
          </div>
        )}
      </div>
    )
  }
}
