import React from 'react'

const ErrorBar = props => {
    const { error } = props

    return <div className="error-bar">{error}</div>
}

export default ErrorBar
