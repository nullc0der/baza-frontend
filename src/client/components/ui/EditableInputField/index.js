import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import s from './EditableInputField.scss'

const EditableInputField = props => {
  const {
    className,
    inputClassName,
    isEditing = false,
    onChange,
    type,
    value,
    disabled,
    ...others
  } = props
  const cx = classnames(s.container, 'ui-editableinput', className, {
    'is-editing': !!isEditing
  })
  const inputCx = classnames('ui-editableinput-input', inputClassName)
  return (
    <span className={cx}>
      {isEditing && (
        <input
          className={inputCx}
          type={type}
          onChange={onChange}
          value={value}
          {...others}
        />
      )}
      {!isEditing && <span>{value}</span>}
    </span>
  )
}

EditableInputField.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default EditableInputField
