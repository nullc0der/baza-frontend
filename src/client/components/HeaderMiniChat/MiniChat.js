import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import _ from 'lodash'

import c from './HeaderMiniChat.scss'
import MiniChatBox from './MiniChatBox'

import { actions as messengerActions } from 'store/Messenger'
import { updateMessageStatus } from 'api/messenger'

class MiniChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openChats: [],
            selectedMessages: {}
        }
        this.websocketTypingTimeout = null
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevProps.chats !== this.props.chats ||
            prevProps.miniChats !== this.props.miniChats
        ) {
            this.filterChats(this.props.chats, this.props.miniChats)
        }
    }

    handleSelectedMessage = (roomId, messageId, shouldSelect) => {
        if (shouldSelect) {
            let messages = [messageId]
            let selectedMessages = this.state.selectedMessages[roomId]
            if (selectedMessages) {
                messages = _.includes(selectedMessages, messageId)
                    ? selectedMessages.filter(x => x !== messageId)
                    : selectedMessages.concat(messageId)
            }
            this.setState(prevState => ({
                selectedMessages: Object.assign(
                    {},
                    prevState.selectedMessages,
                    { [roomId]: messages }
                )
            }))
        }
    }

    filterChats = (chats, miniChats) => {
        let openChats = []
        for (const miniChat of miniChats) {
            if (chats[miniChat]) {
                let chat = {
                    username: this.getTitle(miniChat),
                    roomId: miniChat,
                    messages: chats[miniChat]
                }
                openChats.push(chat)
            } else {
                this.props.fetchData(miniChat)
            }
        }
        this.setState({ openChats: openChats })
    }

    getTitle = selected => {
        for (const room of this.props.rooms) {
            if (room.id === selected) {
                return room.user.username
            }
        }
    }

    closeChat = roomId => e => {
        this.props.closeMiniChat(roomId)
    }

    handleSendChat = (roomId, content, file = null) => {
        if (file) {
            const data = new FormData()
            data.append('content', content)
            data.append('file', file)
            this.props
                .sendChat(roomId, data, true, this.onFileUploadProgressChange)
                .then(res => {
                    this.props.fileUploadProgress(this.props.selected, 0)
                })
                .catch(res => {
                    this.props.fileUploadProgress(this.props.selected, 0)
                })
        } else {
            this.props.sendChat(roomId, { content: content }, false)
        }
    }

    onFileUploadProgressChange = value => {
        let uploadDonePercent = 0
        if (value.lengthComputable) {
            uploadDonePercent = (value.loaded / value.total) * 100
        }
        this.props.fileUploadProgress(this.props.selected, uploadDonePercent)
    }

    handleDeleteChat = roomId => {
        if (
            this.state.selectedMessages[roomId] &&
            this.state.selectedMessages[roomId].length
        ) {
            this.props.deleteChats(roomId, this.state.selectedMessages[roomId])
        }
        this.setState(prevState => ({
            selectedMessages: Object.assign({}, prevState.selectedMessages, {
                [roomId]: []
            })
        }))
    }

    toggleMinimise = e => {
        var $btn = $(e.currentTarget)
        var $chat = $btn.parents('.mini-chat')

        if ($chat.hasClass('is-minimized')) {
            $btn.find('.fa')
                .removeClass('fa-window-maximize')
                .addClass('fa-window-minimize')
            $chat.removeClass('is-minimized')
        } else {
            $btn.find('.fa')
                .removeClass('fa-window-minimize')
                .addClass('fa-window-maximize')
            $chat.addClass('is-minimized')
        }
    }

    handleTypingStatus = roomId => {
        this.props.sendTypingStatus({
            chatroom_id: roomId,
            at_time: new Date().toLocaleDateString()
        })
    }

    handleUnreadChat = (roomId, unreadChats) => {
        let chatArr = []
        for (const unreadChat of unreadChats) {
            chatArr.push(unreadChat.id)
        }
        if (chatArr.length) {
            updateMessageStatus({ message_ids: chatArr }).then(res => {
                this.props.updateRoom(roomId)
                this.props.updateChatReadStatus(roomId, chatArr)
            })
        }
    }

    render() {
        const { className } = this.props
        const cx = classnames(
            c.miniChatHolder,
            className,
            'mini-chat-holder',
            'flex-horizontal'
        )
        return (
            <div className={cx}>
                {this.state.openChats &&
                    this.state.openChats.map((x, i) => {
                        return (
                            <MiniChatBox
                                key={i}
                                chat={x}
                                selectedMessages={this.state.selectedMessages}
                                uploadProgress={this.props.uploadProgress}
                                onlineUsers={this.props.onlineUsers}
                                handleDeleteChat={this.handleDeleteChat}
                                toggleMinimise={this.toggleMinimise}
                                closeChat={this.closeChat}
                                handleSelectedMessage={
                                    this.handleSelectedMessage
                                }
                                handleSendChat={this.handleSendChat}
                                handleTypingStatus={this.handleTypingStatus}
                                webSocketTypingStatus={
                                    this.props.websocketTypingStatus
                                }
                                handleUnreadChat={this.handleUnreadChat}
                                userProfile={this.props.userProfile}
                            />
                        )
                    })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    chats: state.Messenger.chats,
    rooms: state.Messenger.rooms,
    selected: state.Messenger.selected,
    miniChats: state.Messenger.minichats,
    onlineUsers: state.Users.onlineUsers,
    websocketTypingStatus: state.Messenger.websocketTypingStatus,
    uploadProgress: state.Messenger.uploadProgress,
    userProfile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    closeMiniChat: id => dispatch(messengerActions.closeMiniChat(id)),
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
    sendTypingStatus: roomId =>
        dispatch(messengerActions.sendTypingStatus(roomId)),
    updateChatReadStatus: (roomId, chatIds) =>
        dispatch(messengerActions.updateChatReadStatus(roomId, chatIds)),
    fileUploadProgress: (roomId, value) =>
        dispatch(messengerActions.fileUploadProgress(roomId, value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniChat)
