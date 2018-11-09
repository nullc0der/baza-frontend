import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import union from 'lodash/union'
import isEmpty from 'lodash/isEmpty'

import MemberItem from './MemberItem'

import { isMember } from 'pages/Admin/Group/utils'

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
        list: [],
        groupData: {}
    }

    componentDidMount = () => {
        const id = this.props.groupID
        this.props.getMembers(id)
        this.props.changeLastSelectedGroup(id)
        this.loadGroupData(id)
    }

    componentDidUpdate = prevProps => {
        if (
            prevProps.list !== this.props.list ||
            prevProps.onlineUsers !== this.props.onlineUsers
        ) {
            this.setUsers(this.props.list, this.props.onlineUsers)
        }
        if (prevProps.groups !== this.props.groups) {
            this.loadGroupData(this.props.groupID)
        }
    }

    loadGroupData = groupID => {
        const group = this.props.groups.filter(x => x.id === Number(groupID))
        if (group.length) {
            this.setState({
                groupData: group[0]
            })
        } else {
            this.props.fetchGroup(groupID)
        }
    }

    toggleSubscribedGroup = (memberID, subscribedGroups, toggledGroup) => {
        const id = this.props.groupID
        subscribedGroups =
            subscribedGroups.indexOf(toggledGroup.id) !== -1
                ? subscribedGroups.filter(x => x !== toggledGroup.id)
                : [...subscribedGroups, toggledGroup.id]
        this.props.changeMemberRole(id, {
            member_id: memberID,
            user_permission_set: subscribedGroups
        })
    }

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
                onlineStatus={member.status}
                toggleSubscribedGroup={this.toggleSubscribedGroup}
            />
        )
    }

    setUsers = (list, onlineUsers) => {
        const tempList = []
        for (const member of list) {
            member['status'] = {}
            for (const onlineUser of onlineUsers) {
                if (member.user.id === onlineUser.id) {
                    member['status'] = onlineUser
                    tempList.push(member)
                }
            }
        }
        let finalList = union(list, tempList)
        this.setState({
            list: finalList
        })
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
            !isEmpty(this.state.groupData) &&
            (isMember(this.state.groupData.user_permission_set) ? (
                <div className={cx}>
                    <div className="panel-header">
                        <div className="header-inner">
                            <h4> Member Management </h4>
                        </div>
                    </div>
                    <div className="members-list">
                        {this.state.list.map(this.renderOneMember)}
                    </div>
                </div>
            ) : (
                <Redirect to="/403" />
            ))
        )
    }
}

const mapStateToProps = state => ({
    list: state.Group.groupMembers,
    onlineUsers: state.Users.onlineUsers,
    groups: state.Group.groups
})

const mapDispatchToProps = dispatch => ({
    fetchGroup: groupID => dispatch(groupActions.fetchGroup(groupID)),
    getMembers: groupID => {
        dispatch(groupActions.fetchGroupMembers(groupID))
    },
    changeMemberRole: (groupID, data) => {
        dispatch(groupActions.changeMemberRole(groupID, data))
    },
    changeLastSelectedGroup: groupID =>
        dispatch(groupActions.changeLastSelectedGroup(groupID))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MembersManagement)
