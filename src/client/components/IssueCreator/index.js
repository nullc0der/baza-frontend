import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'
import mapKeys from 'lodash/mapKeys'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import { createIssue, getIssueTypes } from 'api/issuecreator'

import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'
import DropZoneWrapper from 'components/ui/DropZoneWrapper'
import SelectDropdown from 'components/ui/SelectDropdown/SimpleSelectDropdown'

import s from './IssueCreator.scss'

class IssueCreator extends Component {
    state = {
        inputValues: {
            subject: '',
            description: '',
            issueTypeID: '',
            attachment: null
        },
        formErrors: {
            subject: null,
            description: null,
            attachment: null,
            issueTypeID: null,
            nonField: null
        },
        submitDisabled: false,
        issueTypes: []
    }

    componentDidMount = () => {
        getIssueTypes().then(res => {
            const issueTypes = get(res, 'data', []).map(x =>
                mapKeys(x, (v, k) =>
                    k === 'name' ? 'label' : k === 'id' ? 'value' : k
                )
            )
            this.setState({
                issueTypes
            })
        })
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onDDChange = value => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                issueTypeID: value
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
        this.setState({
            submitDisabled: true
        })
        const data = new FormData()
        data.append('subject', this.state.inputValues.subject)
        data.append('description', this.state.inputValues.description)
        data.append('issue_type_id', this.state.inputValues.issueTypeID)
        if (this.state.inputValues.attachment) {
            for (const attachment of this.state.inputValues.attachment) {
                data.append('attachments', attachment)
            }
        }
        createIssue(data)
            .then(response =>
                this.setState(
                    {
                        inputValues: {
                            subject: '',
                            description: '',
                            attachment: null
                        },
                        formErrors: {
                            subject: null,
                            description: null,
                            attachment: null,
                            nonField: null,
                            issueTypeID: null
                        },
                        submitDisabled: false
                    },
                    () => this.props.onRequestClose()
                )
            )
            .catch(responseData => {
                this.setState({
                    formErrors: {
                        subject: get(responseData, 'subject', null),
                        description: get(responseData, 'description', null),
                        attachment: get(responseData, 'attachments', null),
                        nonField: get(responseData, 'non_field_errors', null),
                        issueTypeID: get(responseData, 'issue_type_id', null)
                    },
                    submitDisabled: false
                })
            })
    }

    render() {
        const { isOpen, className, onRequestClose } = this.props
        const cx = classnames(s.container, className)
        const ddValue = find(this.state.issueTypes, {
            value: this.state.inputValues.issueTypeID
        })
        return (
            <Dialog
                className={cx}
                isOpen={isOpen}
                title="Post an issue"
                onRequestClose={onRequestClose}>
                <SelectDropdown
                    className="mb-3 issue-dropdown"
                    id="issueType"
                    placeholder="Issue Type"
                    value={isEmpty(ddValue) ? '' : ddValue.label}
                    items={this.state.issueTypes}
                    onChange={this.onDDChange}
                />
                {!!this.state.formErrors.issueTypeID && (
                    <p className="text-danger">
                        {this.state.formErrors.issueTypeID}
                    </p>
                )}
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
                    className={
                        this.state.formErrors.attachment ? 'mb-3' : 'mb-2'
                    }
                    files={this.state.inputValues.attachment}
                    onDrop={this.onDrop}
                    onTrashClick={this.onTrashClick}
                    maxFile={5}
                    hasError={this.state.formErrors.attachment}
                />
                <button
                    className="btn btn-block btn-dark"
                    onClick={this.onSubmitClick}
                    disabled={this.state.submitDisabled}>
                    SUBMIT
                </button>
            </Dialog>
        )
    }
}

export default IssueCreator
