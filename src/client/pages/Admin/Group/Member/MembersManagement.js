import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import union from 'lodash/union'
import isEmpty from 'lodash/isEmpty'
import includes from 'lodash/includes'

import MemberItem from './MemberItem'
import CommunityUser from './CommunityUser'

import { isMember } from 'pages/Admin/Group/utils'
import { getCommunityMembers, inviteCommunityMember } from 'api/group'

import { actions as groupActions } from 'store/Group'
import { actions as commonActions } from 'store/Common'

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
        communityUserList: [],
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
            prevProps.onlineUsers !== this.props.onlineUsers ||
            prevProps.searchString !== this.props.searchString ||
            prevProps.filters !== this.props.filters
        ) {
            this.setUsers(
                this.props.list,
                this.props.onlineUsers,
                this.props.searchString,
                this.props.filters
            )
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
                viewingUserPermissionSet={
                    this.state.groupData.user_permission_set
                }
                viewingUserProfile={this.props.userProfile}
            />
        )
    }

    renderOnePlatformuser = (user, i) => {
        return (
            <CommunityUser
                key={i}
                userId={user.id}
                fullName={user.fullname}
                userName={user.username}
                avatarUrl={user.user_image_url}
                avatarColor={user.user_avatar_color}
                isInvited={user.is_invited}
                inviteUser={this.inviteUser}
            />
        )
    }

    inviteUser = userID => {
        inviteCommunityMember(this.props.groupID, { user_id: userID }).then(
            res => {
                this.setState({
                    communityUserList: this.state.communityUserList.map(x =>
                        x.id === res.data ? { ...x, is_invited: true } : x
                    )
                })
                this.props.addNotification({
                    message: 'User invited',
                    level: 'success'
                })
            }
        )
    }

    setUsers = (list, onlineUsers, searchString = '', filters = []) => {
        let tempList = []
        let filteredItems = []
        if (includes(filters, 'Baza Members') && searchString.length) {
            getCommunityMembers(this.props.groupID, searchString).then(res => {
                this.setState({ communityUserList: res.data })
            })
        } else {
            this.setState({ communityUserList: [] })
        }
        for (const member of list) {
            member['status'] = {}
            for (const onlineUser of onlineUsers) {
                if (member.user.id === onlineUser.id) {
                    member['status'] = onlineUser
                }
            }
            tempList.push(member)
        }
        tempList = tempList.filter(x =>
            x.user.username.toLowerCase().startsWith(searchString.toLowerCase())
        )
        if (filters.indexOf('online') !== -1) {
            tempList = tempList.filter(x => !isEmpty(x.status))
        }
        if (includes(filters, 'owners')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 103))
            )
        }
        if (includes(filters, 'admins')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 104))
            )
        }
        if (includes(filters, 'staffs')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 106))
            )
        }
        if (includes(filters, 'moderators')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 105))
            )
        }
        if (includes(filters, 'members')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 102))
            )
        }
        if (includes(filters, 'subscribers')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 101))
            )
        }
        if (includes(filters, 'banned')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 107))
            )
        }
        if (includes(filters, 'blocked')) {
            filteredItems.push(
                tempList.filter(x => includes(x.user_permission_set, 108))
            )
        }
        if (filteredItems.length) {
            tempList = union(...filteredItems)
        }
        this.setState({
            list: tempList
        })
    }

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
                        {this.state.communityUserList.map(
                            this.renderOnePlatformuser
                        )}
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
    groups: state.Group.groups,
    userProfile: state.UserProfile.profile,
    searchString: state.Common.subHeaderSearchString,
    filters: state.Common.subHeaderFilters
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
        dispatch(groupActions.changeLastSelectedGroup(groupID)),
    addNotification: notification =>
        dispatch(commonActions.addNotification(notification))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MembersManagement)
