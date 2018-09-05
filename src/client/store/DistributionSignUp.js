import { DispatchAPI } from 'api/base'
import * as DistributionSignUpAPI from 'api/distribution-signup'

import isBoolean from 'lodash/isBoolean'

const createAction = str => `DISTRIBUTION_SIGNUP_${str}`

const INITIAL_STATE = {
    editMode: false,
    isLoading: false,
    signupList: [],
    selectedID: null,
    datas: [],
    hasError: false
}

INITIAL_STATE._fetchedData = { ...INITIAL_STATE.datas } // Store a copy of fetched data to discard changes

const TOGGLE_EDIT_MODE = createAction('TOGGLE_EDIT_MODE')
const toggleEditMode = force => ({
    type: TOGGLE_EDIT_MODE,
    force
})

const SAVE_ACCOUNT = createAction('SAVE_ACCOUNT')
const saveAccount = () => (dispatch, getState) => {
    dispatch({ type: SAVE_ACCOUNT })
    const data = getState().DistributionSignUp.data
    return DispatchAPI(dispatch, DistributionSignUpAPI.saveAccount(data), {
        success: saveAccountSuccess,
        failure: saveAccountFailure
    })
}

const SAVE_ACCOUNT_SUCCESS = createAction('SAVE_ACCOUNT_SUCCESS')
const saveAccountSuccess = response => ({
    type: SAVE_ACCOUNT_SUCCESS,
    data: response.data
})

const SAVE_ACCOUNT_FAILURE = createAction('SAVE_ACCOUNT_FAILURE')
const saveAccountFailure = err => ({
    type: SAVE_ACCOUNT_FAILURE,
    error: err.message
})

const DELETE_PHOTO = createAction('DELETE_PHOTO')
const deletePhoto = photoId => dispatch => {
    dispatch({ type: DELETE_PHOTO })
    return DispatchAPI(dispatch, DistributionSignUpAPI.deletePhoto(photoId), {
        success: deletePhotoSuccess,
        failure: deletePhotoFailure
    })
}

const DELETE_PHOTO_SUCCESS = createAction('DELETE_PHOTO_SUCCESS')
const deletePhotoSuccess = response => ({
    type: DELETE_PHOTO_SUCCESS,
    photoId: response.data.id
})

const DELETE_PHOTO_FAILURE = createAction('DELETE_PHOTO_FAILURE')
const deletePhotoFailure = err => ({
    type: DELETE_PHOTO_FAILURE,
    error: err.message
})

const DELETE_DOCUMENT = createAction('DELETE_DOCUMENT')
const deleteDocument = documentId => dispatch => {
    dispatch({ type: DELETE_DOCUMENT })
    return DispatchAPI(
        dispatch,
        DistributionSignUpAPI.deleteDocument(documentId),
        {
            success: deleteDocumentSuccess,
            failure: deleteDocumentFailure
        }
    )
}

const DELETE_DOCUMENT_SUCCESS = createAction('DELETE_DOCUMENT_SUCCESS')
const deleteDocumentSuccess = response => ({
    type: DELETE_DOCUMENT_SUCCESS,
    documentId: response.data.id
})

const DELETE_DOCUMENT_FAILURE = createAction('DELETE_DOCUMENT_FAILURE')
const deleteDocumentFailure = err => ({
    type: DELETE_DOCUMENT_FAILURE,
    error: err.message
})

const FETCH_ACCOUNT = createAction('FETCH_ACCOUNT')
const fetchAccount = id => dispatch => {
    dispatch({ type: FETCH_ACCOUNT })

    return DispatchAPI(dispatch, DistributionSignUpAPI.fetchAccount(id), {
        success: fetchAccountSuccess,
        failure: fetchAccountFailure
    })
}

const FETCH_ACCOUNT_SUCCESS = createAction('FETCH_ACCOUNT_SUCCESS')
const fetchAccountSuccess = response => ({
    type: FETCH_ACCOUNT_SUCCESS,
    data: response.data
})

const FETCH_ACCOUNT_FAILURE = createAction('FETCH_ACCOUNT_FAILURE')
const fetchAccountFailure = err => ({
    type: FETCH_ACCOUNT_FAILURE,
    error: err.message
})

const SET_FULL_NAME = createAction('SET_FULL_NAME')
const setFullName = fullName => ({
    type: SET_FULL_NAME,
    fullName
})

const SET_PHONE = createAction('SET_PHONE')
const setPhone = phone => ({
    type: SET_PHONE,
    phone
})

const SET_EMAIL = createAction('SET_EMAIL')
const setEmail = email => ({
    type: SET_EMAIL,
    email
})

const SET_PROFILE_LINK = createAction('SET_PROFILE_LINK')
const setProfileLink = profileLink => ({
    type: SET_PROFILE_LINK,
    profileLink
})

const DISCARD_EDITS = createAction('DISCARD_EDITS')
const discardEdits = () => dispatch => {
    dispatch({ type: DISCARD_EDITS })
    return Promise.resolve()
}

const FETCH_SIGNUPS_LIST = createAction('FETCH_SIGNUPS_LIST')
const fetchSignupsList = () => dispatch => {
    dispatch({ type: FETCH_SIGNUPS_LIST })

    return DispatchAPI(dispatch, DistributionSignUpAPI.fetchSignupsList(), {
        success: fetchSignupsListSuccess,
        failure: fetchSignupsListFailure
    })
}

const FETCH_SIGNUPS_LIST_SUCCESS = createAction('FETCH_SIGNUPS_LIST_SUCCESS')
const fetchSignupsListSuccess = response => ({
    type: FETCH_SIGNUPS_LIST_SUCCESS,
    signupList: response.data
})

const FETCH_SIGNUPS_LIST_FAILURE = createAction('FETCH_SIGNUPS_LIST_FAILURE')
const fetchSignupsListFailure = err => ({
    type: FETCH_SIGNUPS_LIST_FAILURE,
    error: err.message
})

const SET_SELECTED_ID = createAction('SET_SELECTED_ID')
const setSelectedID = id => ({
    type: SET_SELECTED_ID,
    id
})

export const actions = {
    saveAccount,
    deletePhoto,
    deleteDocument,
    fetchAccount,
    toggleEditMode,
    setFullName,
    setPhone,
    setEmail,
    setProfileLink,
    discardEdits,
    fetchSignupsList,
    setSelectedID
}

const removeFromList = (list, idToRemove) => {
    return list.filter(x => x.id !== idToRemove)
}

export default function DistributionSignUpReducer(
    state = INITIAL_STATE,
    action
) {
    switch (action.type) {
        case FETCH_ACCOUNT:
        case SAVE_ACCOUNT:
        case DELETE_PHOTO:
        case DELETE_DOCUMENT:
        case FETCH_SIGNUPS_LIST:
            return { ...state, isLoading: true, hasError: false }

        case FETCH_ACCOUNT_SUCCESS:
        case SAVE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                datas: [...state.datas, action.data],
                _fetchedData: [...state.datas, ...action.data]
            }

        case FETCH_ACCOUNT_FAILURE:
        case SAVE_ACCOUNT_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }
        case TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: isBoolean(action.force)
                    ? action.force
                    : !state.editMode
            }
        case SET_EMAIL:
            return {
                ...state,
                data: {
                    ...state.data,
                    email: { ...state.email, value: action.email }
                }
            }
        case SET_PHONE:
            return {
                ...state,
                data: {
                    ...state.data,
                    phone: { ...state.phone, value: action.phone }
                }
            }
        case SET_FULL_NAME:
            return {
                ...state,
                data: { ...state.data, fullName: action.fullName }
            }
        case SET_PROFILE_LINK:
            return {
                ...state,
                data: { ...state.data, profileLink: action.profileLink }
            }
        case DISCARD_EDITS:
            return { ...state, data: { ...state._fetchedData } }

        case DELETE_DOCUMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: {
                    ...state.data,
                    documents: removeFromList(
                        state.data.documents,
                        action.documentId
                    )
                }
            }

        case DELETE_PHOTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: {
                    ...state.data,
                    photos: removeFromList(state.data.photos, action.photoId)
                }
            }

        case DELETE_PHOTO_FAILURE:
        case DELETE_DOCUMENT_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }

        case FETCH_SIGNUPS_LIST_SUCCESS:
            return { ...state, isLoading: false, signupList: action.signupList }

        case FETCH_SIGNUPS_LIST_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }

        case SET_SELECTED_ID:
            return { ...state, selectedID: action.id }

        default:
            return state
    }
}
