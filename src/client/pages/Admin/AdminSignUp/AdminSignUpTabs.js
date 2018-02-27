import React from 'react'
import classnames from 'classnames'

import Tabs from 'components/ui/Tabs'

const TABS = [
  { label: 'General' },
  { label: 'Email' },
  { label: 'Mobile No.' },
  { label: 'Docs' }
]

// Converts a tab csv to array
// Otherwise we'll have to use a shouldComponentUpdate in this component
// Splitting and joining arrays is much faster
const parseTabs = tabString => {
  if (!tabString) {
    return []
  }
  return (tabString + '').split(',').map(x => Number(x))
}

const AdminSignUpTabs = props => {
  const completedTabs = parseTabs(props.completedTabs)
  const errorTabs = parseTabs(props.errorTabs)

  const list = TABS.map((tab, index) => {
    const className = classnames({
      'is-completed': completedTabs.includes(index),
      'has-error': errorTabs.includes(index)
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
