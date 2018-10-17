import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import _ from 'lodash'

import c from './Messenger.styl'

import ChatBodyItem from 'components/ChatBodyItem'
import ChatFooter from 'components/ChatFooter'

import { actions as messengerActions } from 'store/Messenger'

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
                this.props.fetchData(this.state.selected)
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
                this.props.updateChatReadStatus(this.state.roomId, chatArr)
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
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
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
            this.props.sendChat(this.props.selected, data, true)
        } else {
            this.props.sendChat(
                this.props.selected,
                { content: content },
                false
            )
        }
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

    renderOptions = () => {
        const deleteString =
            this.state.selectedMessages.length > 1
                ? `Delete Selected Messages (${
                      this.state.selectedMessages.length
                  })`
                : 'Delete Selected Message'
        return (
            <ul
                className="dropdown-menu animated fadeIn"
                style={{ left: 'auto', right: 0 }}>
                <li>
                    <a href="#" onClick={this.handleDelete}>
                        Delete This Room
                    </a>
                </li>
                {this.state.selectedMessages.length > 0 && (
                    <li>
                        <a href="#" onClick={this.handleDeleteChat}>
                            {deleteString}
                        </a>
                    </li>
                )}
            </ul>
        )
    }

    render() {
        const { className, chats, title, selected, profile } = this.props

        const cx = classnames(c.chatView, className, 'flex-vertical')
        const chat = chats[selected]

        return (
            <div className={cx} onClick={this.handleDialogs}>
                <div className="chatview-header flex-horizontal a-center">
                    {/*<div className='text-muted text-session-id'> Session ID: #3949aaudh1 </div>*/}
                    <div className="text-username text-center flex-1">
                        {' '}
                        {title}{' '}
                    </div>
                    <div className="header-options">
                        <div
                            className={
                                this.state.optionsOpen
                                    ? 'dropdown open'
                                    : 'dropdown'
                            }>
                            {this.renderOptions()}
                        </div>
                        <div
                            className="btn btn-default ui-button"
                            onClick={this.handleOptions}>
                            <i className="fas fa-ellipsis-v" />
                        </div>
                        <div
                            onClick={this.closeChatView}
                            className="btn btn-default btn-chat ui-button mobile-close-chat">
                            <i className="fas fa-times" />
                        </div>
                    </div>
                </div>
                {chat &&
                    chat.map((x, i) => {
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
                                    (profile.username || profile.user.username)
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
                />
            </div>
        )
    }
}

ChatView.propTypes = {
    chats: PropTypes.object.isRequired,
    selected: PropTypes.number.isRequired,
    areLoading: PropTypes.bool.isRequired,
    hasErrored: PropTypes.bool.isRequired,
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
    chats: state.Chat.chats,
    selected: state.ChatRooms.selected,
    isLoading: state.Chat.isLoading,
    hasError: state.Chat.hasError,
    uploadProgress: state.Chat.uploadProgress,
    profile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchData: roomId => dispatch(messengerActions.chatsFetchData(roomId)),
    sendChat: (roomId, datas, containsFile) =>
        dispatch(messengerActions.chatSend(roomId, datas, containsFile)),
    updateRoom: roomId => dispatch(messengerActions.readStatusUpdated(roomId)),
    deleteRoom: roomId => dispatch(messengerActions.deleteChatRoom(roomId)),
    deleteChats: datas => dispatch(messengerActions.deleteChats(datas)),
    updateChatReadStatus: (roomId, chatIds) =>
        dispatch(messengerActions.updateChatReadStatus(roomId, chatIds))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatView)
