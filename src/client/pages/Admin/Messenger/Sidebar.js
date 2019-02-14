import React, { Component } from 'react'
import classnames from 'classnames'

import c from './Messenger.scss'

import ChatSidebarItem from './ChatSidebarItem'

class Sidebar extends Component {
    state = {
        items: []
    }

    componentDidUpdate = prevProps => {
        if (
            prevProps.items !== this.props.items ||
            prevProps.onlineUsers !== this.props.onlineUsers
        ) {
            this.setUsers(this.props.items, this.props.onlineUsers)
        }
    }

    setUsers = (items, onlineUsers) => {
        for (const item of items) {
            item.user['status'] = {}
            for (const onlineUser of onlineUsers) {
                if (item.user.id === onlineUser.id) {
                    item.user['status'] = onlineUser
                }
            }
        }
        this.setState({
            items
        })
    }

    render() {
        const { selected = null, hasError = false, className } = this.props

        const cx = classnames(c.sidebar, className, 'flex-vertical')

        const selected_chat = this.state.items.reduce(function(s, x, index) {
            if (x.id === selected) return index
            return s
        }, -1)

        return (
            <div className={cx}>
                <div className="search-box">
                    <input
                        type="search"
                        className="search-control"
                        placeholder="Search Users/Groups"
                        onChange={this.props.onSearchChange}
                    />
                </div>
                <div className="items-list scroll-y flex-1">
                    {hasError && <p>Error loading chats</p>}
                    {this.state.items.map((x, i) => (
                        <ChatSidebarItem
                            key={i}
                            selected={selected_chat === i}
                            onClick={e => this.props.onItemClick(x.id)}
                            username={x.user.username}
                            image={x.user.user_image_url}
                            avatarColor={x.user.user_avatar_color}
                            onlineStatus={x.user.status}
                            numUnread={x.user.unread_count}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Sidebar
