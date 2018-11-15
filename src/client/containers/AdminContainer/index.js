import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import Helmet from 'react-helmet'
import NotificationSystem from 'react-notification-system'

import Auth from 'utils/authHelpers'

import s from './AdminContainer.scss'

import Header from 'components/AdminHeader'
import LeftNav from 'components/LeftNav'
// import RightNav from 'components/RightNav'
import SubHeader from 'components/SubHeader'
import Footer from 'components/AdminFooter'
import MiniChat from 'components/HeaderMiniChat/MiniChat'
import NotificationBar from 'components/NotificationBar'
import WebSocketWrapper from 'components/WebSocketWrapper'

import { actions as usersActions } from 'store/Users'
import { actions as messengerActions } from 'store/Messenger'
import { actions as walletTransactionsActions } from 'store/WalletTransanctions'
import { actions as notificationsActions } from 'store/Notifications'

import AdminRoutes from './AdminRoutes'
import AdminOverlays from './AdminOverlays'

// var debug = require('debug')('baza:client:app')

class AdminContainer extends Component {
    state = {
        isLeftNavOpen: false,
        isRightNavOpen: false,
        webSocketMessage: {}
    }

    componentDidMount = () => {
        this.injectFontIfAbsent()
        document.body.classList.add('is-admin-ui')
        this._notificationSystem = this.refs.notificationSystem
    }
    componentWillUnmount = () => {
        document.body.classList.remove('is-admin-ui')
    }
    componentDidUpdate = prevProps => {
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                webSocketMessage: {
                    status: this.props.userStatus
                }
            })
        }
        if (
            prevProps.notificationSystemData !==
            this.props.notificationSystemData
        ) {
            this._notificationSystem.addNotification(
                this.props.notificationSystemData
            )
        }
    }

    _notificationSystem = null

    notificationSystemStyle = {
        NotificationItem: {
            DefaultStyle: {
                margin: '20px 5px 2px 1px'
            }
        }
    }

    injectFontIfAbsent = () => {
        const link = document.querySelectorAll(`[data-font='admin-ss-pro']`)
        if (link.length) return
        var l = document.createElement('link')
        l.rel = 'stylesheet'
        l.type = 'text/css'
        l.dataset.font = 'admin-ss-pro'
        l.href =
            'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700'
        document.head.appendChild(l)
    }

    toggleLeftNav = () => {
        this.setState({ isLeftNavOpen: !this.state.isLeftNavOpen })
    }
    toggleRightNav = () => {
        this.setState({ isRightNavOpen: !this.state.isRightNavOpen })
    }

    onWebSocketData = data => {
        this.props.setOnlineUsers(get(data.message, 'online_users', []))
    }

    shouldOpenMinichat = chatroomId => {
        if (
            $(window).width() > 768 &&
            chatroomId !== this.props.selectedChatroom &&
            this.props.minichats.indexOf(chatroomId) === -1
        ) {
            return true
        }
        return false
    }

    isChatEmpty = chatroomId => {
        return isEmpty(this.props.chats[chatroomId])
    }

    onNotificationWebSocketData = data => {
        const { message } = data
        switch (message.type) {
            case 'proxcdb-transaction':
                this.props.receievedTXdata(message.data)
                break
            default:
                this.props.receivedNotification(message.data)
                break
        }
    }

    onMessengerWebSocketData = data => {
        switch (data.message.type) {
            case 'add_message':
                if (this.shouldOpenMinichat(data.message.chatroom.id)) {
                    this.props.addChatRoom(data.message.chatroom)
                    this.props.openMiniChat(data.message.chatroom.id)
                    if (!this.isChatEmpty(data.message.chatroom.id)) {
                        this.props.setTypingStatus(0)
                        this.props.recievedChatOnWebsocket(
                            data.message.chatroom,
                            data.message.message
                        )
                    }
                } else {
                    this.props.setTypingStatus(0)
                    this.props.recievedChatOnWebsocket(
                        data.message.chatroom,
                        data.message.message
                    )
                }
                if (
                    $(window).width() > 768 &&
                    this.isChatEmpty(data.message.chatroom.id)
                ) {
                    this.props.addChatRoom(data.message.chatroom)
                }
                break
            case 'delete_message':
                this.props.deleteChatsFromWebsocket(
                    data.message.chatroom,
                    data.message.message_ids
                )
                break
            case 'set_typing':
                if (this.websocketTypingTimeout) {
                    clearTimeout(this.websocketTypingTimeout)
                }
                this.props.setTypingStatus(data.message.chatroom_id)
                this.websocketTypingTimeout = setTimeout(() => {
                    this.props.setTypingStatus(0)
                }, 1000)
                break
            default:
                break
        }
    }

    render() {
        return Auth.isAuthenticated() && Auth.isTokenNotExpired() ? (
            <section className={s.container}>
                <Helmet titleTemplate="%s | Baza" defaultTitle="Baza" />
                <NotificationSystem
                    ref="notificationSystem"
                    style={this.notificationSystemStyle}
                />
                <MiniChat />
                {/* <WebSocketWrapper
                    url="/ws/users/"
                    onWebSocketData={this.onWebSocketData}
                    message={this.state.webSocketMessage}
                />
                <WebSocketWrapper
                    url="/ws/messenger/"
                    onWebSocketData={this.onMessengerWebSocketData}
                    message={this.props.sendTypingStatus}
                />
                <WebSocketWrapper
                    url="/ws/notifications/"
                    onWebSocketData={this.onNotificationWebSocketData}
                /> */}
                <LeftNav
                    className={s.leftNav}
                    open={this.state.isLeftNavOpen}
                    onRequestToggle={this.toggleLeftNav}
                />

                <section className={s.content}>
                    {this.props.showHeaders && (
                        <Fragment>
                            <Header
                                className={s.header}
                                onMenuToggle={this.toggleLeftNav}
                                onSettingsToggle={this.toggleRightNav}
                            />
                            <SubHeader className={s.subHeader} />
                            <NotificationBar />
                        </Fragment>
                    )}
                    <section className="content-inner">
                        {AdminRoutes(this.props.location)}
                        {AdminOverlays(this.props.location)}
                    </section>
                    <Footer />
                </section>

                {/* <RightNav
                    className={s.rightNav}
                    open={this.state.isRightNavOpen}
                    onRequestClose={this.toggleLeftNav}
                /> */}
            </section>
        ) : (
            <Redirect
                to={{
                    pathname: '/',
                    hash: '#!login',
                    state: {
                        originURL: this.props.location.pathname
                    }
                }}
            />
        )
    }
}

const mapStateToProps = state => ({
    notificationSystemData: state.Common.notificationSystemData,
    location: state.router.location,
    userStatus: state.UserProfile.userStatus,
    sendTypingStatus: state.Messenger.sendTypingStatus,
    showHeaders: state.Common.showHeaders,
    selectedChatroom: state.Messenger.selected,
    minichats: state.Messenger.minichats,
    chats: state.Messenger.chats
})

const mapDispatchToProps = dispatch => ({
    setOnlineUsers: users => dispatch(usersActions.setOnlineUsers(users)),
    addChatRoom: room => dispatch(messengerActions.addChatRoom(room)),
    recievedChatOnWebsocket: (roomId, chat) =>
        dispatch(messengerActions.receivedChatOnWebsocket(roomId, chat)),
    deleteChatsFromWebsocket: (roomId, chatIds) =>
        dispatch(messengerActions.deleteChatsFromWebsocket(roomId, chatIds)),
    setTypingStatus: roomId =>
        dispatch(messengerActions.updateTypingStatus(roomId)),
    openMiniChat: roomId => dispatch(messengerActions.openMiniChat(roomId)),
    receievedTXdata: transaction =>
        dispatch(
            walletTransactionsActions.receivedTxdataOnWebsocket(transaction)
        ),
    receivedNotification: notification =>
        dispatch(
            notificationsActions.receivedNotificationOnWebsocket(notification)
        )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminContainer)
