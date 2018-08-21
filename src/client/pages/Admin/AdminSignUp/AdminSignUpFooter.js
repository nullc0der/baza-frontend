import React from 'react'
import classnames from 'classnames'

const AdminSignUpFooter = props => {
    const donorCheckText = props.isDonor
        ? 'Thank you for becoming a donor'
        : 'I want to become a donor'

    const donorCheckClassName = classnames('become-donor-check', {
        'bg-success': props.isDonor
    })

    return (
        <div className="admin-signup-footer">
            <div className={donorCheckClassName} onClick={props.toggleDonorStatus}>
                {donorCheckText}
            </div>
            <div className="bottom-buttons">
                {!!props.showSkip && (
                    <div className="btn btn-info skip-button" onClick={props.onSkipClick}>
                        SKIP
                    </div>
                )}
                <div
                    className="btn btn-info btn-block submit-button"
                    onClick={props.onSubmitClick}>
                    SUBMIT
                </div>
            </div>
        </div>
    )
}

export default AdminSignUpFooter
