import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import _ from 'lodash'

import c from './Messenger.scss'

import Sidebar from './Sidebar'
import ChatView from './ChatView'

import { actions as messengerActions } from 'store/Messenger'

class Messenger extends Component {
    componentDidMount = () => {
        this.props.fetchData()
        if (this.props.match.params.id) {
            this.onSidebarChatSelect(Number(this.props.match.params.id))
        }
    }

    componentWillUnmount = () => {
        this.props.selectRoom(-1)
    }

    componentDidUpdate = prevProps => {
        if (prevProps.match !== this.props.match) {
            this.onSidebarChatSelect(Number(this.props.match.params.id))
        }
    }

    onSidebarChatSelect = id => {
        if (id) {
            this.props.selectRoom(id)
            $('.' + c.chatView).addClass('is-open')
        }
    }

    onSearchInputChange = e => {
        this.props.changeSearchText(e.target.value)
    }

    getTitle = (rooms, selected) => {
        for (const room of rooms) {
            if (room.id === selected) {
                return room.user.username
            }
        }
    }

    selectNextRoom = () => {
        this.props.clearChat(this.props.selected)
        if (_.includes(this.props.miniChats, this.props.selected)) {
            this.props.closeMiniChat(this.props.selected)
        }
        for (const room of this.props.rooms) {
            if (
                room.id > this.props.selected ||
                room.id < this.props.selected
            ) {
                this.props.selectRoom(room.id)
            }
        }
    }

    render() {
        const {
            className,
            rooms,
            selected,
            hasErrored,
            onlineUsers
        } = this.props

        const cx = classnames(
            c.container,
            className,
            'flex-horizontal',
            'a-stretch',
            'flex-1'
        )
        const title = this.getTitle(rooms, selected)
        return (
            <div className={cx}>
                <Helmet title="Messenger" />
                <Sidebar
                    selected={selected}
                    hasErrored={hasErrored}
                    onItemClick={this.onSidebarChatSelect}
                    onSearchChange={this.onSearchInputChange}
                    items={rooms}
                    onlineUsers={onlineUsers}
                />
                <ChatView
                    title={title}
                    selectNext={this.selectNextRoom}
                    userTyping={this.props.websocketTypingStatus}
                />
            </div>
        )
    }
}

const filterRooms = (rooms, searchText) => {
    if (searchText) {
        return rooms.filter(room =>
            room.user.username
                .toLowerCase()
                .startsWith(searchText.toLowerCase())
        )
    }
    return rooms
}

const mapStateToProps = state => ({
    rooms: filterRooms(state.Messenger.rooms, state.Messenger.searchText),
    chats: state.Messenger.chats,
    selected: state.Messenger.selected,
    miniChats: state.Messenger.minichats,
    isLoading: state.Messenger.isLoading,
    hasError: state.Messenger.hasError,
    onlineUsers: state.Users.onlineUsers,
    websocketTypingStatus: state.Messenger.websocketTypingStatus,
    searchText: state.Messenger.searchText
})

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(messengerActions.loadRooms()),
    selectRoom: id => dispatch(messengerActions.roomSelected(id)),
    changeSearchText: searchText =>
        dispatch(messengerActions.searchTextChanged(searchText)),
    clearChat: roomId => dispatch(messengerActions.clearChat(roomId)),
    closeMiniChat: roomId => dispatch(messengerActions.closeMiniChat(roomId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messenger)
