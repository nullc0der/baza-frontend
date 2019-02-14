import React, { Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import s from './EditableInputField.scss'

const EditableInputField = props => {
    const {
        id,
        className,
        inputClassName,
        isEditing = false,
        onChange,
        type,
        value,
        disabled,
        hasError,
        ...others
    } = props
    const cx = classnames(s.container, 'ui-editableinput', className, {
        'is-editing': !!isEditing
    })
    const inputCx = classnames('ui-editableinput-input', inputClassName)
    return (
        <span className={cx}>
            {isEditing && (
                <Fragment>
                    <input
                        className={inputCx}
                        type={type}
                        onChange={e => onChange(id, e.target.value)}
                        value={value}
                        {...others}
                    />
                    {hasError && (
                        <span className="text-danger">{hasError}</span>
                    )}
                </Fragment>
            )}
            {!isEditing && <span>{value}</span>}
        </span>
    )
}

EditableInputField.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default EditableInputField
