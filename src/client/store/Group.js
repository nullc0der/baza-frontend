import get from 'lodash/get'

import { DispatchAPI } from 'api/base'
import * as GroupAPI from 'api/group'

const INITIAL_STATE = {
    groups: [],
    isLoading: false,
    hasError: null
}

const createAction = str => `GROUP_${str}`

const FETCH_GROUPS = createAction('FETCH_GROUPS')
const fetchGroups = () => dispath => {
    return DispatchAPI(dispath, GroupAPI.getGroups, {
        success: fetchGroupsSuccess,
        failure: fetchGroupsError
    })
}

const FETCH_GROUPS_SUCCESS = createAction('FETCH_GROUP_SUCCESS')
const fetchGroupsSuccess = res => ({
    type: FETCH_GROUPS_SUCCESS,
    groups: get(res, 'data', {})
})

const FETCH_GROUP_ERROR = 'FETCH_GROUP_ERROR'
const fetchGroupsError = err => ({
    type: FETCH_GROUP_ERROR,
    error: err
})

const CREATE_GROUP = 'CREATE_GROUP'
const createGroup = data => dispath => {
    return DispatchAPI(dispath, GroupAPI.createGroup(data), {
        success: createGroupSuccess,
        failure: createGroupError
    })
}

const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
const createGroupSuccess = res => ({
    type: CREATE_GROUP_SUCCESS,
    group: get(res, 'data', {})
})

const CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR'
const createGroupError = err => ({
    type: CREATE_GROUP_ERROR,
    error: err
})

export const actions = {
    fetchGroups,
    createGroup
}

export default function GroupReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CREATE_GROUP:
        case FETCH_GROUPS:
            return {
                ...state,
                isLoading: true,
                hasError: null
            }
        case CREATE_GROUP_ERROR:
        case FETCH_GROUP_ERROR:
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
        default:
            return state
    }
}
