import { jsonAPI, formAPI } from './base'

export const getGroups = () => {
    const url = '/groups/'
    return jsonAPI(api => api.get(url))
}

export const getSiteOwnerGroup = () => {
    const url = '/groups/siteownergroup/'
    return jsonAPI(api => api.get(url))
}

export const createGroup = data => {
    const url = '/groups/create/'
    return jsonAPI(api => api.post(url, data))
}

export const fetchGroup = groupID => {
    const url = `/groups/${groupID}/`
    return jsonAPI(api => api.get(url))
}

export const editGroup = (groupID, data) => {
    const url = `/groups/${groupID}/`
    return formAPI(api => api.post(url, data))
}

export const deleteGroup = groupID => {
    const url = `/groups/${groupID}/`
    return jsonAPI(api => api.delete(url))
}

export const fetchGroupMembers = groupID => {
    const url = `/groups/${groupID}/members/`
    return jsonAPI(api => api.get(url))
}

export const changeGroupMemberRole = (groupID, data) => {
    const url = `/groups/${groupID}/members/changerole/`
    return jsonAPI(api => api.post(url, data))
}

export const fetchGroupNotifications = groupID => {
    const url = `/groups/${groupID}/notifications/`
    return jsonAPI(api => api.get(url))
}

export const createGroupNotification = (groupID, data) => {
    const url = `/groups/${groupID}/notifications/`
    return jsonAPI(api => api.post(url, data))
}

export const editGroupNotification = (groupID, data) => {
    const url = `/groups/${groupID}/notifications/`
    return jsonAPI(api => api.put(url, data))
}

export const deleteGroupNotification = (groupID, data) => {
    const url = `/groups/${groupID}/notifications/`
    return jsonAPI(api => api.delete(url, data))
}

export const subscribeGroup = (groupID, data) => {
    const url = `/groups/${groupID}/subscribe/`
    return jsonAPI(api => api.post(url, data))
}

export const joinGroup = (groupID, data) => {
    const url = `/groups/${groupID}/join/`
    return jsonAPI(api => api.post(url, data))
}

export const fetchGroupMyNotifications = groupID => {
    const url = `/groups/${groupID}/mynotifications/`
    return jsonAPI(api => api.get(url))
}

export const setReadGroupMyNotification = (groupID, data) => {
    const url = `/groups/${groupID}/mynotifications/`
    return jsonAPI(api => api.put(url, data))
}

export const joinRequestAction = (groupID, data) => {
    const url = `/groups/${groupID}/joinrequests/`
    return jsonAPI(api => api.post(url, data))
}

export const getCommunityMembers = (groupID, query) => {
    const url = `/groups/${groupID}/invitemember/?query=${query}`
    return jsonAPI(api => api.get(url))
}

export const inviteCommunityMember = (groupID, data) => {
    const url = `/groups/${groupID}/invitemember/`
    return jsonAPI(api => api.post(url, data))
}

export const groupInviteActions = data => {
    const url = `/groups/inviteaction/`
    return jsonAPI(api => api.post(url, data))
}
