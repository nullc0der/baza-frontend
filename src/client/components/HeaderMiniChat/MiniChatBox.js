import React from 'react'
import _ from 'lodash'

import ChatBodyItem from 'components/ChatBodyItem'
import ChatFooter from 'components/ChatFooter'

export default class MiniChatBox extends React.Component {
    state = {
        userStatus: {}
    }

    componentDidMount = () => {
        if (this.props.chat) {
            let unreadIds = this.props.chat.messages.filter(
                x =>
                    !x.read &
                    (x.user.username !== this.props.userProfile.user.username)
            )
            if (unreadIds) {
                this.props.handleUnreadChat(this.props.chat.roomId, unreadIds)
            }
            this.scrollToBottom()
            this.setUserStatus(this.props.chat, this.props.onlineUsers)
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.chat !== this.props.chat) {
            let unreadIds = this.props.chat.messages.filter(
                x =>
                    !x.read &
                    (x.user.username !== this.props.userProfile.user.username)
            )
            if (unreadIds) {
                this.props.handleUnreadChat(this.props.chat.roomId, unreadIds)
            }
            this.scrollToBottom()
        }
        if (prevProps.onlineUsers !== this.props.onlineUsers) {
            this.setUserStatus(this.props.chat, this.props.onlineUsers)
        }
    }

    setUserStatus = (chat, onlineUsers) => {
        for (const onlineUser of onlineUsers) {
            if (!_.isEmpty(chat.messages)) {
                let otherUser = chat.messages[0].user || {}
                if (otherUser.id === this.props.userProfile.user.id) {
                    otherUser = chat.messages[0].to_user || {}
                }
                if (otherUser.id === onlineUser.id) {
                    this.setState({
                        userStatus: onlineUser
                    })
                }
            }
        }
    }

    scrollToBottom = () => {
        this.scrollEl.scrollIntoView()
    }

    render() {
        const { chat, selectedMessages, uploadProgress } = this.props
        return (
            <div className="mini-chat flex-vertical">
                <div
                    className={`chat-header flex-horizontal a-center j-between is-${
                        this.state.userStatus.status
                    }`}>
                    <div className="username"> {chat.username} </div>
                    <div className="flex-1" />
                    <div className="chat-options">
                        {selectedMessages[chat.roomId] &&
                            selectedMessages[chat.roomId].length > 0 && (
                                <div
                                    onClick={() =>
                                        this.props.handleDeleteChat(chat.roomId)
                                    }
                                    className="btn btn-default ui-button">
                                    <i className="fa fa-trash" />
                                </div>
                            )}
                        <div
                            onClick={this.props.toggleMinimise}
                            className="btn btn-default ui-button">
                            <i className="fa fa-window-minimize" />
                        </div>
                        <div
                            onClick={this.props.closeChat(chat.roomId)}
                            className="btn btn-default ui-button">
                            <i className="fa fa-times" />
                        </div>
                    </div>
                </div>
                <div className="chat-body flex-1">
                    {chat.messages.map((x, i) => {
                        return (
                            <ChatBodyItem
                                key={i}
                                roomId={chat.roomId}
                                user={x.user}
                                message={x.message}
                                fileurl={x.fileurl}
                                filetype={x.filetype}
                                filename={x.filename}
                                message_id={x.id}
                                stamp={new Date(x.timestamp)}
                                left={
                                    x.user.id !== this.props.userProfile.user.id
                                }
                                selected={_.includes(
                                    selectedMessages[chat.roomId],
                                    x.id
                                )}
                                onSelected={this.props.handleSelectedMessage}
                                miniChat={true}
                            />
                        )
                    })}
                    <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={el => (this.scrollEl = el)}
                    />
                </div>
                <ChatFooter
                    small={true}
                    roomId={chat.roomId}
                    handleSendChat={this.props.handleSendChat}
                    handleTypingStatus={this.props.handleTypingStatus}
                    showTyping={
                        chat.roomId === this.props.webSocketTypingStatus
                    }
                    showTypingUsername={chat.username}
                    uploadProgress={
                        uploadProgress.roomId === chat.roomId
                            ? uploadProgress.progress
                            : 0
                    }
                />
            </div>
        )
    }
}
