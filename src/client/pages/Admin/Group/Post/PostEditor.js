import React, { Component } from 'react'
import classnames from 'classnames'
import find from 'lodash/find'

import ReactMde, { ReactMdeCommands, ReactMdeTextHelper } from 'react-mde'

import { uploadImage } from 'api/group-post'

class PostEditor extends Component {
    state = {
        editorVisible: false,
        reactMdeValue: { text: '' },
        previewVisible: false,
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
                } = ReactMdeTextHelper.insertText(text, '![', selection.start)
                const finalText = ReactMdeTextHelper.insertText(
                    newText,
                    `${fileName}](${res.data.image_url})`,
                    selection.end + insertionLength
                ).newText
                this.setState({
                    reactMdeValue: {
                        text: finalText,
                        scrollTop,
                        selection
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
                updatePost(groupID, post)
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

    imageCommand = {
        icon: 'image',
        tooltip: 'Insert a picture',
        execute: (text, selection) => {
            $('#imageInput').click()
            return {
                text: text,
                selection: selection
            }
        }
    }

    render() {
        const { className } = this.props

        const { editorVisible, previewVisible } = this.state

        const cx = classnames(className, 'ui-post-editor')

        let editorCommands = [
            ReactMdeCommands.getDefaultCommands()[0],
            ReactMdeCommands.getDefaultCommands()[1].slice(0, 3),
            ReactMdeCommands.getDefaultCommands()[2]
        ]
        editorCommands.push([this.imageCommand])

        return (
            <div className={cx}>
                <div
                    className={`editor-area ${editorVisible ? 'visible' : ''}`}>
                    <ReactMde
                        textAreaProps={{ placeholder: 'Type here' }}
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
                        buttonContentOptions={{
                            iconProvider: name => (
                                <i className={`fa fa-${name}`} />
                            )
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
