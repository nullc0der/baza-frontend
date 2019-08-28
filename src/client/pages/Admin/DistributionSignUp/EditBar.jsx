import React, { Fragment } from 'react'
import find from 'lodash/find'

import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'

const EditBar = props => {
    const {
        status,
        signupID,
        editMode,
        toggleEditMode,
        selectedFieldCount,
        toggleReportViolationDialog,
        onChangeStatus
    } = props
    const STATUS = [
        { label: 'Pending', value: 'pending' },
        { label: 'Declined', value: 'declined' },
        { label: 'Approved', value: 'approved' }
    ]
    const selectedStatus = status ? find(STATUS, { value: status }).label : ''
    return (
        <div className="edit-bar">
            {!!selectedFieldCount && !!editMode && (
                <Fragment>
                    <div className="selected-items-count">
                        <label>
                            <input type="checkbox" checked readOnly />
                            {selectedFieldCount} Item Selected
                        </label>
                    </div>
                    <div
                        className="btn btn-outline-dark edit-button"
                        onClick={toggleReportViolationDialog}>
                        Mark As Violation
                    </div>
                </Fragment>
            )}
            <div className="flex-1" />
            <SelectDropdown
                className="status-select-dropdown"
                id="status"
                placeholder=""
                value={selectedStatus}
                items={STATUS}
                onChange={value => {
                    onChangeStatus(signupID, value)
                }}
                errorState={null}
            />
            <div
                className="btn btn-default edit-button lock-button"
                onClick={toggleEditMode}>
                <i
                    className={`${
                        editMode ? 'fas fa-lock-open' : 'fas fa-lock'
                    }`}
                />
            </div>
        </div>
    )
}

export default EditBar
