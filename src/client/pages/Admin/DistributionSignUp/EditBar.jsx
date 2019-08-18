import React, { Fragment } from 'react'
import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'

const EditBar = props => {
    const {
        editMode,
        toggleEditMode,
        selectedFieldCount,
        onClickMarkViolation
    } = props
    const STATUS = [
        { label: 'Pending', value: 'pending' },
        { label: 'Declined', value: 'declined' },
        { label: 'Approved', value: 'approved' }
    ]
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
                        className="btn btn-dark edit-button"
                        onClick={onClickMarkViolation}>
                        Mark As Violation
                    </div>
                </Fragment>
            )}
            <div className="flex-1" />
            <SelectDropdown
                className="status-select-dropdown"
                id="status"
                placeholder=""
                value="Pending"
                items={STATUS}
                onChange={() => {}}
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
