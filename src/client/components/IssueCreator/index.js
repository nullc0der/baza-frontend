import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import { issueCreator } from 'api/issuecreator'

import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'
import DropZoneWrapper from 'components/ui/DropZoneWrapper'

import s from './IssueCreator.scss'

class IssueCreator extends Component {
    state = {
        inputValues: {
            subject: '',
            description: '',
            attachment: null
        },
        formErrors: {
            subject: null,
            description: null,
            attachment: null,
            nonField: null
        }
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onDrop = acceptedFiles => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                attachment: prevState.inputValues.attachment
                    ? prevState.inputValues.attachment.concat(acceptedFiles)
                    : acceptedFiles
            }
        }))
    }

    onTrashClick = (e, filename) => {
        e.stopPropagation()
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                attachment: prevState.inputValues.attachment.filter(
                    f => f.name !== filename
                )
            }
        }))
    }

    onSubmitClick = e => {
        e.preventDefault()
        const data = new FormData()
        data.append('subject', this.state.inputValues.subject)
        data.append('description', this.state.inputValues.description)
        if (this.state.inputValues.attachment) {
            for (const attachment of this.state.inputValues.attachment) {
                data.append('attachments', attachment)
            }
        }
        issueCreator(data)
            .then(response => this.props.onRequestClose())
            .catch(responseData => {
                this.setState({
                    formErrors: {
                        subject: get(responseData, 'subject', null),
                        description: get(responseData, 'description', null),
                        attachment: get(responseData, 'attachments', null),
                        nonField: get(responseData, 'non_field_errors', null)
                    }
                })
            })
    }

    render() {
        const { isOpen, className, onRequestClose } = this.props
        const cx = classnames(s.container, className)
        return (
            <Dialog
                className={cx}
                isOpen={isOpen}
                title="Post an issue"
                onRequestClose={onRequestClose}>
                <form
                    className="form-horizontal issue-form"
                    onSubmit={this.onSubmitClick}>
                    <TextField
                        id="subject"
                        label="Subject"
                        className="mb-3"
                        value={this.state.inputValues.subject}
                        onChange={this.onInputChange}
                        errorState={this.state.formErrors.subject}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        className="mb-3"
                        value={this.state.inputValues.description}
                        onChange={this.onInputChange}
                        errorState={this.state.formErrors.description}
                    />
                    <DropZoneWrapper
                        files={this.state.inputValues.attachment}
                        onDrop={this.onDrop}
                        onTrashClick={this.onTrashClick}
                        maxFile={5}
                        hasError={this.state.formErrors.attachment}
                    />
                    <button
                        className="btn btn-block btn-dark"
                        onClick={this.onSubmitClick}>
                        SUBMIT
                    </button>
                </form>
            </Dialog>
        )
    }
}

export default IssueCreator
