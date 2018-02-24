import React, { Component } from 'react'
// import TextField from 'components/ui/TextField'

import { getImageURLFromFile } from 'utils/common'

export default class DocumentsSection extends Component {
  state = {
    fileName: 'Choose a File',
    filePreview: ''
  }

  selectFile = () => {
    this.fileInput.click()
  }

  onFileChange = e => {
    const file = e.target.files[0]
    if (!file) {
      return
    }

    getImageURLFromFile(file).then(filePreview => {
      this.setState({
        fileName: file.name,
        filePreview
      })
    })
  }

  render() {
    const { fileName, filePreview } = this.state

    const imgStyles = {}

    if (filePreview) {
      imgStyles.backgroundImage = `url('${filePreview}')`
    }

    return (
      <div className="signup-section documents-section">
        <div className="section-title my-2">PROFILE IMAGE</div>
        <div className="image-preview-container" style={imgStyles} />
        <div className="input-file-control flex-horizontal a-center my-2">
          <input
            ref={node => (this.fileInput = node)}
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={this.onFileChange}
            className="file-input"
          />
          <div className="selected-file-name flex-1">{fileName}</div>
          <button className="btn btn-primary" onClick={this.selectFile}>
            BROWSE
          </button>
        </div>
      </div>
    )
  }
}
