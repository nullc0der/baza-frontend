import React from 'react'

const EditModeBar = props => {
  return (
    <div className="edit-mode-bar">
      <div className="btn btn-dark edit-button" onClick={props.onEditClick}>
        EDIT
      </div>
      <div className="btn btn-dark edit-button" onClick={props.onDiscardClick}>
        DISCARD
      </div>
    </div>
  )
}

export default EditModeBar
