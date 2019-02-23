import React, { Component } from 'react'
import classnames from 'classnames'
import { Picker } from 'emoji-mart'

import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'
import DropzoneWrapper from 'components/ui/DropZoneWrapper'
import c from './ChatFooter.scss'

export default class ChatFooter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emojiButtonClicked: false,
            chatMessage: '',
            lastTypingSynchedOn: new Date(0),
            syncDelayInMillis: 1000,
            chatAttachment: null,
            attachmentModalIsOpen: false,
            attachmentTextInput: ''
        }
    }

    onEmojiButtonClick = () => {
        if (!this.state.emojiButtonClicked) {
            document.addEventListener('click', this.handleClickOutside, false)
        } else {
            document.removeEventListener(
                'click',
                this.handleClickOutside,
                false
            )
        }
        this.setState(prevState => ({
            emojiButtonClicked: !prevState.emojiButtonClicked
        }))
    }

    handleClickOutside = e => {
        if (this.emojinode.contains(e.target)) {
            return
        }
        this.onEmojiButtonClick()
    }

    onEmojiClick = (emoji, event) => {
        this.setState(prevState => ({
            chatMessage: prevState.chatMessage + ` ${emoji.colons} `
        }))
    }

    onChatSend = e => {
        const msg = e.target.value
        if (
            new Date().getTime() - this.state.lastTypingSynchedOn.getTime() >
            this.state.syncDelayInMillis
        ) {
            this.setState(
                {
                    lastTypingSynchedOn: new Date()
                },
                () => this.props.handleTypingStatus(this.props.roomId || null)
            )
        }
        this.setState({
            chatMessage: msg
        })
    }

    onAttachmentTextInputChange = (id, value) => {
        this.setState({
            attachmentTextInput: value
        })
    }

    handleSendChat = (e, fromModal = false) => {
        e.preventDefault()
        let chatMessage = this.state.chatMessage
        if (fromModal) {
            chatMessage = this.state.attachmentTextInput
        }
        if (chatMessage || this.state.chatAttachment) {
            if (this.state.chatAttachment) {
                if (this.props.roomId) {
                    this.props.handleSendChat(
                        this.props.roomId,
                        chatMessage,
                        this.state.chatAttachment[0]
                    )
                } else {
                    this.props.handleSendChat(
                        chatMessage,
                        this.state.chatAttachment[0]
                    )
                }
            } else {
                if (this.props.roomId) {
                    this.props.handleSendChat(this.props.roomId, chatMessage)
                } else {
                    this.props.handleSendChat(chatMessage)
                }
            }
            this.setState({
                chatMessage: '',
                chatAttachment: null,
                attachmentTextInput: '',
                attachmentModalIsOpen: false
            })
        }
    }

    onImageButtonClick = e => {
        e.preventDefault()
        this.toggleImageEditorModal()
    }

    onFileButtonClick = e => {
        e.preventDefault()
        this.toggleAttachmentModal()
    }

    toggleAttachmentModal = () => {
        this.setState(prevState => ({
            attachmentModalIsOpen: !prevState.attachmentModalIsOpen
        }))
    }

    onDropAttachment = acceptedFiles => {
        this.setState({
            chatAttachment: acceptedFiles
        })
    }

    onTrashClick = (e, filename) => {
        e.stopPropagation()
        this.setState({
            chatAttachment: this.state.chatAttachment.filter(
                f => f.name !== filename
            )
        })
    }

    uploadImage = (image, caption = '') => {
        this.toggleImageEditorModal()
        if (this.props.roomId) {
            this.props.handleSendChat(this.props.roomId, caption, image)
        } else {
            this.props.handleSendChat(caption, image)
        }
    }

    render() {
        const {
            className,
            small = false,
            onChatInputFocus = () => null
        } = this.props

        const cx = classnames(
            c.container,
            className,
            'chatview-footer ui-chat-footer flex-horizontal a-stretch',
            {
                'is-small': small
            }
        )

        return (
            <div className={cx}>
                <Dialog
                    className={c.attachmentDialog}
                    id="attachment-modal"
                    isOpen={this.state.attachmentModalIsOpen}
                    title="Upload file"
                    onRequestClose={this.toggleAttachmentModal}>
                    <form
                        className="form-horizontal attachment-form"
                        onSubmit={e => this.handleSendChat(e, true)}>
                        <div className="form-group">
                            <DropzoneWrapper
                                files={this.state.chatAttachment}
                                onDrop={this.onDropAttachment}
                                onTrashClick={this.onTrashClick}
                                accept={''}
                                label="Drop attachment here"
                                multiple={false}
                            />
                        </div>
                        <TextField
                            label="Description"
                            className="attachment-input"
                            id="attachmentTextInput"
                            value={this.state.attachmentTextInput}
                            onChange={this.onAttachmentTextInputChange}
                        />
                        <button
                            className="btn btn-block btn-dark"
                            onClick={e => this.handleSendChat(e, true)}>
                            Upload
                        </button>
                    </form>
                </Dialog>
                <div
                    className="btn btn-default ui-button btn-attachment"
                    onClick={this.onFileButtonClick}>
                    <i className="fa fa-paperclip" />
                </div>
                <div className="chat-input-wrap flex-1 flex-horizontal a-stretch">
                    {this.props.showTyping && (
                        <div className="chat-user-typing">
                            <span>
                                {this.props.showTypingUsername || 'User'} is
                                typing{' '}
                                <i className="fa fa-spin fa-circle-o-notch" />
                            </span>
                        </div>
                    )}
                    <form onSubmit={e => this.handleSendChat(e, false)}>
                        <input
                            className="chat-input-box"
                            type="text"
                            placeholder="Type here..."
                            spellCheck={true}
                            value={this.state.chatMessage}
                            onChange={this.onChatSend}
                            onFocus={onChatInputFocus}
                            data-lpignore={true}
                        />
                        <div
                            className="file-upload-bar"
                            style={{ width: this.props.uploadProgress + '%' }}
                        />
                        <div
                            className="chat-input-btn"
                            onClick={e => this.handleSendChat(e, false)}>
                            <i className="fa fa-paper-plane" />
                        </div>
                    </form>
                </div>
                <div
                    className="emoji-wrapper"
                    ref={node => {
                        this.emojinode = node
                    }}
                    style={{ position: 'relative', zIndex: 200 }}>
                    {this.state.emojiButtonClicked && (
                        <Picker
                            title="Pick your emoji…"
                            emoji="point_up"
                            style={{
                                position: 'absolute',
                                bottom: '55px',
                                right: '20px',
                                width: '300px'
                            }}
                            showPreview={false}
                            emojiSize={20}
                            onClick={this.onEmojiClick}
                            sheetSize={64}
                        />
                    )}
                    <div
                        className="btn btn-default ui-button emoji-button"
                        onClick={this.onEmojiButtonClick}>
                        <i className="fa fa-fw fa-smile-o" />
                    </div>
                </div>
            </div>
        )
    }
}
