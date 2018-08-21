import React from 'react'
import classnames from 'classnames'

import Tabs from 'components/ui/Tabs'

const TABS = [
    { label: 'General' },
    { label: 'Email' },
    { label: 'Mobile No.' },
    { label: 'Docs' }
]

const AdminSignUpTabs = props => {
    const list = TABS.map((tab, index) => {
        const className = classnames({
            'is-completed': props.completedTabs.includes(index),
            'has-error': props.errorTabs.includes(index)
        })
        return {
            ...tab,
            className
        }
    })

    return (
        <Tabs
            className="admin-signup-tabs"
            tabClassName="admin-signup-tab"
            tabs={list}
            onTabClick={props.onTabClick}
            selectedIndex={props.selectedIndex}
        />
    )
}

export default AdminSignUpTabs
