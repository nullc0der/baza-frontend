import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import _ from 'lodash'

import { actions as usersActions } from 'store/Users'
import { actions as messengerActions } from 'store/Messenger'

import MemberTile from './MemberTile'

import s from './Members.scss'

class Members extends Component {
    state = {
        users: []
    }

    componentDidMount = () => {
        this.props
            .fetchUsers()
            .then(res => {})
            .catch(res => {})
    }

    componentDidUpdate = prevProps => {
        if (
            prevProps.users !== this.props.users ||
            prevProps.searchString !== this.props.searchString ||
            prevProps.filters !== this.props.filters ||
            prevProps.onlineUsers !== this.props.onlineUsers
        ) {
            this.setUsers(
                this.props.users,
                this.props.searchString,
                this.props.filters,
                this.props.onlineUsers
            )
        }
    }

    setUsers = (users, searchString = '', filters = [], onlineUsers) => {
        const tempUsers = []
        for (const user of users) {
            user['status'] = {}
            for (const onlineUser of onlineUsers) {
                if (user.id === onlineUser.id) {
                    user['status'] = onlineUser
                    tempUsers.push(user)
                }
            }
        }
        let finalUsers = _.union(users, tempUsers)
        finalUsers = finalUsers.filter(x =>
            x.username.toLowerCase().startsWith(searchString.toLowerCase())
        )
        if (
            !(_.includes(filters, 'online') && _.includes(filters, 'offline'))
        ) {
            if (_.includes(filters, 'online')) {
                finalUsers = finalUsers.filter(x => !_.isEmpty(x.status))
            }
            if (_.includes(filters, 'offline')) {
                finalUsers = finalUsers.filter(x => _.isEmpty(x.status))
            }
        }
        this.setState({
            users: finalUsers.sort(
                (a, b) =>
                    a.username > b.username
                        ? 1
                        : b.username > a.username
                            ? -1
                            : 0
            )
        })
    }

    initChat = toUser => {
        this.props.initChat(toUser).then(res => {
            this.props.openMiniChat(res.data.room.id)
        })
    }

    render() {
        const { className } = this.props

        const cx = classnames(
            s.container,
            className,
            'flex-horizontal',
            'flex-wrap',
            'scroll-y'
        )

        return (
            <div className={cx}>
                {this.state.users.map((x, i) => (
                    <MemberTile
                        key={i}
                        userId={x.id}
                        userName={x.username}
                        fullName={x.fullname}
                        avatarUrl={x.user_image_url}
                        avatarColor={x.user_avatar_color}
                        onlineStatus={x.status}
                        initChat={this.initChat}
                    />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.Users.users,
    onlineUsers: state.Users.onlineUsers,
    searchString: state.Common.subHeaderSearchString,
    filters: state.Common.subHeaderFilters
})

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(usersActions.fetchUsers()),
    initChat: toUser => dispatch(messengerActions.initChat(toUser)),
    openMiniChat: id => dispatch(messengerActions.openMiniChat(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Members)
