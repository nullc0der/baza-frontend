import { DispatchAPI } from 'api/base'
import * as DistributionSignUpStaffSideAPI from 'api/distribution-signup-staff-side'

const createAction = str => `DISTRIBUTION_SIGNUP_STAFF_SIDE_${str}`

const INITIAL_STATE = {
    isLoading: false,
    signups: [],
    selectedID: null,
    signupData: {},
    signupUserProfileData: {},
    hasError: false
}

const FETCH_SIGNUPS = createAction('FETCH_SIGNUPS')
const fetchSignups = () => dispatch => {
    dispatch({ type: FETCH_SIGNUPS })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchSignups(),
        {
            success: fetchSignupsSuccess,
            failure: fetchSignupsFailure
        }
    )
}

const FETCH_SIGNUPS_SUCCESS = createAction('FETCH_SIGNUPS_SUCCESS')
const fetchSignupsSuccess = response => ({
    type: FETCH_SIGNUPS_SUCCESS,
    signups: response.data
})

const FETCH_SIGNUPS_FAILURE = createAction('FETCH_SIGNUPS_FAILURE')
const fetchSignupsFailure = err => ({
    type: FETCH_SIGNUPS_FAILURE,
    error: err.message
})

const FETCH_SIGNUP = createAction('FETCH_SIGNUP')
const fetchSignup = id => dispatch => {
    dispatch({ type: FETCH_SIGNUP })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchSignup(id),
        {
            success: fetchSignupSuccess,
            failure: fetchSignupFailure
        }
    )
}

const FETCH_SIGNUP_SUCCESS = createAction('FETCH_SIGNUP_SUCCESS')
const fetchSignupSuccess = response => ({
    type: FETCH_SIGNUP_SUCCESS,
    data: response.data
})

const FETCH_SIGNUP_FAILURE = createAction('FETCH_SIGNUP_FAILURE')
const fetchSignupFailure = err => ({
    type: FETCH_SIGNUP_FAILURE,
    error: err.message
})

const FETCH_SIGNUP_USER_PROFILE_DATA = createAction(
    'FETCH_SIGNUP_USER_PROFILE_DATA'
)
const fetchSignupUserProfileData = id => dispatch => {
    dispatch({ type: FETCH_SIGNUP_USER_PROFILE_DATA })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchSignupUserProfile(id),
        {
            success: fetchSignupUserProfileDataSuccess,
            failure: fetchSignupUserProfileDataFailure
        }
    )
}

const FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS = createAction(
    'FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS'
)
const fetchSignupUserProfileDataSuccess = response => ({
    type: FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS,
    data: response.data
})

const FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE = createAction(
    'FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE'
)
const fetchSignupUserProfileDataFailure = err => ({
    type: FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE,
    error: err.message
})

const SET_SELECTED_ID = createAction('SET_SELECTED_ID')
const setSelectedID = id => ({
    type: SET_SELECTED_ID,
    id
})

export const actions = {
    fetchSignups,
    fetchSignup,
    fetchSignupUserProfileData,
    setSelectedID
}

export default function DistributionSignUpReducer(
    state = INITIAL_STATE,
    action
) {
    switch (action.type) {
        case FETCH_SIGNUPS:
        case FETCH_SIGNUP:
        case FETCH_SIGNUP_USER_PROFILE_DATA:
            return { ...state, isLoading: true, hasError: false }

        case FETCH_SIGNUPS_FAILURE:
        case FETCH_SIGNUP_FAILURE:
        case FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }

        case FETCH_SIGNUPS_SUCCESS:
            return { ...state, isLoading: false, signups: action.signups }

        case FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupUserProfileData: action.data
            }

        case FETCH_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupData: action.data
            }

        case SET_SELECTED_ID:
            return { ...state, selectedID: action.id }

        default:
            return state
    }
}
