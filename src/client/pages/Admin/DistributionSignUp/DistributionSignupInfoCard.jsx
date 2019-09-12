import React from 'react'
import classnames from 'classnames'

const DistributionSignupInfoCard = props => {
    const {
        title,
        className,
        children,
        editMode = false,
        inputChecked,
        editSelectedDataTypes
    } = props
    const cx = classnames('info-card', className)
    return (
        <div className={cx}>
            {!!editMode && (
                <div className="item-selector">
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={inputChecked}
                        onChange={editSelectedDataTypes}
                    />
                </div>
            )}
            <div className="card-data ml-1">
                <div className="header">{title}</div>
                <div className="body">{children}</div>
            </div>
        </div>
    )
}

export default DistributionSignupInfoCard
