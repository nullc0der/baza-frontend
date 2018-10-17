import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import _ from 'lodash'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Messenger.styl'

import Sidebar from './Sidebar'
import ChatView from './ChatView'

import { actions as messengerActions } from 'store/Messenger'

class Messenger extends Component {
    componentDidMount = () => {
        this.props.fetchData()
    }

    componentDidUpdate = prevProps => {
        if (prevProps.params.id !== this.props.params.id) {
            this.onSidebarChatSelect(Number(this.props.params.id))
        }
    }

    onSidebarChatSelect = id => {
        this.props.selectRoom(id)
        $('.' + c.chatView).addClass('is-open')
    }

    onSearchInputChange = e => {
        this.props.changeSearchText(e.target.value)
    }

    getTitle = (rooms, selected) => {
        for (const room of rooms) {
            if (room.id === selected) {
                return room.username
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

Messenger.propTypes = {
    rooms: PropTypes.array.isRequired,
    chats: PropTypes.object.isRequired,
    onlineUsers: PropTypes.array.isRequired,
    websocketTypingStatus: PropTypes.number.isRequired,
    areLoading: PropTypes.bool.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    selected: PropTypes.number.isRequired,
    miniChats: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
    selectRoom: PropTypes.func.isRequired,
    changeSearchText: PropTypes.func.isRequired,
    clearChat: PropTypes.func.isRequired,
    closeMiniChat: PropTypes.func.isRequired
}

const filterRooms = (rooms, searchText) => {
    if (searchText) {
        return rooms.filter(room =>
            room.username.toLowerCase().startsWith(searchText.toLowerCase())
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
    websocketTypingStatus: state.Messenger.websocketTypingStatus
})

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(messengerActions.loadRooms()),
    selectRoom: id => dispatch(messengerActions.roomSelected(id)),
    changeSearchText: searchText =>
        dispatch(messengerActions.searchTextChanged(searchText)),
    clearChat: roomId => dispatch(messengerActions.clearChat(roomId)),
    closeMiniChat: roomId => dispatch(messengerActions.closeMiniChat(roomId))
})

export default withStyles(c)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Messenger)
)
