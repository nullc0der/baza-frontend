import React, { Component } from 'react'
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
import ErrorBoundaryWrap from 'components/ErrorBoundaryWrap'

import { actions as usersActions } from 'store/Users'
import { actions as messengerActions } from 'store/Messenger'
import { actions as walletTransactionsActions } from 'store/WalletTransanctions'
import { actions as notificationsActions } from 'store/Notifications'
import { actions as walletAccountsActions } from 'store/WalletAccounts'

import AdminRoutes from './AdminRoutes'
import AdminOverlays from './AdminOverlays'

// var debug = require('debug')('baza:client:app')

class AdminContainer extends Component {
    state = {
        isLeftNavOpen: false,
        isRightNavOpen: false,
    }

    componentDidMount = () => {
        this.injectFontIfAbsent()
        document.body.classList.add('is-admin-ui')
        this._notificationSystem = this.refs.notificationSystem
    }
    componentWillUnmount = () => {
        document.body.classList.remove('is-admin-ui')
    }
    componentDidUpdate = (prevProps) => {
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
                margin: '20px 5px 2px 1px',
            },
        },
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

    onWebSocketData = (data) => {
        this.props.setOnlineUsers(get(data.message, 'online_users', []))
    }

    isChatEmpty = (chatroomID) => {
        return isEmpty(this.props.chats[chatroomID])
    }

    shouldPlayMessengerTone = (chatroomID) => {
        return (
            chatroomID !== this.props.selectedChatroom &&
            this.props.minichats.indexOf(chatroomID) === -1
        )
    }

    onNotificationWebSocketData = (data) => {
        const { message } = data
        switch (message.type) {
            case 'proxcdb-transaction':
                this.props.receievedTXdata(message.data)
                break
            case 'add_baza_distribution_balance':
                this.props.updateProxcBalance(message.data.balance)
                break
            default:
                this.props.receivedNotification(message.data)
                $('#notification-tone')[0].play()
                break
        }
    }

    onMessengerWebSocketData = (data) => {
        switch (data.message.type) {
            case 'add_message':
                const chatroomID = data.message.chatroom.id
                if (this.isChatEmpty(chatroomID)) {
                    this.props.addChatRoom(data.message.chatroom)
                } else {
                    this.props.setTypingStatus(0)
                    this.props.recievedChatOnWebsocket(
                        data.message.chatroom,
                        data.message.message
                    )
                }
                if (this.shouldPlayMessengerTone(chatroomID)) {
                    $('#messenger-tone')[0].play()
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
                <Helmet
                    titleTemplate="%s | Baza Foundation"
                    defaultTitle="Baza Foundation"
                />
                <NotificationSystem
                    ref="notificationSystem"
                    style={this.notificationSystemStyle}
                />
                <MiniChat />
                <ErrorBoundaryWrap>
                    <LeftNav
                        className={s.leftNav}
                        open={this.state.isLeftNavOpen}
                        onRequestToggle={this.toggleLeftNav}
                    />
                </ErrorBoundaryWrap>

                <section className={s.content}>
                    {this.props.showHeaders && (
                        <ErrorBoundaryWrap>
                            <Header
                                className={s.header}
                                onMenuToggle={this.toggleLeftNav}
                                onSettingsToggle={this.toggleRightNav}
                            />
                            <SubHeader className={s.subHeader} />
                            <NotificationBar />
                        </ErrorBoundaryWrap>
                    )}
                    <ErrorBoundaryWrap>
                        <section className="content-inner">
                            {AdminRoutes(this.props.location)}
                            {AdminOverlays(this.props.location)}
                        </section>
                    </ErrorBoundaryWrap>
                    <ErrorBoundaryWrap>
                        <Footer />
                    </ErrorBoundaryWrap>
                </section>

                {/* <RightNav
                    className={s.rightNav}
                    open={this.state.isRightNavOpen}
                    onRequestClose={this.toggleLeftNav}
                /> */}
                <WebSocketWrapper
                    url="/ws/users/"
                    onWebSocketData={this.onWebSocketData}
                    message={{ status: this.props.userStatus }}
                />
                <WebSocketWrapper
                    url="/ws/messenger/"
                    onWebSocketData={this.onMessengerWebSocketData}
                    message={this.props.sendTypingStatus}
                />
                <WebSocketWrapper
                    url="/ws/notifications/"
                    onWebSocketData={this.onNotificationWebSocketData}
                />
            </section>
        ) : (
            <Redirect
                to={{
                    pathname: '/',
                    hash: '#!login',
                    state: {
                        originURL:
                            this.props.location.pathname +
                            this.props.location.hash,
                    },
                }}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    notificationSystemData: state.Common.notificationSystemData,
    location: state.router.location,
    userStatus: state.UserProfile.userStatus,
    sendTypingStatus: state.Messenger.sendTypingStatus,
    showHeaders: state.Common.showHeaders,
    selectedChatroom: state.Messenger.selected,
    minichats: state.Messenger.minichats,
    chats: state.Messenger.chats,
})

const mapDispatchToProps = (dispatch) => ({
    setOnlineUsers: (users) => dispatch(usersActions.setOnlineUsers(users)),
    addChatRoom: (room) => dispatch(messengerActions.addChatRoom(room)),
    recievedChatOnWebsocket: (roomId, chat) =>
        dispatch(messengerActions.receivedChatOnWebsocket(roomId, chat)),
    deleteChatsFromWebsocket: (roomId, chatIds) =>
        dispatch(messengerActions.deleteChatsFromWebsocket(roomId, chatIds)),
    setTypingStatus: (roomId) =>
        dispatch(messengerActions.updateTypingStatus(roomId)),
    openMiniChat: (roomId) => dispatch(messengerActions.openMiniChat(roomId)),
    receievedTXdata: (transaction) =>
        dispatch(
            walletTransactionsActions.receivedTxdataOnWebsocket(transaction)
        ),
    receivedNotification: (notification) =>
        dispatch(
            notificationsActions.receivedNotificationOnWebsocket(notification)
        ),
    updateProxcBalance: (balance) =>
        dispatch(walletAccountsActions.updateProxcBalance(balance)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
