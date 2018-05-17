import get from 'lodash/get'

import * as FetchProfileAPI from 'api/user'
import { DispatchAPI } from 'api/base'

const INITIAL_STATE = {
    isLoading: false,
    hasError: false,
    profile: {}
}

const createAction = str => `RUNTIME_${str}`

const FETCH_PROFILE = createAction('FETCH_PROFILE')
const fetchProfile = () => dispatch => {
    return DispatchAPI(dispatch, FetchProfileAPI.fetchProfile, {
        success: fetchProfileSuccess,
        failure: fetchProfileFailure
    })
}

const FETCH_PROFILE_SUCCESS = createAction('FETCH_PROFILE_SUCCESS')
const fetchProfileSuccess = response => {
    return {
        type: FETCH_PROFILE_SUCCESS,
        profile: get(response, 'data', {})
    }
}

const FETCH_PROFILE_FAILURE = createAction('FETCH_PROFILE_FAILURE')
const fetchProfileFailure = err => {
    return {
        type: FETCH_PROFILE_FAILURE,
        error: err.message
    }
}

export const actions = {
    fetchProfile
}

export default function RuntimeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PROFILE:
            return { ...state, isLoading: true, hasError: false }
        case FETCH_PROFILE_SUCCESS:
            return { ...state, isLoading: false, profile: action.profile }
        case FETCH_PROFILE_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }
        default:
            return state
    }
}
