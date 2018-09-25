import get from 'lodash/get'

import * as ProfileAPI from 'api/user'
import { DispatchAPI } from 'api/base'

const INITIAL_STATE = {
    isLoading: false,
    hasError: false,
    profile: {},
    profileImages: [],
    userImages: [],
    userDocuments: []
}

const createAction = str => `USER_PROFILE_${str}`

const FETCH_PROFILE = createAction('FETCH_PROFILE')
const fetchProfile = () => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.fetchProfile, {
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
        error: err
    }
}

const SAVE_PROFILE = createAction('SAVE_PROFILE')
const saveProfile = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.saveProfile(datas), {
        success: saveProfileSuccess,
        failure: saveProfileFailure
    })
}

const SAVE_PROFILE_SUCCESS = createAction('SAVE_PROFILE_SUCCESS')
const saveProfileSuccess = response => ({
    type: SAVE_PROFILE_SUCCESS,
    profile: get(response, 'data', {})
})

const SAVE_PROFILE_FAILURE = createAction('SAVE_PROFILE_FAILURE')
const saveProfileFailure = err => ({
    type: SAVE_PROFILE_FAILURE,
    error: err
})

const FETCH_PROFILE_IMAGES = createAction('FETCH_PROFILE_IMAGES')
const fetchProfileImages = () => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.fetchProfileImages, {
        success: fetchProfileImagesSuccess,
        failure: fetchProfileImagesFailure
    })
}

const FETCH_PROFILE_IMAGES_SUCCESS = createAction(
    'FETCH_PROFILE_IMAGES_SUCCESS'
)
const fetchProfileImagesSuccess = response => {
    return {
        type: FETCH_PROFILE_IMAGES_SUCCESS,
        profileImages: get(response, 'data', [])
    }
}

const FETCH_PROFILE_IMAGES_FAILURE = createAction(
    'FETCH_PROFILE_IMAGES_FAILURE'
)
const fetchProfileImagesFailure = err => {
    return {
        type: FETCH_PROFILE_IMAGES_FAILURE,
        error: err
    }
}

const SAVE_PROFILE_IMAGE = createAction('SAVE_PROFILE_IMAGE')
const saveProfileImage = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.saveProfileImage(datas), {
        success: saveProfileImageSuccess,
        failure: saveProfileImageFailure
    })
}

const SAVE_PROFILE_IMAGE_SUCCESS = createAction('SAVE_PROFILE_IMAGE_SUCCESS')
const saveProfileImageSuccess = response => ({
    type: SAVE_PROFILE_IMAGE_SUCCESS,
    profileImage: get(response, 'data', {})
})

const SAVE_PROFILE_IMAGE_FAILURE = createAction('SAVE_PROFILE_IMAGE_FAILURE')
const saveProfileImageFailure = err => ({
    type: SAVE_PROFILE_IMAGE_FAILURE,
    error: err
})

const DELETE_PROFILE_IMAGE = createAction('DELETE_PROFILE_IMAGE')
const deleteProfileImage = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.deleteProfileImage(datas), {
        success: deleteProfileImageSuccess,
        failure: deleteProfileImageFailure
    })
}

const DELETE_PROFILE_IMAGE_SUCCESS = createAction(
    'DELETE_PROFILE_IMAGE_SUCCESS'
)
const deleteProfileImageSuccess = response => ({
    type: DELETE_PROFILE_IMAGE_SUCCESS,
    profileImageID: Number(get(response, 'data', null))
})

const DELETE_PROFILE_IMAGE_FAILURE = createAction(
    'DELETE_PROFILE_IMAGE_FAILURE'
)
const deleteProfileImageFailure = err => ({
    type: DELETE_PROFILE_IMAGE_FAILURE,
    error: err
})

const UPDATE_PROFILE_IMAGE = createAction('UPDATE_PROFILE_IMAGE')
const updateProfileImage = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.updateProfileImage(datas), {
        success: updateProfileImageSuccess,
        failure: updateProfileImageFailure
    })
}

const UPDATE_PROFILE_IMAGE_SUCCESS = createAction(
    'UPDATE_PROFILE_IMAGE_SUCCESS'
)
const updateProfileImageSuccess = response => ({
    type: UPDATE_PROFILE_IMAGE_SUCCESS,
    profileImageID: Number(get(response, 'data', '-1'))
})

const UPDATE_PROFILE_IMAGE_FAILURE = createAction(
    'UPDATE_PROFILE_IMAGE_FAILURE'
)
const updateProfileImageFailure = err => ({
    type: UPDATE_PROFILE_IMAGE_FAILURE,
    error: err
})

const FETCH_USER_IMAGES = createAction('FETCH_USER_IMAGES')
const fetchUserImages = () => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.fetchUserImages, {
        success: fetchUserImagesSuccess,
        failure: fetchUserImagesFailure
    })
}

const FETCH_USER_IMAGES_SUCCESS = createAction('FETCH_USER_IMAGES_SUCCESS')
const fetchUserImagesSuccess = response => {
    return {
        type: FETCH_USER_IMAGES_SUCCESS,
        userImages: get(response, 'data', [])
    }
}

const FETCH_USER_IMAGES_FAILURE = createAction('FETCH_USER_IMAGES_FAILURE')
const fetchUserImagesFailure = err => {
    return {
        type: FETCH_USER_IMAGES_FAILURE,
        error: err
    }
}

const SAVE_USER_IMAGE = createAction('SAVE_USER_IMAGE')
const saveUserImage = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.saveUserImage(datas), {
        success: saveUserImageSuccess,
        failure: saveUserImageFailure
    })
}

const SAVE_USER_IMAGE_SUCCESS = createAction('SAVE_USER_IMAGE_SUCCESS')
const saveUserImageSuccess = response => ({
    type: SAVE_USER_IMAGE_SUCCESS,
    userImage: get(response, 'data', {})
})

const SAVE_USER_IMAGE_FAILURE = createAction('SAVE_USER_IMAGE_FAILURE')
const saveUserImageFailure = err => ({
    type: SAVE_USER_IMAGE_FAILURE,
    error: err
})

const DELETE_USER_IMAGE = createAction('DELETE_USER_IMAGE')
const deleteUserImage = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.deleteUserImage(datas), {
        success: deleteUserImageSuccess,
        failure: deleteUserImageFailure
    })
}

const DELETE_USER_IMAGE_SUCCESS = createAction('DELETE_USER_IMAGE_SUCCESS')
const deleteUserImageSuccess = response => ({
    type: DELETE_USER_IMAGE_SUCCESS,
    userImageID: Number(get(response, 'data', null))
})

const DELETE_USER_IMAGE_FAILURE = createAction('DELETE_USER_IMAGE_FAILURE')
const deleteUserImageFailure = err => ({
    type: DELETE_USER_IMAGE_FAILURE,
    error: err
})

const FETCH_USER_DOCUMENTS = createAction('FETCH_USER_DOCUMENTS')
const fetchUserDocuments = () => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.fetchUserDocuments, {
        success: fetchUserDocumentsSuccess,
        failure: fetchUserDocumentsFailure
    })
}

const FETCH_USER_DOCUMENTS_SUCCESS = createAction(
    'FETCH_USER_DOCUMENTS_SUCCESS'
)
const fetchUserDocumentsSuccess = response => {
    return {
        type: FETCH_USER_DOCUMENTS_SUCCESS,
        userDocuments: get(response, 'data', [])
    }
}

const FETCH_USER_DOCUMENTS_FAILURE = createAction(
    'FETCH_USER_DOCUMENTS_FAILURE'
)
const fetchUserDocumentsFailure = err => {
    return {
        type: FETCH_USER_DOCUMENTS_FAILURE,
        error: err
    }
}

const SAVE_USER_DOCUMENT = createAction('SAVE_USER_DOCUMENT')
const saveUserDocument = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.saveUserDocument(datas), {
        success: saveUserDocumentSuccess,
        failure: saveUserDocumentFailure
    })
}

const SAVE_USER_DOCUMENT_SUCCESS = createAction('SAVE_USER_DOCUMENT_SUCCESS')
const saveUserDocumentSuccess = response => ({
    type: SAVE_USER_DOCUMENT_SUCCESS,
    userDocument: get(response, 'data', {})
})

const SAVE_USER_DOCUMENT_FAILURE = createAction('SAVE_USER_DOCUMENT_FAILURE')
const saveUserDocumentFailure = err => ({
    type: SAVE_USER_DOCUMENT_FAILURE,
    error: err
})

const DELETE_USER_DOCUMENT = createAction('DELETE_USER_DOCUMENT')
const deleteUserDocument = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.deleteUserDocument(datas), {
        success: deleteUserDocumentSuccess,
        failure: deleteUserDocumentFailure
    })
}

const DELETE_USER_DOCUMENT_SUCCESS = createAction(
    'DELETE_USER_DOCUMENT_SUCCESS'
)
const deleteUserDocumentSuccess = response => ({
    type: DELETE_USER_DOCUMENT_SUCCESS,
    userDocumentID: Number(get(response, 'data', null))
})

const DELETE_USER_DOCUMENT_FAILURE = createAction(
    'DELETE_USER_DOCUMENT_FAILURE'
)
const deleteUserDocumentFailure = err => ({
    type: DELETE_USER_DOCUMENT_FAILURE,
    error: err
})

export const actions = {
    fetchProfile,
    saveProfile,
    fetchProfileImages,
    saveProfileImage,
    deleteProfileImage,
    updateProfileImage,
    fetchUserImages,
    saveUserImage,
    deleteUserImage,
    fetchUserDocuments,
    saveUserDocument,
    deleteUserDocument
}

export default function UserProfileReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PROFILE:
        case SAVE_PROFILE:
        case DELETE_PROFILE_IMAGE:
        case UPDATE_PROFILE_IMAGE:
        case FETCH_PROFILE_IMAGES:
        case SAVE_PROFILE_IMAGE:
        case FETCH_USER_IMAGES:
        case SAVE_USER_IMAGE:
        case DELETE_USER_IMAGE:
        case FETCH_USER_DOCUMENTS:
        case SAVE_USER_DOCUMENT:
        case DELETE_USER_DOCUMENT:
            return { ...state, isLoading: true, hasError: false }
        case FETCH_PROFILE_FAILURE:
        case SAVE_PROFILE_FAILURE:
        case FETCH_PROFILE_IMAGES_FAILURE:
        case SAVE_PROFILE_IMAGE_FAILURE:
        case DELETE_PROFILE_IMAGE_FAILURE:
        case UPDATE_PROFILE_IMAGE_FAILURE:
        case FETCH_USER_IMAGES_FAILURE:
        case SAVE_USER_IMAGE_FAILURE:
        case DELETE_USER_IMAGE_FAILURE:
        case FETCH_USER_DOCUMENTS_FAILURE:
        case SAVE_USER_DOCUMENT_FAILURE:
        case DELETE_USER_DOCUMENT_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }
        case FETCH_PROFILE_SUCCESS:
        case SAVE_PROFILE_SUCCESS:
            return { ...state, isLoading: false, profile: action.profile }
        case FETCH_PROFILE_IMAGES_SUCCESS:
            return {
                ...state,
                profileImages: action.profileImages,
                isLoading: false
            }
        case SAVE_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                profileImages: [
                    ...state.profileImages.map(x => {
                        x.is_active = false
                        return x
                    }),
                    action.profileImage
                ],
                isLoading: false
            }
        case DELETE_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                profileImages: state.profileImages.filter(
                    x => x.id !== action.profileImageID
                ),
                isLoading: false
            }
        case UPDATE_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                profileImages: [
                    ...state.profileImages.map(x => {
                        x.id === action.profileImageID
                            ? (x.is_active = true)
                            : (x.is_active = false)
                        return x
                    })
                ],
                isLoading: false
            }
        case FETCH_USER_IMAGES_SUCCESS:
            return {
                ...state,
                userImages: action.userImages,
                isLoading: false
            }
        case SAVE_USER_IMAGE_SUCCESS:
            return {
                ...state,
                userImages: [...state.userImages, action.userImage],
                isLoading: false
            }
        case DELETE_USER_IMAGE_SUCCESS:
            return {
                ...state,
                userImages: state.userImages.filter(
                    x => x.id !== action.userImageID
                ),
                isLoading: false
            }
        case FETCH_USER_DOCUMENTS_SUCCESS:
            return {
                ...state,
                userDocuments: action.userDocuments,
                isLoading: false
            }
        case SAVE_USER_DOCUMENT_SUCCESS:
            return {
                ...state,
                userDocuments: [...state.userDocuments, action.userDocument],
                isLoading: false
            }
        case DELETE_USER_DOCUMENT_SUCCESS:
            return {
                ...state,
                userDocuments: state.userDocuments.filter(
                    x => x.id !== action.userDocumentID
                ),
                isLoading: false
            }
        default:
            return state
    }
}
