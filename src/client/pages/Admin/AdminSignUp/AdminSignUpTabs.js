import React from 'react'
import classnames from 'classnames'

const TABS = [
  { name: 'Name & Address' },
  { name: 'Email' },
  { name: 'Mobile No.' },
  { name: 'Docs' }
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

  return (
    <div className="admin-signup-tabs">
      {TABS.map((tab, index) => {
        const tabClassName = classnames('admin-signup-tab', {
          'is-completed': completedTabs.includes(index),
          'is-selected': props.selectedIndex === index,
          'has-error': errorTabs.includes(index)
        })
        return (
          <div
            className={tabClassName}
            onClick={e => props.onTabClick(tab, index)}>
            {tab.name}
          </div>
        )
      })}
    </div>
  )
}

export default AdminSignUpTabs
