import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import noop from 'lodash/noop'

export const CardHeaderTab = props => {
  const cx = classnames('ui-card-header-tab', {
    'is-active': props.isActive
  })
  return (
    <div className={cx} onClick={props.onClick}>
      {props.label}
    </div>
  )
}
CardHeaderTab.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired
}
CardHeaderTab.defaultProps = {
  isActive: false
}

export const CardHeaderTabs = props => {
  const { tabs, className, onTabClick, selectedIndex } = props
  const cx = classnames('ui-card-header-tabs', className)
  return (
    <div className={cx}>
      {tabs.map((tab, index) => (
        <CardHeaderTab
          label={tab.label}
          key={index}
          onClick={e => onTabClick(tab, index)}
          isActive={index === selectedIndex}
        />
      ))}
    </div>
  )
}

CardHeaderTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape(CardHeaderTab.propTypes)),
  onTabClick: PropTypes.func
}
CardHeaderTabs.defaultProps = {
  tabs: [],
  onTabClick: noop
}
