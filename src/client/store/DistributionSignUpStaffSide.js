import { DispatchAPI } from 'api/base'
import * as DistributionSignUpStaffSideAPI from 'api/distribution-signup-staff-side'

const createAction = str => `DISTRIBUTION_SIGNUP_STAFF_SIDE_${str}`

const INITIAL_STATE = {
    isLoading: false,
    signups: [],
    selectedID: null,
    signupData: {},
    signupUserProfileData: {},
    signupComments: [],
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

const FETCH_SIGNUP_COMMENTS = createAction('FETCH_SIGNUP_COMMENTS')
const fetchSignupComments = id => dispatch => {
    dispatch({ type: FETCH_SIGNUP_COMMENTS })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchComments(id),
        {
            success: fetchSignupCommentsSuccess,
            failure: fetchSignupCommentsFailure
        }
    )
}

const FETCH_SIGNUP_COMMENTS_SUCCESS = createAction(
    'FETCH_SIGNUP_COMMENTS_SUCCESS'
)
const fetchSignupCommentsSuccess = response => ({
    type: FETCH_SIGNUP_COMMENTS_SUCCESS,
    comments: response.data
})

const FETCH_SIGNUP_COMMENTS_FAILURE = createAction(
    'FETCH_SIGNUP_COMMENTS_FAILURE'
)
const fetchSignupCommentsFailure = err => ({
    type: FETCH_SIGNUP_COMMENTS_FAILURE,
    error: err.message
})

const CREATE_SIGNUP_COMMENT = createAction('CREATE_SIGNUP_COMMENT')
const createSignupComment = (signupID, data) => dispatch => {
    dispatch({ type: CREATE_SIGNUP_COMMENT })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.postComment(signupID, data),
        {
            success: createSignupCommentSuccess,
            failure: createSignupCommentFailure
        }
    )
}

const CREATE_SIGNUP_COMMENT_SUCCESS = createAction(
    'CREATE_SIGNUP_COMMENT_SUCCESS'
)
const createSignupCommentSuccess = response => ({
    type: CREATE_SIGNUP_COMMENT_SUCCESS,
    comment: response.data
})

const CREATE_SIGNUP_COMMENT_FAILURE = createAction(
    'CREATE_SIGNUP_COMMENT_FAILURE'
)
const createSignupCommentFailure = err => ({
    type: CREATE_SIGNUP_COMMENT_FAILURE,
    error: err.message
})

const UPDATE_SIGNUP_COMMENT = createAction('UPDATE_SIGNUP_COMMENT')
const updateSignupComment = (signupID, data) => dispatch => {
    dispatch({ type: UPDATE_SIGNUP_COMMENT })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.updateComment(signupID, data),
        {
            success: updateSignupCommentSuccess,
            failure: updateSignupCommentFailure
        }
    )
}

const UPDATE_SIGNUP_COMMENT_SUCCESS = createAction(
    'UPDATE_SIGNUP_COMMENT_SUCCESS'
)
const updateSignupCommentSuccess = response => ({
    type: UPDATE_SIGNUP_COMMENT_SUCCESS,
    comment: response.data
})

const UPDATE_SIGNUP_COMMENT_FAILURE = createAction(
    'UPDATE_SIGNUP_COMMENT_FAILURE'
)
const updateSignupCommentFailure = err => ({
    type: UPDATE_SIGNUP_COMMENT_FAILURE,
    error: err.message
})

const DELETE_SIGNUP_COMMENT = createAction('DELETE_SIGNUP_COMMENT')
const deleteSignupComment = (signupID, commentID) => dispatch => {
    dispatch({ type: DELETE_SIGNUP_COMMENT })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.deleteComment(signupID, commentID),
        {
            success: deleteSignupCommentSuccess,
            failure: deleteSignupCommentFailure
        }
    )
}

const DELETE_SIGNUP_COMMENT_SUCCESS = createAction(
    'DELETE_SIGNUP_COMMENT_SUCCESS'
)
const deleteSignupCommentSuccess = response => ({
    type: DELETE_SIGNUP_COMMENT_SUCCESS,
    commentID: response.data.comment_id
})

const DELETE_SIGNUP_COMMENT_FAILURE = createAction(
    'DELETE_SIGNUP_COMMENT_FAILURE'
)
const deleteSignupCommentFailure = err => ({
    type: DELETE_SIGNUP_COMMENT_FAILURE,
    error: err.message
})

const MARK_FORM_VIOLATION = createAction('MARK_FORM_VIOLATION')
const markFormViolation = (signupID, data) => dispatch => {
    dispatch({ type: MARK_FORM_VIOLATION })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.markFormViolation(signupID, data),
        {
            success: markFormViolationSuccess,
            failure: markFormViolationFailure
        }
    )
}

const MARK_FORM_VIOLATION_SUCCESS = createAction('MARK_FORM_VIOLATION_SUCCESS')
const markFormViolationSuccess = response => ({
    type: MARK_FORM_VIOLATION_SUCCESS,
    signup: response.data
})

const MARK_FORM_VIOLATION_FAILURE = createAction('MARK_FORM_VIOLATION_FAILURE')
const markFormViolationFailure = err => ({
    type: MARK_FORM_VIOLATION_FAILURE,
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
    setSelectedID,
    fetchSignupComments,
    createSignupComment,
    updateSignupComment,
    deleteSignupComment,
    markFormViolation
}

export default function DistributionSignUpReducer(
    state = INITIAL_STATE,
    action
) {
    switch (action.type) {
        case FETCH_SIGNUPS:
        case FETCH_SIGNUP:
        case FETCH_SIGNUP_USER_PROFILE_DATA:
        case FETCH_SIGNUP_COMMENTS:
        case CREATE_SIGNUP_COMMENT:
        case UPDATE_SIGNUP_COMMENT:
        case DELETE_SIGNUP_COMMENT:
        case MARK_FORM_VIOLATION:
            return { ...state, isLoading: true, hasError: false }

        case FETCH_SIGNUPS_FAILURE:
        case FETCH_SIGNUP_FAILURE:
        case FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE:
        case FETCH_SIGNUP_COMMENTS_FAILURE:
        case CREATE_SIGNUP_COMMENT_FAILURE:
        case UPDATE_SIGNUP_COMMENT_FAILURE:
        case DELETE_SIGNUP_COMMENT_FAILURE:
        case MARK_FORM_VIOLATION_FAILURE:
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

        case FETCH_SIGNUP_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: action.comments
            }

        case CREATE_SIGNUP_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: [...state.signupComments, action.comment]
            }

        case UPDATE_SIGNUP_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: state.signupComments.map(x =>
                    x.id === action.comment.id ? action.comment : x
                )
            }

        case DELETE_SIGNUP_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: state.signupComments.filter(
                    x => x.id !== action.commentID
                )
            }

        case MARK_FORM_VIOLATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupData: action.signup
            }

        case SET_SELECTED_ID:
            return { ...state, selectedID: action.id }

        default:
            return state
    }
}
