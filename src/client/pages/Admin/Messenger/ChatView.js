import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import _ from 'lodash'
import Swipeable from 'react-swipeable'

import c from './Messenger.scss'

import ChatBodyItem from 'components/ChatBodyItem'
import ChatFooter from 'components/ChatFooter'

import { actions as messengerActions } from 'store/Messenger'
import { actions as commonActions } from 'store/Common'

import { updateMessageStatus } from 'api/messenger'

class ChatView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedMessages: [],
            optionsOpen: false,
            userTyping: false
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        const chats = this.props.chats[this.props.selected]
        const profile = this.props.profile
        if (prevProps.selected !== this.props.selected) {
            if (!chats) {
                this.props.fetchData(this.props.selected)
            } else {
                let unreadIds = chats.filter(
                    x =>
                        !x.read &
                        (x.user.username !==
                            (profile.username || profile.user.username))
                )
                if (unreadIds) {
                    this.handleUnreadChat(unreadIds)
                }
                this.scrollToBottom()
            }
        }
        if (
            prevProps.chats[this.props.selected] !==
            this.props.chats[this.props.selected]
        ) {
            let unreadIds = chats.filter(
                x =>
                    !x.read &
                    (x.user.username !==
                        (profile.username || profile.user.username))
            )
            if (unreadIds) {
                this.handleUnreadChat(unreadIds)
            }
            this.scrollToBottom()
        }
        if (prevProps.userTyping !== this.props.userTyping) {
            this.setState({
                userTyping: this.props.userTyping === this.props.selected
            })
        }
    }

    handleUnreadChat = unreadChats => {
        let chatArr = []
        for (const unreadChat of unreadChats) {
            chatArr.push(unreadChat.id)
        }
        if (chatArr.length) {
            updateMessageStatus({ message_ids: chatArr }).then(res => {
                this.props.updateRoom(this.props.selected)
                this.props.updateChatReadStatus(this.props.selected, chatArr)
            })
        }
    }

    handleSelectedMessage = (messageId, shouldSelect) => {
        if (shouldSelect) {
            let selectedMessages = this.state.selectedMessages
            let messages = _.includes(selectedMessages, messageId)
                ? selectedMessages.filter(x => x !== messageId)
                : selectedMessages.concat(messageId)
            this.setState({
                selectedMessages: messages
            })
        }
    }

    handleOptions = () => {
        this.setState(prevState => ({
            optionsOpen: !prevState.optionsOpen
        }))
    }

    componentDidMount = () => {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
        }
    }

    closeChatView = () => {
        $('.' + c.chatView).removeClass('is-open fullscreen')
        if ($(window).width() < 768) {
            this.props.updateHeaderVisibility(true)
        }
    }

    handleSendChat = (content, file = null) => {
        if (file) {
            const data = new FormData()
            data.append('content', content)
            data.append('file', file)
            this.props
                .sendChat(
                    this.props.selected,
                    data,
                    true,
                    this.onFileUploadProgressChange
                )
                .then(res => {
                    this.props.fileUploadProgress(this.props.selected, 0)
                })
                .catch(res => {
                    this.props.fileUploadProgress(this.props.selected, 0)
                })
        } else {
            this.props.sendChat(
                this.props.selected,
                { content: content },
                false
            )
        }
    }

    onFileUploadProgressChange = value => {
        let uploadDonePercent = 0
        if (value.lengthComputable) {
            uploadDonePercent = (value.loaded / value.total) * 100
        }
        this.props.fileUploadProgress(this.props.selected, uploadDonePercent)
    }

    handleDelete = e => {
        e.preventDefault()
        this.props.deleteRoom(this.props.selected)
        this.props.selectNext()
        this.setState(prevState => ({
            optionsOpen: !prevState.optionsOpen
        }))
    }

    handleDeleteChat = e => {
        e.preventDefault()
        if (this.state.selectedMessages.length) {
            this.props
                .deleteChats(this.props.selected, this.state.selectedMessages)
                .then(res => {
                    this.setState(prevState => ({
                        optionsOpen: !prevState.optionsOpen,
                        selectedMessages: []
                    }))
                })
        }
    }

    handleDialogs = e => {
        if (this.state.optionsOpen) {
            this.setState({
                optionsOpen: false
            })
        }
    }

    handleTypingStatus = () => {
        this.props.sendTypingStatus({
            chatroom_id: this.props.selected,
            at_time: new Date().toLocaleDateString()
        })
    }

    chatViewBodySwipedDown = (e, deltaY, isFlick) => {
        if (isFlick && $(window).width() < 768) {
            this.props.updateHeaderVisibility(true)
            $('.' + c.chatView).removeClass('fullscreen')
        }
    }

    chatViewBodySwipedUp = (e, deltaY, isFlick) => {
        if (isFlick && $(window).width() < 768) {
            this.props.updateHeaderVisibility(false)
            $('.' + c.chatView).addClass('fullscreen')
        }
    }

    chatFooterInputFocus = () => {
        if ($(window).width() < 768) {
            this.props.updateHeaderVisibility(false)
            $('.' + c.chatView).addClass('fullscreen')
        }
    }

    render() {
        const { className, chats, title, selected, profile } = this.props

        const cx = classnames(c.chatView, className, 'flex-vertical')
        const chat = chats[selected]

        const deleteString =
            this.state.selectedMessages.length > 1
                ? `Delete Selected Messages (${
                      this.state.selectedMessages.length
                  })`
                : 'Delete Selected Message'

        return (
            <div className={cx} onClick={this.handleDialogs}>
                <div className="chatview-header flex-horizontal a-center">
                    {/*<div className='text-muted text-session-id'> Session ID: #3949aaudh1 </div>*/}
                    <div className="text-username text-center flex-1">
                        {' '}
                        {title}{' '}
                    </div>
                    <div className="header-options">
                        {chat && (
                            <Fragment>
                                <button
                                    type="button"
                                    className="btn btn-link btn-sm dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <i className="fa fa-fw fa-ellipsis-v" />
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div
                                        className="dropdown-item"
                                        onClick={this.handleDelete}>
                                        Delete This Room
                                    </div>
                                    {!!this.state.selectedMessages.length && (
                                        <div
                                            className="dropdown-item"
                                            onClick={this.handleDeleteChat}>
                                            {deleteString}
                                        </div>
                                    )}
                                </div>
                            </Fragment>
                        )}
                        <div
                            onClick={this.closeChatView}
                            className="mobile-close-chat">
                            <i className="fa fa-fw fa-times" />
                        </div>
                    </div>
                </div>
                <Swipeable
                    className="chatview-body flex-1"
                    onSwipedDown={this.chatViewBodySwipedDown}
                    onSwipedUp={this.chatViewBodySwipedUp}>
                    {chat && (
                        <Fragment>
                            {chat.map((x, i) => {
                                return (
                                    <ChatBodyItem
                                        key={i}
                                        user={x.user}
                                        message={x.message}
                                        fileurl={x.fileurl}
                                        filetype={x.filetype}
                                        filename={x.filename}
                                        message_id={x.id}
                                        stamp={new Date(x.timestamp)}
                                        left={
                                            x.user.username !==
                                            (profile.username ||
                                                profile.user.username)
                                        }
                                        selected={_.includes(
                                            this.state.selectedMessages,
                                            x.id
                                        )}
                                        onSelected={this.handleSelectedMessage}
                                    />
                                )
                            })}
                            <div
                                style={{ float: 'left', clear: 'both' }}
                                ref={el => {
                                    this.messagesEnd = el
                                }}
                            />
                        </Fragment>
                    )}
                </Swipeable>
                {chat && (
                    <ChatFooter
                        handleSendChat={this.handleSendChat}
                        handleTypingStatus={this.handleTypingStatus}
                        showTyping={this.state.userTyping}
                        showTypingUsername={title}
                        uploadProgress={
                            this.props.uploadProgress.roomId === selected
                                ? this.props.uploadProgress.progress
                                : 0
                        }
                        onChatInputFocus={this.chatFooterInputFocus}
                    />
                )}
            </div>
        )
    }
}

ChatView.propTypes = {
    chats: PropTypes.object.isRequired,
    selected: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasError: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
    sendChat: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    deleteChats: PropTypes.func.isRequired,
    updateHeaderVisibility: PropTypes.func.isRequired,
    updateChatReadStatus: PropTypes.func.isRequired,
    uploadProgress: PropTypes.object
}

const mapStateToProps = state => ({
    chats: state.Messenger.chats,
    selected: state.Messenger.selected,
    isLoading: state.Messenger.isLoading,
    hasError: state.Messenger.hasError,
    uploadProgress: state.Messenger.uploadProgress,
    profile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchData: roomId => dispatch(messengerActions.chatsFetchData(roomId)),
    sendChat: (roomId, datas, containsFile, uploadProgressFn) =>
        dispatch(
            messengerActions.chatSend(
                roomId,
                datas,
                containsFile,
                uploadProgressFn
            )
        ),
    updateRoom: roomId => dispatch(messengerActions.readStatusUpdated(roomId)),
    deleteRoom: roomId => dispatch(messengerActions.deleteChatRoom(roomId)),
    deleteChats: (roomId, chatIds) =>
        dispatch(messengerActions.deleteChats(roomId, chatIds)),
    updateChatReadStatus: (roomId, chatIds) =>
        dispatch(messengerActions.updateChatReadStatus(roomId, chatIds)),
    fileUploadProgress: (roomId, value) =>
        dispatch(messengerActions.fileUploadProgress(roomId, value)),
    sendTypingStatus: roomId =>
        dispatch(messengerActions.sendTypingStatus(roomId)),
    updateHeaderVisibility: visibile =>
        dispatch(commonActions.updateHeaderVisibility(visibile))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatView)
