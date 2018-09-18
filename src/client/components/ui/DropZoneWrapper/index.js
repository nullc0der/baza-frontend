import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'

import s from './DropZoneWrapper.scss'

class DropzoneWrapper extends Component {
    render() {
        const {
            files,
            onDrop,
            onTrashClick,
            accept = '.png, .jpg',
            label = 'Drop attachments here',
            multiple = true,
            maxFile = 1,
            hasError = false
        } = this.props

        return (
            <Fragment>
                <Dropzone
                    onDrop={onDrop}
                    className={s.container}
                    accept={accept}
                    multiple={multiple}>
                    <p>
                        {label}
                        {maxFile > 1 && ' (max allowed: ' + maxFile + ')'}
                    </p>
                    <div className="dropped-files">
                        <ul>
                            {files &&
                                files.map((f, i) => (
                                    <li key={i}>
                                        <i className="fa fa-paperclip" />{' '}
                                        {f.name}
                                        <i
                                            className="fa fa-trash remove-file"
                                            onClick={e =>
                                                onTrashClick(e, f.name)
                                            }
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    {hasError && <p className="text-danger">{hasError}</p>}
                </Dropzone>
            </Fragment>
        )
    }
}

export default DropzoneWrapper
