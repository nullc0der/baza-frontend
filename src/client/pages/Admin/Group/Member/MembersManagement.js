import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
//import _ from 'lodash'

import MemberItem from './MemberItem'

import { actions as groupActions } from 'store/Group'

const MEMBER_ROLES = [
    { id: 101, name: 'Subscriber', icon: { type: 'material', name: 'face' } },
    { id: 102, name: 'Member', icon: { type: 'fa', name: 'users' } },
    {
        id: 103,
        name: 'Owner',
        icon: { type: 'material', name: 'local_library' }
    },
    {
        id: 104,
        name: 'Administrator',
        icon: { type: 'material', name: 'spellcheck' }
    },
    {
        id: 105,
        name: 'Moderator',
        icon: { type: 'material', name: 'verified_user' }
    },
    { id: 106, name: 'Staff', icon: { type: 'material', name: 'touch_app' } },
    {
        id: 107,
        name: 'Ban',
        icon: { type: 'material', name: 'remove_circle_outline' }
    },
    { id: 108, name: 'Block', icon: { type: 'material', name: 'block' } }
]

class MembersManagement extends Component {
    state = {
        list: []
    }

    componentDidMount = () => {
        const id = this.props.groupID
        this.props.getMembers(id)
    }

    componentDidUpdate = prevProps => {
        // if (
        //     prevProps.list !== this.props.list ||
        //     prevProps.onlineUsers !== this.props.onlineUsers ||
        //     prevProps.searchString !== this.props.searchString ||
        //     prevProps.filters !== this.props.filters
        // ) {
        //     this.setUsers(
        //         this.props.list,
        //         this.props.onlineUsers,
        //         this.props.searchString,
        //         this.props.filters
        //     )
        // }
    }

    // toggleSubscribedGroup = (memberID, subscribedGroups, toggledGroup) => {
    //     const id = this.props.groupID
    //     this.props.toggleSubscribedGroup(
    //         `/api/groups/${id}/members/${memberID}/changerole/`,
    //         subscribedGroups,
    //         toggledGroup
    //     )
    // }

    renderOneMember = (member, i) => {
        return (
            <MemberItem
                key={i}
                groups={MEMBER_ROLES}
                memberId={member.user.id}
                fullName={member.user.fullname}
                userName={member.user.username}
                avatarUrl={member.user.user_image_url}
                avatarColor={member.user.user_avatar_color}
                subscribedGroups={member.user_permission_set}
            />
        )
    }

    // setUsers = (list, onlineUsers, searchString = '', filters = []) => {
    //     let finalList = list.map(
    //         x =>
    //             _.includes(onlineUsers, x.user.username)
    //                 ? { ...x, user: { ...x.user, is_online: true } }
    //                 : { ...x, user: { ...x.user, is_online: false } }
    //     )
    //     finalList = finalList.filter(x =>
    //         x.user.username.toLowerCase().startsWith(searchString.toLowerCase())
    //     )
    //     if (filters.indexOf('online') !== -1) {
    //         finalList = finalList.filter(x => x.user.is_online)
    //     }
    //     let filteredItems = []
    //     for (const filter of filters) {
    //         switch (filter) {
    //             case 'owners':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 103)
    //                     )
    //                 )
    //                 break
    //             case 'admins':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 104)
    //                     )
    //                 )
    //                 break
    //             case 'staffs':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 106)
    //                     )
    //                 )
    //                 break
    //             case 'moderators':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 105)
    //                     )
    //                 )
    //                 break
    //             case 'members':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 102)
    //                     )
    //                 )
    //                 break
    //             case 'subscribers':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 101)
    //                     )
    //                 )
    //                 break
    //             case 'banned':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 107)
    //                     )
    //                 )
    //                 break
    //             case 'blocked':
    //                 filteredItems.push(
    //                     finalList.filter(x =>
    //                         _.includes(x.subscribed_groups, 108)
    //                     )
    //                 )
    //                 break
    //         }
    //     }
    //     if (filteredItems.length) {
    //         finalList = _.union(...filteredItems)
    //     }
    //     this.setState({
    //         list: finalList
    //     })
    // }

    render() {
        const { className } = this.props

        const cx = classnames(className, 'flex-vertical')

        return (
            <div className={cx}>
                <div className="panel-header">
                    <div className="header-inner">
                        <h4> Member Management </h4>
                    </div>
                </div>
                <div className="members-list">
                    {this.props.list.map(this.renderOneMember)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.Group.groupMembers
})

const mapDispatchToProps = dispatch => ({
    getMembers: groupID => {
        dispatch(groupActions.fetchGroupMembers(groupID))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MembersManagement)
