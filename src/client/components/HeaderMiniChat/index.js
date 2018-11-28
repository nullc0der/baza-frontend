import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import c from './HeaderMiniChat.scss'

import Dropdown from 'components/ui/Dropdown'
import { actions as messengerActions } from 'store/Messenger'

import Avatar from 'components/Avatar'

class HeaderMiniChat extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.props.fetchData()
    }

    openMiniChat = chat => e => {
        if ($(window).width() > 768) this.props.openMiniChat(chat.id)
        else this.context.router.history.push('/messenger/' + chat.id)
    }

    renderItem = (item, i) => {
        return (
            <div
                onClick={this.openMiniChat(item)}
                className={`flex-horizontal ${c.item} ${!!Boolean(
                    item.unread_count
                ) && 'has-unread'}`}>
                <Avatar
                    size={42}
                    otherProfile={{
                        username: item.user.username,
                        profile_photo: item.user.user_image_url,
                        default_avatar_color: item.user.user_avatar_color
                    }}
                    own={false}
                />
                <div className="item-details">
                    <div className="item-name">{item.user.username}</div>
                    <div className="item-desc">{item.unread_count} unread</div>
                </div>
            </div>
        )
    }

    showIndicator = () => {
        let hasUnread = 0
        for (const room of this.props.rooms) {
            if (room.unread_count) {
                hasUnread += room.unread_count
            }
        }
        return Boolean(hasUnread)
    }

    render() {
        const { className } = this.props

        const cx = classnames(c.container, className)

        const labelClass = classnames('flex-horizontal', 'a-center', c.label)

        const label = (
            <span className={labelClass}>
                <i className="fa fa-fw fa-comment-o" />
                {this.showIndicator() && <i className="has-unread-message" />}
            </span>
        )

        return (
            <Dropdown
                id="id-header-mini-chat"
                className={cx}
                label={label}
                ref={dd => (this.dropdown = dd)}
                items={this.props.rooms}
                itemRenderer={this.renderItem}
            />
        )
    }
}
const mapStateToProps = state => ({
    rooms: state.Messenger.rooms
})

const mapDispatchToProps = dispatch => ({
    openMiniChat(chat) {
        return dispatch(messengerActions.openMiniChat(chat))
    },
    fetchData: () => dispatch(messengerActions.loadRooms())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMiniChat)
