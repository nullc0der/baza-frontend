import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export const CardOptionsDropdown = props => {
  const { className, options = [], onCardOptionClick } = props

  const cx = classnames('ui-card-options-dropdown dropdown', className)
  return (
    <div className={cx}>
      <div className="dropdown-toggle">
        <i className="fa fa-ellipsis-v" />
      </div>
      <div className="dropdown-menu dropdown-menu-right">
        {options.map((option, index) => (
          <div
            className="dropdown-item"
            key={index}
            onClick={onCardOptionClick}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export const CardOptionsDropdownItemShape = PropTypes.shape({
  label: PropTypes.string
})

CardOptionsDropdown.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(CardOptionsDropdownItemShape),
  onCardOptionClick: PropTypes.func
}

CardOptionsDropdown.defaultProps = {
  options: [],
  onCardOptionClick: function emptyOnCardOptionClick() {}
}
