import React, { Component } from 'react'
import classnames from 'classnames'
import find from 'lodash/find'

import ReactMde, { ReactMdeCommands, ReactMdeTextHelper } from 'react-mde'

import TextField from 'components/ui/TextField'

import { uploadImage } from 'api/group-news'

class NewsEditor extends Component {
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
        newsTitle: '',
        newsTitleEditing: false,
        previewVisible: false,
        linkPopupVisible: false,
        linkPopupValues: {
            title: '',
            url: ''
        },
        editingNewsID: -1
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (
            (prevProps.editingNewsID !== this.props.editingNewsID) &
            (this.props.editingNewsID !== -1)
        ) {
            const editingNews = find(this.props.news, [
                'id',
                this.props.editingNewsID
            ])
            this.setState({
                editingNewsID: this.props.editingNewsID,
                reactMdeValue: {
                    text: editingNews.news
                },
                editorVisible: true,
                newsTitle: editingNews.title
            })
        }
    }

    handleAddNewsButtonClick = e => {
        this.setState(prevState => ({
            editorVisible: !prevState.editorVisible
        }))
    }

    handleMDEChange = value => {
        if (!value.text.length && this.state.editingNewsID !== -1) {
            this.setState(
                {
                    editingNewsID: -1,
                    newsTitle: ''
                },
                () => this.props.setEditingNewsID(-1)
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

    createOrUpdateNews = (e, shouldPublish = true) => {
        const news = this.state.reactMdeValue.text
        if (news.length) {
            const { groupID, createNews, updateNews } = this.props
            if (this.state.editingNewsID !== -1) {
                updateNews(this.state.editingNewsID, {
                    news,
                    title: this.state.newsTitle
                })
            } else {
                createNews({
                    group_id: groupID,
                    news,
                    is_published: shouldPublish,
                    title: this.state.newsTitle
                })
            }
            this.setState(
                {
                    reactMdeValue: {
                        text: ''
                    },
                    editorVisible: false,
                    editingNewsID: -1,
                    newsTitle: ''
                },
                () => this.props.setEditingNewsID(-1)
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

    onNewsTitleChange = (id, value) => {
        this.setState({
            newsTitle: value
        })
    }

    toggleNewTitleEdit = () => {
        this.setState({
            newsTitleEditing: !this.state.newsTitleEditing
        })
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

        const {
            editorVisible,
            previewVisible,
            linkPopupVisible,
            editingNewsID,
            newsTitleEditing
        } = this.state

        const cx = classnames(className, 'ui-news-editor')

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
                        className={`news-title-area ${
                            previewVisible ? 'd-none' : ''
                        }`}>
                        <TextField
                            id="news-title"
                            label="News title"
                            onChange={this.onNewsTitleChange}
                            value={this.state.newsTitle}
                            onFocus={this.toggleNewTitleEdit}
                            onBlur={this.toggleNewTitleEdit}
                        />
                    </div>
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
                            placeholder: 'Type news content here',
                            disabled: linkPopupVisible || newsTitleEditing
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
                                previewVisible ? 'Hide Preview' : 'Show Preview'
                            }`}
                            onClick={this.togglePreview}>
                            <i
                                className={`fa ${
                                    previewVisible ? 'fa-eye-slash' : 'fa-eye'
                                }`}
                            />
                        </button>
                        <button
                            className="news-btn"
                            title={`${
                                editingNewsID === -1
                                    ? 'Save and Publish News'
                                    : 'Update News'
                            }`}
                            onClick={this.createOrUpdateNews}>
                            <i className="fa fa-paper-plane" />
                        </button>
                        {!!(editingNewsID === -1) && (
                            <button
                                className="news-btn"
                                title="Save news"
                                onClick={e =>
                                    this.createOrUpdateNews(e, false)
                                }>
                                <i className="fa fa-floppy-o" />
                            </button>
                        )}
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
                    className={`add-news-btn ${
                        editorVisible ? 'editor-visible' : ''
                    }`}
                    onClick={this.handleAddNewsButtonClick}>
                    <i className="material-icons">edit</i>
                </button>
            </div>
        )
    }
}

export default NewsEditor
