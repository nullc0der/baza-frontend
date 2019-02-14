import get from 'lodash/get'

import * as usersAPI from 'api/users'
import { DispatchAPI } from 'api/base'

const INITIAL_STATE = {
    users: [],
    onlineUsers: [],
    isLoading: false,
    hasError: false
}

const createAction = str => `USERS_${str}`

const FETCH_USERS = createAction('FETCH_USERS')
const fetchUsers = () => dispatch =>
    DispatchAPI(dispatch, usersAPI.fetchUsers, {
        success: fetchUsersSuccess,
        failure: fetchUsersFailure
    })

const FETCH_USERS_SUCCESS = createAction('FETCH_USERS_SUCCESS')
const fetchUsersSuccess = response => ({
    type: FETCH_USERS_SUCCESS,
    users: get(response, 'data', [])
})

const FETCH_USERS_FAILURE = createAction('FETCH_USERS_FAILURE')
const fetchUsersFailure = err => ({
    type: FETCH_USERS_FAILURE,
    err
})

const SET_ONLINE_USERS = createAction('SET_ONLINE_USERS')
const setOnlineUsers = users => ({
    type: SET_ONLINE_USERS,
    onlineUsers: users
})

export const actions = {
    fetchUsers,
    setOnlineUsers
}

export default function UsersReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, isLoading: true }
        case FETCH_USERS_SUCCESS:
            return { ...state, users: action.users, isLoading: false }
        case FETCH_USERS_FAILURE:
            return { ...state, hasError: action.err, isLoading: false }
        case SET_ONLINE_USERS:
            return { ...state, onlineUsers: action.onlineUsers }
        default:
            return state
    }
}
