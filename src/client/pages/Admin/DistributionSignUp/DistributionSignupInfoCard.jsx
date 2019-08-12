import React from 'react'
import classnames from 'classnames'

const DistributionSignupInfoCard = props => {
    const { title, className, children } = props
    const cx = classnames('info-card', className)
    return (
        <div className={cx}>
            <div className="header">{title}</div>
            <div className="body">{children}</div>
        </div>
    )
}

export default DistributionSignupInfoCard
