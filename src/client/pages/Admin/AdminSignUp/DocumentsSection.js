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

    removeImage = () => {
        this.setState(
            {
                fileName: 'Choose a File',
                filePreview: ''
            },
            () => this.props.removeSignupImage()
        )
    }

    onFileChange = e => {
        const file = e.target.files[0]
        if (!file) {
            return
        }

        getImageURLFromFile(file).then(filePreview => {
            this.setState(
                {
                    fileName: file.name,
                    filePreview
                },
                () => this.props.addSignupImage(file)
            )
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
                <div className="section-title my-2">IMAGE PREVIEW</div>
                <div className="image-preview-container" style={imgStyles}>
                    <div
                        className={`image-remove-btn ${
                            !!filePreview ? 'd-block' : 'd-none'
                        }`}
                        title="Remove Image"
                        onClick={this.removeImage}>
                        <i className="fa fa-times-circle" />
                    </div>
                </div>
                <div className="input-file-control flex-horizontal a-center my-2">
                    <input
                        ref={node => (this.fileInput = node)}
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        onChange={this.onFileChange}
                        className="file-input"
                    />
                    <div className="selected-file-name flex-1">{fileName}</div>
                    <button
                        className="btn btn-primary"
                        onClick={this.selectFile}>
                        BROWSE
                    </button>
                </div>
                <div className="upload-guidelines mt-2">
                    <div className="guideline-dashed font-weight-bold">
                        IMAGE UPLOAD GUIDELINES
                    </div>
                    <div className="guideline-dashed">
                        Upload a recent photo of yourself or image proof of
                        identification
                    </div>
                    <div className="guideline">
                        <div className="label">Format</div>
                        <div className="value">JPG, JPEG, PNG</div>
                    </div>
                    <div className="guideline">
                        <div className="label">Size</div>
                        <div className="value">512px X 512px (min)</div>
                    </div>
                </div>
            </div>
        )
    }
}
