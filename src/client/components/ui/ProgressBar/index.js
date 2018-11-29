import React, { Component, Fragment } from 'react'
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
                {percentage === 0 && (
                    <Fragment>
                        <div className="ui-progress-start-text">
                            {activeText}
                        </div>
                        <span className="ui-progress-active-text zero-value">
                            {!!currentTooltipText && (
                                <div className="ui-progress-tooltip current-tooltip">
                                    {currentTooltipText}
                                    <div className="ui-progress-progress-sm-text">
                                        {activeText}
                                    </div>
                                </div>
                            )}
                        </span>
                    </Fragment>
                )}
                <div
                    className="ui-progress-bar ui-progress-animated"
                    style={{
                        width: `${percentage}%`,
                        padding: `${percentage === 0 && '0'}`
                    }}>
                    {percentage > 0 && (
                        <span className="ui-progress-active-text">
                            {!!currentTooltipText && (
                                <div className="ui-progress-tooltip current-tooltip">
                                    {currentTooltipText}
                                    <div className="ui-progress-progress-sm-text">
                                        {activeText}
                                    </div>
                                </div>
                            )}
                            <span className="ui-progress-progress-text">
                                {activeText}
                            </span>
                        </span>
                    )}
                </div>
                {!!endTooltipText && (
                    <div className="ui-progress-tooltip end-tooltip">
                        {endTooltipText}
                        <div className="ui-progress-end-sm-text d-md-none">
                            {endText}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
