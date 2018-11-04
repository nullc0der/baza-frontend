import React, { Component } from 'react'
import classnames from 'classnames'

import s from './DonationProgressBar.scss'

export default class DonationProgressBar extends Component {
    state = {
        progress: 70
    }

    render() {

        const {
            className,
            min = 0,
            max = 100,
            value = 10
        } = this.props

        const cx = classnames(s.container, 'donation-progress-bar', className)

        const width = ((value - min) * 100 / max);

        return (
            <div className={cx}>
                <div className='progress'>
                    <div className='progress-bar progress-bar-striped bg-primary clearfix' style={{ width: `${width}%` }}>
                        <div className="align-self-end pr-3">
                            {/* <span className='value'> ${value} </span> */}
                            <div className='tooltip tooltip-value show bs-tooltip-bottom' role='tooltip'>
                                <div className='arrow' />
                                <div className='tooltip-inner'>
                                    <b>${value}</b> Donated
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='max-value'>
                        {/* <span> ${max} </span> */}
                        <div className='tooltip tooltip-max-value show bs-tooltip-top' role='tooltip'>
                            <div className='arrow' />
                            <div className='tooltip-inner'>
                                <b>${max}</b> Goal
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

