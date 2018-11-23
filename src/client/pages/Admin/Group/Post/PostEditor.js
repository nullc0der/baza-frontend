import React, { Component } from 'react'
import classnames from 'classnames'
import find from 'lodash/find'

import ReactMde, { ReactMdeCommands, ReactMdeTextHelper } from 'react-mde'

import TextField from 'components/ui/TextField'

import { uploadImage } from 'api/group-post'

class PostEditor extends Component {
    state = {
        editorVisible: false,
        reactMdeValue: {
            text: '',
            scrollTop: 0,
            selection: {
                end: 0,
                start: 0
            }
        },
        previewVisible: false,
        linkPopupVisible: false,
        linkPopupValues: {
            title: '',
            url: ''
        },
        editingPost: -1
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (
            (prevProps.editingPost !== this.props.editingPost) &
            (this.props.editingPost !== -1)
        ) {
            this.setState({
                editingPost: this.props.editingPost,
                reactMdeValue: {
                    text: find(this.props.posts, ['id', this.props.editingPost])
                        .post
                },
                editorVisible: true
            })
        }
    }

    handleAddPostButtonClick = e => {
        this.setState(prevState => ({
            editorVisible: !prevState.editorVisible
        }))
    }

    handleMDEChange = value => {
        if (!value.text.length && this.state.editingPost !== -1) {
            this.setState(
                {
                    editingPost: -1
                },
                () => this.props.updateEditingPost(-1)
            )
        }
        this.setState({
            reactMdeValue: value
        })
    }

    togglePreview = e => {
        this.setState(prevState => ({
            previewVisible: !prevState.previewVisible
        }))
    }

    onImageInputChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            const fileName = image.name
            const data = new FormData()
            data.append('image', image)
            uploadImage(data).then(res => {
                const { text, selection, scrollTop } = this.state.reactMdeValue
                const {
                    newText,
                    insertionLength
                } = ReactMdeTextHelper.insertText(text, ' ![', selection.start)
                const finalText = ReactMdeTextHelper.insertText(
                    newText,
                    `${fileName}](${res.data.image_url}) `,
                    selection.end + insertionLength
                ).newText
                this.setState({
                    reactMdeValue: {
                        text: finalText,
                        scrollTop,
                        selection: {
                            start: finalText.length,
                            end: finalText.length
                        }
                    }
                })
            })
        }
    }

    createOrUpdatePost = e => {
        const post = this.state.reactMdeValue.text
        if (post.length) {
            const { groupID, createPost, updatePost } = this.props
            if (this.state.editingPost !== -1) {
                updatePost(this.state.editingPost, { post })
            } else {
                createPost({ group_id: groupID, post })
            }
            this.setState(
                {
                    reactMdeValue: {
                        text: ''
                    },
                    editorVisible: false,
                    editingPost: -1
                },
                () => this.props.updateEditingPost(-1)
            )
        }
    }

    toggleLinkPopup = () => {
        this.setState({
            linkPopupVisible: !this.state.linkPopupVisible,
            linkPopupValues: {
                title: '',
                url: ''
            }
        })
    }

    onLinkPopupInputChange = (id, value) => {
        this.setState(prevState => ({
            linkPopupValues: {
                ...prevState.linkPopupValues,
                [id]: value
            }
        }))
    }

    onClickInsertLink = () => {
        const { text, selection, scrollTop } = this.state.reactMdeValue
        let { title, url } = this.state.linkPopupValues
        if (!url.startsWith('http')) {
            url = 'http://' + url
        }
        const { newText, insertionLength } = ReactMdeTextHelper.insertText(
            text,
            ' [',
            selection.start
        )
        const finalText = ReactMdeTextHelper.insertText(
            newText,
            `${title}](${url}) `,
            selection.end + insertionLength
        ).newText
        this.setState({
            reactMdeValue: {
                text: finalText,
                scrollTop,
                selection: {
                    start: finalText.length,
                    end: finalText.length
                }
            },
            linkPopupVisible: !this.state.linkPopupVisible,
            linkPopupValues: {
                title: '',
                url: ''
            }
        })
    }

    imageCommand = {
        icon: 'image',
        tooltip: 'Insert a picture',
        execute: (text, selection) => {
            $('#imageInput').click()
            return {
                text,
                selection
            }
        }
    }

    insertLinkCommand = {
        icon: 'link',
        tooltip: 'Insert a link',
        execute: (text, selection) => {
            this.toggleLinkPopup()
            return {
                text,
                selection
            }
        }
    }

    render() {
        const { className } = this.props

        const { editorVisible, previewVisible, linkPopupVisible } = this.state

        const cx = classnames(className, 'ui-post-editor')

        let editorCommands = [
            ReactMdeCommands.getDefaultCommands()[0],
            ReactMdeCommands.getDefaultCommands()[1].slice(1, 3),
            ReactMdeCommands.getDefaultCommands()[2]
        ]
        editorCommands.push([this.imageCommand, this.insertLinkCommand])

        return (
            <div className={cx}>
                <div
                    className={`editor-area ${editorVisible ? 'visible' : ''}`}>
                    <div
                        className={`link-popup ${!!linkPopupVisible &&
                            'visible'}`}>
                        <TextField
                            id="title"
                            className="mb-2"
                            label="Title"
                            onChange={this.onLinkPopupInputChange}
                            value={this.state.linkPopupValues.title}
                        />
                        <TextField
                            id="url"
                            className="mb-2"
                            label="Url"
                            onChange={this.onLinkPopupInputChange}
                            value={this.state.linkPopupValues.url}
                        />
                        <div className="d-flex actions-row">
                            <div className="flex-1" />
                            <div
                                className="badge badge-pill badge-dark badge-dense"
                                onClick={this.onClickInsertLink}
                                title="add">
                                <i className="fa fa-check" />
                            </div>
                            <div
                                className="badge badge-pill badge-dark badge-dense"
                                title="cancel"
                                onClick={this.toggleLinkPopup}>
                                <i className="fa fa-remove" />
                            </div>
                        </div>
                    </div>
                    <ReactMde
                        textAreaProps={{
                            placeholder: 'Type here',
                            disabled: linkPopupVisible
                        }}
                        value={this.state.reactMdeValue}
                        visibility={{
                            preview: previewVisible,
                            previewHelp: false,
                            textarea: !previewVisible,
                            toolbar: !previewVisible
                        }}
                        onChange={this.handleMDEChange}
                        commands={editorCommands}
                        showdownOptions={{
                            simpleLineBreaks: true
                        }}
                    />
                    <div className="action-buttons">
                        <button
                            className="preview-btn"
                            title={`${
                                previewVisible ? 'hide preview' : 'show preview'
                            }`}
                            onClick={this.togglePreview}>
                            <i
                                className={`fa ${
                                    previewVisible ? 'fa-eye-slash' : 'fa-eye'
                                }`}
                            />
                        </button>
                        <button
                            className="post-btn"
                            title="post"
                            onClick={this.createOrUpdatePost}>
                            <i className="fa fa-paper-plane" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={this.onImageInputChange}
                            id="imageInput"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <button
                    className={`add-post-btn ${
                        editorVisible ? 'editor-visible' : ''
                    }`}
                    onClick={this.handleAddPostButtonClick}>
                    <i className="material-icons">edit</i>
                </button>
            </div>
        )
    }
}

export default PostEditor
