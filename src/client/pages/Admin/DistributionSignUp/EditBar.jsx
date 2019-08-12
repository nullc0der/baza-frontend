import React from 'react'
import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'

const EditBar = props => {
    const STATUS = [
        { label: 'Pending', value: 'pending' },
        { label: 'Declined', value: 'declined' },
        { label: 'Approved', value: 'approved' }
    ]
    return (
        <div className="edit-bar">
            <div className="selected-items-count">
                <label>
                    <input type="checkbox" />1 Item Selected
                </label>
            </div>
            <div className="btn btn-dark edit-button">Mark As Violation</div>
            <div className="flex-1" />
            <div className="btn btn-dark edit-button">Reset Form</div>
            <SelectDropdown
                className="status-select-dropdown"
                id="status"
                placeholder=""
                value="Pending"
                items={STATUS}
                onChange={() => {}}
                errorState={null}
            />
            <div className="btn btn-default edit-button">
                <i className="fas fa-lock" />
            </div>
        </div>
    )
}

export default EditBar
