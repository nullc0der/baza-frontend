import { DispatchAPI } from 'api/base'
import * as DistributionSignUpStaffSideAPI from 'api/distribution-signup-staff-side'

const createAction = (str) => `DISTRIBUTION_SIGNUP_STAFF_SIDE_${str}`

const INITIAL_STATE = {
    isLoading: false,
    signups: [],
    selectedID: null,
    signupData: {},
    signupUserProfileData: {},
    signupComments: [],
    signupActivityLogs: [],
    staffs: [],
    hasError: false,
}

const FETCH_SIGNUPS = createAction('FETCH_SIGNUPS')
const fetchSignups = () => (dispatch) => {
    dispatch({ type: FETCH_SIGNUPS })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchSignups(),
        {
            success: fetchSignupsSuccess,
            failure: fetchSignupsFailure,
        }
    )
}

const FETCH_SIGNUPS_SUCCESS = createAction('FETCH_SIGNUPS_SUCCESS')
const fetchSignupsSuccess = (response) => ({
    type: FETCH_SIGNUPS_SUCCESS,
    signups: response.data,
})

const FETCH_SIGNUPS_FAILURE = createAction('FETCH_SIGNUPS_FAILURE')
const fetchSignupsFailure = (err) => ({
    type: FETCH_SIGNUPS_FAILURE,
    error: err.message,
})

const FETCH_SIGNUP = createAction('FETCH_SIGNUP')
const fetchSignup = (id) => (dispatch) => {
    dispatch({ type: FETCH_SIGNUP })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchSignup(id),
        {
            success: fetchSignupSuccess,
            failure: fetchSignupFailure,
        }
    )
}

const FETCH_SIGNUP_SUCCESS = createAction('FETCH_SIGNUP_SUCCESS')
const fetchSignupSuccess = (response) => ({
    type: FETCH_SIGNUP_SUCCESS,
    data: response.data,
})

const FETCH_SIGNUP_FAILURE = createAction('FETCH_SIGNUP_FAILURE')
const fetchSignupFailure = (err) => ({
    type: FETCH_SIGNUP_FAILURE,
    error: err,
})

const FETCH_SIGNUP_USER_PROFILE_DATA = createAction(
    'FETCH_SIGNUP_USER_PROFILE_DATA'
)
const fetchSignupUserProfileData = (id) => (dispatch) => {
    dispatch({ type: FETCH_SIGNUP_USER_PROFILE_DATA })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchSignupUserProfile(id),
        {
            success: fetchSignupUserProfileDataSuccess,
            failure: fetchSignupUserProfileDataFailure,
        }
    )
}

const FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS = createAction(
    'FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS'
)
const fetchSignupUserProfileDataSuccess = (response) => ({
    type: FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS,
    data: response.data,
})

const FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE = createAction(
    'FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE'
)
const fetchSignupUserProfileDataFailure = (err) => ({
    type: FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE,
    error: err,
})

const FETCH_SIGNUP_COMMENTS = createAction('FETCH_SIGNUP_COMMENTS')
const fetchSignupComments = (id) => (dispatch) => {
    dispatch({ type: FETCH_SIGNUP_COMMENTS })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchComments(id),
        {
            success: fetchSignupCommentsSuccess,
            failure: fetchSignupCommentsFailure,
        }
    )
}

const FETCH_SIGNUP_COMMENTS_SUCCESS = createAction(
    'FETCH_SIGNUP_COMMENTS_SUCCESS'
)
const fetchSignupCommentsSuccess = (response) => ({
    type: FETCH_SIGNUP_COMMENTS_SUCCESS,
    comments: response.data,
})

const FETCH_SIGNUP_COMMENTS_FAILURE = createAction(
    'FETCH_SIGNUP_COMMENTS_FAILURE'
)
const fetchSignupCommentsFailure = (err) => ({
    type: FETCH_SIGNUP_COMMENTS_FAILURE,
    error: err,
})

const CREATE_SIGNUP_COMMENT = createAction('CREATE_SIGNUP_COMMENT')
const createSignupComment = (signupID, data) => (dispatch) => {
    dispatch({ type: CREATE_SIGNUP_COMMENT })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.postComment(signupID, data),
        {
            success: createSignupCommentSuccess,
            failure: createSignupCommentFailure,
        }
    )
}

const CREATE_SIGNUP_COMMENT_SUCCESS = createAction(
    'CREATE_SIGNUP_COMMENT_SUCCESS'
)
const createSignupCommentSuccess = (response) => ({
    type: CREATE_SIGNUP_COMMENT_SUCCESS,
    comment: response.data,
})

const CREATE_SIGNUP_COMMENT_FAILURE = createAction(
    'CREATE_SIGNUP_COMMENT_FAILURE'
)
const createSignupCommentFailure = (err) => ({
    type: CREATE_SIGNUP_COMMENT_FAILURE,
    error: err,
})

const UPDATE_SIGNUP_COMMENT = createAction('UPDATE_SIGNUP_COMMENT')
const updateSignupComment = (signupID, data) => (dispatch) => {
    dispatch({ type: UPDATE_SIGNUP_COMMENT })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.updateComment(signupID, data),
        {
            success: updateSignupCommentSuccess,
            failure: updateSignupCommentFailure,
        }
    )
}

const UPDATE_SIGNUP_COMMENT_SUCCESS = createAction(
    'UPDATE_SIGNUP_COMMENT_SUCCESS'
)
const updateSignupCommentSuccess = (response) => ({
    type: UPDATE_SIGNUP_COMMENT_SUCCESS,
    comment: response.data,
})

const UPDATE_SIGNUP_COMMENT_FAILURE = createAction(
    'UPDATE_SIGNUP_COMMENT_FAILURE'
)
const updateSignupCommentFailure = (err) => ({
    type: UPDATE_SIGNUP_COMMENT_FAILURE,
    error: err,
})

const DELETE_SIGNUP_COMMENT = createAction('DELETE_SIGNUP_COMMENT')
const deleteSignupComment = (signupID, commentID) => (dispatch) => {
    dispatch({ type: DELETE_SIGNUP_COMMENT })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.deleteComment(signupID, commentID),
        {
            success: deleteSignupCommentSuccess,
            failure: deleteSignupCommentFailure,
        }
    )
}

const DELETE_SIGNUP_COMMENT_SUCCESS = createAction(
    'DELETE_SIGNUP_COMMENT_SUCCESS'
)
const deleteSignupCommentSuccess = (response) => ({
    type: DELETE_SIGNUP_COMMENT_SUCCESS,
    commentID: response.data.comment_id,
})

const DELETE_SIGNUP_COMMENT_FAILURE = createAction(
    'DELETE_SIGNUP_COMMENT_FAILURE'
)
const deleteSignupCommentFailure = (err) => ({
    type: DELETE_SIGNUP_COMMENT_FAILURE,
    error: err,
})

const MARK_FORM_VIOLATION = createAction('MARK_FORM_VIOLATION')
const markFormViolation = (signupID, data) => (dispatch) => {
    dispatch({ type: MARK_FORM_VIOLATION })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.markFormViolation(signupID, data),
        {
            success: markFormViolationSuccess,
            failure: markFormViolationFailure,
        }
    )
}

const MARK_FORM_VIOLATION_SUCCESS = createAction('MARK_FORM_VIOLATION_SUCCESS')
const markFormViolationSuccess = (response) => ({
    type: MARK_FORM_VIOLATION_SUCCESS,
    signup: response.data,
})

const MARK_FORM_VIOLATION_FAILURE = createAction('MARK_FORM_VIOLATION_FAILURE')
const markFormViolationFailure = (err) => ({
    type: MARK_FORM_VIOLATION_FAILURE,
    error: err,
})

const CHANGE_SIGNUP_STATUS = createAction('CHANGE_SIGNUP_STATUS')
const changeSignupStatus = (signupID, status) => (dispatch) => {
    dispatch({ type: CHANGE_SIGNUP_STATUS })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.changeSignupStatus(signupID, status),
        {
            success: changeSignupStatusSuccess,
            failure: changeSignupStatusFailure,
        }
    )
}

const CHANGE_SIGNUP_STATUS_SUCCESS = createAction(
    'CHANGE_SIGNUP_STATUS_SUCCESS'
)
const changeSignupStatusSuccess = (response) => ({
    type: CHANGE_SIGNUP_STATUS_SUCCESS,
    data: response.data,
})

const CHANGE_SIGNUP_STATUS_FAILURE = createAction(
    'CHANGE_SIGNUP_STATUS_FAILURE'
)
const changeSignupStatusFailure = (err) => ({
    type: CHANGE_SIGNUP_STATUS_FAILURE,
    error: err,
})

const GET_REASSIGNABLE_STAFFS = createAction('GET_REASSIGNABLE_STAFFS')
const getReassignableStaffs = () => (dispatch) => {
    dispatch({ type: GET_REASSIGNABLE_STAFFS })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.getReassignableStaffs(),
        {
            success: getReassignableStaffsSuccess,
            failure: getReassignableStaffsFailure,
        }
    )
}

const GET_REASSIGNABLE_STAFFS_SUCCESS = createAction(
    'GET_REASSIGNABLE_STAFFS_SUCCESS'
)
const getReassignableStaffsSuccess = (response) => ({
    type: GET_REASSIGNABLE_STAFFS_SUCCESS,
    data: response.data,
})

const GET_REASSIGNABLE_STAFFS_FAILURE = createAction(
    'GET_REASSIGNABLE_STAFFS_FAILURE'
)
const getReassignableStaffsFailure = (err) => ({
    type: GET_REASSIGNABLE_STAFFS_FAILURE,
    error: err,
})

const REASSIGN_STAFF = createAction('REASSIGN_STAFF')
const reassignStaff = (datas) => (dispatch) => {
    dispatch({ type: REASSIGN_STAFF })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.reassignStaff(datas),
        {
            success: reassignStaffSuccess,
            failure: reassignStaffFailure,
        }
    )
}

const REASSIGN_STAFF_SUCCESS = createAction('REASSIGN_STAFF_SUCCESS')
const reassignStaffSuccess = (response) => ({
    type: REASSIGN_STAFF_SUCCESS,
    data: response.data,
})

const REASSIGN_STAFF_FAILURE = createAction('REASSIGN_STAFF_FAILURE')
const reassignStaffFailure = (err) => ({
    type: REASSIGN_STAFF_FAILURE,
    error: err,
})

const FETCH_SIGNUP_ACTIVITY_LOGS = createAction('FETCH_SIGNUP_ACTIVITY_LOGS')
const fetchSignupActivityLogs = (id) => (dispatch) => {
    dispatch({ type: FETCH_SIGNUP_ACTIVITY_LOGS })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.fetchActivityLogs(id),
        {
            success: fetchSignupActivityLogsSuccess,
            failure: fetchSignupActivityLogsFailure,
        }
    )
}

const FETCH_SIGNUP_ACTIVITY_LOGS_SUCCESS = createAction(
    'FETCH_SIGNUP_ACTIVITY_LOGS_SUCCESS'
)
const fetchSignupActivityLogsSuccess = (response) => ({
    type: FETCH_SIGNUP_ACTIVITY_LOGS_SUCCESS,
    activityLogs: response.data,
})

const FETCH_SIGNUP_ACTIVITY_LOGS_FAILURE = createAction(
    'FETCH_SIGNUP_ACTIVITY_LOGS_FAILURE'
)
const fetchSignupActivityLogsFailure = (err) => ({
    type: FETCH_SIGNUP_ACTIVITY_LOGS_FAILURE,
    error: err,
})

const TOGGLE_ON_DISTRIBUTION = createAction('TOGGLE_ON_DISTRIBUTION')
const toggleOnDistribution = (signupID, onDistribution) => (dispatch) => {
    dispatch({ type: TOGGLE_ON_DISTRIBUTION })

    return DispatchAPI(
        dispatch,
        DistributionSignUpStaffSideAPI.toggleOnDistribution(
            signupID,
            onDistribution
        ),
        {
            success: toggleOnDistributionSuccess,
            failure: toggleOnDistributionFailure,
        }
    )
}

const TOGGLE_ON_DISTRIBUTION_SUCCESS = createAction(
    'TOGGLE_ON_DISTRIBUTION_SUCCESS'
)
const toggleOnDistributionSuccess = () => ({
    type: TOGGLE_ON_DISTRIBUTION_SUCCESS,
})

const TOGGLE_ON_DISTRIBUTION_FAILURE = createAction(
    'TOGGLE_ON_DISTRIBUTION_FAILURE'
)
const toggleOnDistributionFailure = (err) => ({
    type: TOGGLE_ON_DISTRIBUTION_FAILURE,
    error: err,
})

const SET_SELECTED_ID = createAction('SET_SELECTED_ID')
const setSelectedID = (id) => ({
    type: SET_SELECTED_ID,
    id,
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
    markFormViolation,
    changeSignupStatus,
    getReassignableStaffs,
    reassignStaff,
    fetchSignupActivityLogs,
    toggleOnDistribution,
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
        case CHANGE_SIGNUP_STATUS:
        case GET_REASSIGNABLE_STAFFS:
        case REASSIGN_STAFF:
        case FETCH_SIGNUP_ACTIVITY_LOGS:
        case TOGGLE_ON_DISTRIBUTION:
            return { ...state, isLoading: true, hasError: false }

        case FETCH_SIGNUPS_FAILURE:
        case CREATE_SIGNUP_COMMENT_FAILURE:
        case UPDATE_SIGNUP_COMMENT_FAILURE:
        case DELETE_SIGNUP_COMMENT_FAILURE:
        case MARK_FORM_VIOLATION_FAILURE:
        case CHANGE_SIGNUP_STATUS_FAILURE:
        case GET_REASSIGNABLE_STAFFS_FAILURE:
        case REASSIGN_STAFF_FAILURE:
        case FETCH_SIGNUP_ACTIVITY_LOGS_FAILURE:
        case TOGGLE_ON_DISTRIBUTION_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }

        case FETCH_SIGNUP_FAILURE:
        case FETCH_SIGNUP_USER_PROFILE_DATA_FAILURE:
        case FETCH_SIGNUP_COMMENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                selectedID: null,
                signupData: {},
                signupUserProfileData: {},
                signupComments: [],
                hasError: action.error,
            }

        case FETCH_SIGNUPS_SUCCESS:
            return { ...state, isLoading: false, signups: action.signups }

        case FETCH_SIGNUP_USER_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupUserProfileData: action.data,
            }

        case FETCH_SIGNUP_SUCCESS:
        case CHANGE_SIGNUP_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupData: action.data,
            }

        case FETCH_SIGNUP_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: action.comments,
            }

        case CREATE_SIGNUP_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: [...state.signupComments, action.comment],
            }

        case UPDATE_SIGNUP_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: state.signupComments.map((x) =>
                    x.id === action.comment.id ? action.comment : x
                ),
            }

        case DELETE_SIGNUP_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupComments: state.signupComments.filter(
                    (x) => x.id !== action.commentID
                ),
            }

        case MARK_FORM_VIOLATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupData: action.signup,
            }

        case GET_REASSIGNABLE_STAFFS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                staffs: action.data,
            }

        case REASSIGN_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedID: null,
                signupData: {},
                signupUserProfileData: {},
                signupComments: [],
                signups: state.signups.filter(
                    (x) => x.id_ !== action.data.signup_id
                ),
            }

        case FETCH_SIGNUP_ACTIVITY_LOGS_SUCCESS:
            return { ...state, signupActivityLogs: action.activityLogs }

        case SET_SELECTED_ID:
            return { ...state, selectedID: action.id }

        case TOGGLE_ON_DISTRIBUTION_SUCCESS:
            return {
                ...state,
                signupData: {
                    ...state.signupData,
                    additional_data: {
                        ...state.signupData.additional_data,
                        on_distribution: !state.signupData.additional_data
                            .on_distribution,
                    },
                },
            }

        default:
            return state
    }
}
