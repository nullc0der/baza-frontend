import get from 'lodash/get'

import { DispatchAPI } from 'api/base'
import * as GroupAPI from 'api/group'

const INITIAL_STATE = {
    groups: [],
    groupMembers: [],
    groupNotifications: [],
    lastSelectedGroup: 0,
    siteOwnerGroup: {},
    isLoading: false,
    hasError: null
}

const createAction = str => `GROUP_${str}`

const FETCH_GROUPS = createAction('FETCH_GROUPS')
const fetchGroups = () => dispatch => {
    return DispatchAPI(dispatch, GroupAPI.getGroups, {
        success: fetchGroupsSuccess,
        failure: fetchGroupsError
    })
}

const FETCH_GROUPS_SUCCESS = createAction('FETCH_GROUPS_SUCCESS')
const fetchGroupsSuccess = res => ({
    type: FETCH_GROUPS_SUCCESS,
    groups: get(res, 'data', {})
})

const FETCH_GROUPS_ERROR = createAction('FETCH_GROUPS_ERROR')
const fetchGroupsError = err => ({
    type: FETCH_GROUPS_ERROR,
    error: err
})

const CREATE_GROUP = createAction('CREATE_GROUP')
const createGroup = data => dispatch => {
    return DispatchAPI(dispatch, GroupAPI.createGroup(data), {
        success: createGroupSuccess,
        failure: createGroupError
    })
}

const CREATE_GROUP_SUCCESS = createAction('CREATE_GROUP_SUCCESS')
const createGroupSuccess = res => ({
    type: CREATE_GROUP_SUCCESS,
    group: get(res, 'data', {})
})

const CREATE_GROUP_ERROR = createAction('CREATE_GROUP_ERROR')
const createGroupError = err => ({
    type: CREATE_GROUP_ERROR,
    error: err
})

const FETCH_GROUP = createAction('FETCH_GROUP')
const fetchGroup = groupID => dispatch => {
    return DispatchAPI(dispatch, GroupAPI.fetchGroup(groupID), {
        success: fetchGroupSuccess,
        failure: fetchGroupError
    })
}

const FETCH_GROUP_SUCCESS = createAction('FETCH_GROUP_SUCCESS')
const fetchGroupSuccess = res => ({
    type: FETCH_GROUP_SUCCESS,
    group: get(res, 'data', {})
})

const FETCH_GROUP_ERROR = createAction('FETCH_GROUP_ERROR')
const fetchGroupError = err => ({
    type: FETCH_GROUP_ERROR,
    error: err
})

const EDIT_GROUP = createAction('EDIT_GROUP')
const editGroup = (groupID, data) => dispatch => {
    return DispatchAPI(dispatch, GroupAPI.editGroup(groupID, data), {
        success: editGroupSuccess,
        failure: editGroupError
    })
}

const EDIT_GROUP_SUCCESS = createAction('EDIT_GROUP_SUCCESS')
const editGroupSuccess = res => ({
    type: EDIT_GROUP_SUCCESS,
    group: get(res, 'data', {})
})

const EDIT_GROUP_ERROR = createAction('EDIT_GROUP_ERROR')
const editGroupError = err => ({
    type: EDIT_GROUP_ERROR,
    error: err
})

const DELETE_GROUP = createAction('DELETE_GROUP')
const deleteGroup = groupID => dispatch => {
    return DispatchAPI(dispatch, GroupAPI.deleteGroup(groupID), {
        success: deleteGroupSuccess,
        failure: deleteGroupError
    })
}

const DELETE_GROUP_SUCCESS = createAction('DELETE_GROUP_SUCCESS')
const deleteGroupSuccess = res => ({
    type: DELETE_GROUP_SUCCESS,
    group: get(res, 'data', {})
})

const DELETE_GROUP_ERROR = createAction('DELETE_GROUP_ERROR')
const deleteGroupError = err => ({
    type: DELETE_GROUP_ERROR,
    error: err
})

const FETCH_GROUP_MEMBERS = createAction('FETCH_GROUP_MEMBERS')
const fetchGroupMembers = groupID => dispath => {
    return DispatchAPI(dispath, GroupAPI.fetchGroupMembers(groupID), {
        success: fetchGroupMembersSuccess,
        failure: fetchGroupMembersFailure
    })
}

const FETCH_GROUP_MEMBERS_SUCCESS = createAction('FETCH_GROUP_MEMBERS_SUCCESS')
const fetchGroupMembersSuccess = res => ({
    type: FETCH_GROUP_MEMBERS_SUCCESS,
    members: get(res, 'data', {})
})

const FETCH_GROUP_MEMBERS_ERROR = createAction('FETCH_GROUP_MEMBERS_ERROR')
const fetchGroupMembersFailure = err => ({
    type: FETCH_GROUP_MEMBERS_ERROR,
    error: err
})

const CHANGE_MEMBER_ROLE = createAction('CHANGE_MEMBER_ROLE')
const changeMemberRole = (groupID, data) => dispatch => {
    return DispatchAPI(
        dispatch,
        GroupAPI.changeGroupMemberRole(groupID, data),
        {
            success: changeMemberRoleSuccess,
            failure: changeMemberRoleError
        }
    )
}

const CHANGE_MEMBER_ROLE_SUCCESS = createAction('CHANGE_MEMBER_ROLE_SUCCESS')
const changeMemberRoleSuccess = res => ({
    type: CHANGE_MEMBER_ROLE_SUCCESS,
    data: get(res, 'data', {})
})

const CHANGE_MEMBER_ROLE_ERROR = createAction('CHANGE_MEMBER_ROLE_ERROR')
const changeMemberRoleError = err => ({
    type: CHANGE_MEMBER_ROLE_ERROR,
    error: err
})

const CHANGE_LAST_SELECTED_GROUP = createAction('CHANGE_LAST_SELECTED_GROUP')
const changeLastSelectedGroup = groupID => ({
    type: CHANGE_LAST_SELECTED_GROUP,
    groupID
})

const FETCH_SITE_OWNER_GROUP = createAction('FETCH_SITE_OWNER_GROUP')
const fetchSiteOwnerGroup = () => dispatch => {
    return DispatchAPI(dispatch, GroupAPI.getSiteOwnerGroup(), {
        success: fetchSiteOwnerGroupSuccess,
        failure: fetchSiteOwnerGroupError
    })
}

const FETCH_SITE_OWNER_GROUP_SUCCESS = createAction(
    'FETCH_SITE_OWNER_GROUP_SUCCESS'
)
const fetchSiteOwnerGroupSuccess = res => ({
    type: FETCH_SITE_OWNER_GROUP_SUCCESS,
    siteOwnerGroup: get(res, 'data', {})
})

const FETCH_SITE_OWNER_GROUP_ERROR = createAction(
    'FETCH_SITE_OWNER_GROUP_ERROR'
)
const fetchSiteOwnerGroupError = err => ({
    type: FETCH_SITE_OWNER_GROUP_ERROR,
    error: err
})

const FETCH_GROUP_NOTIFICATIONS = createAction('FETCH_GROUP_NOTIFICATIONS')
const fetchGroupNotifications = groupID => dispatch => {
    return DispatchAPI(dispatch, GroupAPI.fetchGroupNotifications(groupID), {
        success: fetchGroupNotificationsSuccess,
        failure: fetchGroupNotificationsError
    })
}

const FETCH_GROUP_NOTIFICATIONS_SUCCESS = createAction(
    'FETCH_GROUP_NOTIFICATIONS_SUCCESS'
)
const fetchGroupNotificationsSuccess = res => ({
    type: FETCH_GROUP_NOTIFICATIONS_SUCCESS,
    groupNotifications: get(res, 'data', {})
})

const FETCH_GROUP_NOTIFICATIONS_ERROR = createAction(
    'FETCH_GROUP_NOTIFICATIONS_ERROR'
)
const fetchGroupNotificationsError = err => ({
    type: FETCH_GROUP_NOTIFICATIONS_ERROR,
    error: err
})

const CREATE_GROUP_NOTIFICATION = createAction('CREATE_GROUP_NOTIFICATION')
const createGroupNotification = (groupID, data) => dispatch => {
    return DispatchAPI(
        dispatch,
        GroupAPI.createGroupNotification(groupID, data),
        {
            success: createGroupNotificationSuccess,
            failure: createGroupNotificationError
        }
    )
}

const CREATE_GROUP_NOTIFICATION_SUCCESS = createAction(
    'CREATE_GROUP_NOTIFICATION_SUCCESS'
)
const createGroupNotificationSuccess = res => ({
    type: CREATE_GROUP_NOTIFICATION_SUCCESS,
    groupNotification: get(res, 'data', {})
})

const CREATE_GROUP_NOTIFICATION_ERROR = createAction(
    'CREATE_GROUP_NOTIFICATION_ERROR'
)
const createGroupNotificationError = err => ({
    type: CREATE_GROUP_NOTIFICATION_ERROR,
    error: err
})

const EDIT_GROUP_NOTIFICATION = createAction('EDIT_GROUP_NOTIFICATION')
const editGroupNotification = (groupID, data) => dispatch => {
    return DispatchAPI(
        dispatch,
        GroupAPI.editGroupNotification(groupID, data),
        {
            success: editGroupNotificationSuccess,
            failure: editGroupNotificationError
        }
    )
}

const EDIT_GROUP_NOTIFICATION_SUCCESS = createAction(
    'EDIT_GROUP_NOTIFICATION_SUCCESS'
)
const editGroupNotificationSuccess = res => ({
    type: EDIT_GROUP_NOTIFICATION_SUCCESS,
    groupNotification: get(res, 'data', {})
})

const EDIT_GROUP_NOTIFICATION_ERROR = createAction(
    'EDIT_GROUP_NOTIFICATION_ERROR'
)
const editGroupNotificationError = err => ({
    type: EDIT_GROUP_NOTIFICATION_ERROR,
    error: err
})

const DELETE_GROUP_NOTIFICATION = createAction('DELETE_GROUP_NOTIFICATION')
const deleteGroupNotification = (groupID, data) => dispatch => {
    return DispatchAPI(
        dispatch,
        GroupAPI.deleteGroupNotification(groupID, data),
        {
            success: deleteGroupNotificationSuccess,
            failure: deleteGroupNotificationError
        }
    )
}

const DELETE_GROUP_NOTIFICATION_SUCCESS = createAction(
    'DELETE_GROUP_NOTIFICATION_SUCCESS'
)
const deleteGroupNotificationSuccess = res => ({
    type: DELETE_GROUP_NOTIFICATION_SUCCESS,
    groupNotificationID: get(res, 'data', -1)
})

const DELETE_GROUP_NOTIFICATION_ERROR = createAction(
    'DELETE_GROUP_NOTIFICATION_ERROR'
)
const deleteGroupNotificationError = err => ({
    type: DELETE_GROUP_NOTIFICATION_ERROR,
    error: err
})

export const actions = {
    fetchGroups,
    createGroup,
    fetchGroup,
    editGroup,
    deleteGroup,
    fetchGroupMembers,
    changeMemberRole,
    changeLastSelectedGroup,
    fetchSiteOwnerGroup,
    fetchGroupNotifications,
    createGroupNotification,
    editGroupNotification,
    deleteGroupNotification
}

const getGroups = (groups, group) => {
    return groups.map(x => (x.id === group.id ? group : x))
}

export default function GroupReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CREATE_GROUP:
        case FETCH_GROUPS:
        case FETCH_GROUP:
        case EDIT_GROUP:
        case DELETE_GROUP:
        case FETCH_GROUP_MEMBERS:
        case CHANGE_MEMBER_ROLE:
        case FETCH_SITE_OWNER_GROUP:
        case FETCH_GROUP_NOTIFICATIONS:
        case CREATE_GROUP_NOTIFICATION:
        case EDIT_GROUP_NOTIFICATION:
        case DELETE_GROUP_NOTIFICATION:
            return {
                ...state,
                isLoading: true,
                hasError: null
            }
        case CREATE_GROUP_ERROR:
        case FETCH_GROUPS_ERROR:
        case FETCH_GROUP_ERROR:
        case EDIT_GROUP_ERROR:
        case DELETE_GROUP_ERROR:
        case FETCH_GROUP_MEMBERS_ERROR:
        case CHANGE_MEMBER_ROLE_ERROR:
        case FETCH_SITE_OWNER_GROUP_ERROR:
        case FETCH_GROUP_NOTIFICATIONS_ERROR:
        case CREATE_GROUP_NOTIFICATION_ERROR:
        case EDIT_GROUP_NOTIFICATION_ERROR:
        case DELETE_GROUP_NOTIFICATION_ERROR:
            return {
                ...state,
                isLoading: false,
                hasError: action.error
            }
        case CREATE_GROUP_SUCCESS:
            return {
                ...state,
                groups: [...state.groups, action.group]
            }
        case FETCH_GROUPS_SUCCESS:
            return {
                ...state,
                groups: action.groups
            }
        case FETCH_GROUP_SUCCESS:
            return {
                ...state,
                groups: [...state.groups, action.group]
            }
        case EDIT_GROUP_SUCCESS:
            return {
                ...state,
                groups: getGroups(state.groups.slice(), action.group)
            }
        case DELETE_GROUP_SUCCESS:
            return {
                ...state,
                groups: getGroups(state.groups.slice(), action.group)
            }
        case FETCH_GROUP_MEMBERS_SUCCESS:
            return {
                ...state,
                groupMembers: action.members
            }
        case CHANGE_MEMBER_ROLE_SUCCESS:
            return {
                ...state,
                groupMembers: state.groupMembers.map(x =>
                    x.user.id === action.data.user.id ? action.data : x
                )
            }
        case CHANGE_LAST_SELECTED_GROUP:
            return {
                ...state,
                lastSelectedGroup: Number(action.groupID)
            }
        case FETCH_SITE_OWNER_GROUP_SUCCESS:
            return {
                ...state,
                siteOwnerGroup: action.siteOwnerGroup
            }
        case FETCH_GROUP_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                groupNotifications: action.groupNotifications
            }
        case CREATE_GROUP_NOTIFICATION_SUCCESS:
            return {
                ...state,
                groupNotifications: [
                    ...state.groupNotifications,
                    action.groupNotification
                ]
            }
        case EDIT_GROUP_NOTIFICATION_SUCCESS:
            return {
                ...state,
                groupNotifications: state.groupNotifications.map(x =>
                    x.id === action.groupNotification.id
                        ? action.groupNotification
                        : x
                )
            }
        case DELETE_GROUP_NOTIFICATION_SUCCESS:
            const groupNotificationID =
                action.groupNotificationID.notification_id
            return {
                ...state,
                groupNotifications: state.groupNotifications.filter(
                    x => x.id !== Number(groupNotificationID)
                )
            }
        default:
            return state
    }
}
