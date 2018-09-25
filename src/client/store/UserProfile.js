import get from 'lodash/get'

import * as ProfileAPI from 'api/user'
import { DispatchAPI } from 'api/base'

const INITIAL_STATE = {
    isLoading: false,
    hasError: false,
    profile: {},
    profileImages: []
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

export const actions = {
    fetchProfile,
    saveProfile,
    fetchProfileImages,
    saveProfileImage,
    deleteProfileImage,
    updateProfileImage
}

export default function UserProfileReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PROFILE:
        case SAVE_PROFILE:
        case DELETE_PROFILE_IMAGE:
        case UPDATE_PROFILE_IMAGE:
        case FETCH_PROFILE_IMAGES:
        case SAVE_PROFILE_IMAGE:
            return { ...state, isLoading: true, hasError: false }
        case FETCH_PROFILE_FAILURE:
        case SAVE_PROFILE_FAILURE:
        case FETCH_PROFILE_IMAGES_FAILURE:
        case SAVE_PROFILE_IMAGE_FAILURE:
        case DELETE_PROFILE_IMAGE_FAILURE:
        case UPDATE_PROFILE_IMAGE_FAILURE:
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
                )
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
                ]
            }
        default:
            return state
    }
}
