import React from 'react'
import classnames from 'classnames'

import s from './Tabs.scss'

const Tabs = props => {
    const {
        className,
        tabClassName,
        tabs = [],
        selectedIndex,
        onTabClick
    } = props
    const cx = classnames(s.container, 'ui-tabs', className)

    return (
        <div className={cx}>
            {tabs.map((item, index) => {
                const cx = classnames('ui-tab', tabClassName, item.className, {
                    'is-selected': selectedIndex === index
                })
                return (
                    <div
                        key={index}
                        className={cx}
                        onClick={e => onTabClick(item, index)}>
                        {item.label}
                    </div>
                )
            })}
        </div>
    )
}

export default Tabs
