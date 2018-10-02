import get from 'lodash/get'

import * as ProfileAPI from 'api/user'
import { DispatchAPI } from 'api/base'

const INITIAL_STATE = {
    isLoading: false,
    hasError: false,
    profile: {},
    profileImages: [],
    userImages: [],
    userDocuments: [],
    phoneNumbers: [],
    profileEmails: []
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
const saveProfileImage = (datas, uploadProgressFn) => dispatch => {
    return DispatchAPI(
        dispatch,
        ProfileAPI.saveProfileImage(datas, uploadProgressFn),
        {
            success: saveProfileImageSuccess,
            failure: saveProfileImageFailure
        }
    )
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
const saveUserImage = (datas, uploadProgressFn) => dispatch => {
    return DispatchAPI(
        dispatch,
        ProfileAPI.saveUserImage(datas, uploadProgressFn),
        {
            success: saveUserImageSuccess,
            failure: saveUserImageFailure
        }
    )
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
const saveUserDocument = (datas, uploadProgressFn) => dispatch => {
    return DispatchAPI(
        dispatch,
        ProfileAPI.saveUserDocument(datas, uploadProgressFn),
        {
            success: saveUserDocumentSuccess,
            failure: saveUserDocumentFailure
        }
    )
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

const FETCH_PROFILE_PHONE_NUMBERS = createAction('FETCH_PROFILE_PHONE_NUMBERS')
const fetchProfilePhoneNumbers = () => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.fetchProfilePhoneNumbers, {
        success: fetchProfilePhoneNumbersSuccess,
        failure: fetchProfilePhoneNumbersFailure
    })
}

const FETCH_PROFILE_PHONE_NUMBERS_SUCCESS = createAction(
    'FETCH_PROFILE_PHONE_NUMBERS_SUCCESS'
)
const fetchProfilePhoneNumbersSuccess = response => {
    return {
        type: FETCH_PROFILE_PHONE_NUMBERS_SUCCESS,
        phoneNumbers: get(response, 'data', [])
    }
}

const FETCH_PROFILE_PHONE_NUMBERS_FAILURE = createAction(
    'FETCH_PROFILE_PHONE_NUMBERS_FAILURE'
)
const fetchProfilePhoneNumbersFailure = err => {
    return {
        type: FETCH_PROFILE_PHONE_NUMBERS_FAILURE,
        error: err
    }
}

const SAVE_PROFILE_PHONE_NUMBER = createAction('SAVE_PROFILE_PHONE_NUMBER')
const saveProfilePhoneNumber = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.saveProfilePhoneNumber(datas), {
        success: saveProfilePhoneNumbersuccess,
        failure: saveProfilePhoneNumberFailure
    })
}

const SAVE_PROFILE_PHONE_NUMBER_SUCCESS = createAction(
    'SAVE_PROFILE_PHONE_NUMBER_SUCCESS'
)
const saveProfilePhoneNumbersuccess = response => ({
    type: SAVE_PROFILE_PHONE_NUMBER_SUCCESS,
    phoneNumber: get(response, 'data', {})
})

const SAVE_PROFILE_PHONE_NUMBER_FAILURE = createAction(
    'SAVE_PROFILE_PHONE_NUMBER_FAILURE'
)
const saveProfilePhoneNumberFailure = err => ({
    type: SAVE_PROFILE_PHONE_NUMBER_FAILURE,
    error: err
})

const DELETE_PROFILE_PHONE_NUMBER = createAction('DELETE_PROFILE_PHONE_NUMBER')
const deleteProfilePhoneNumber = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.deleteProfilePhoneNumber(datas), {
        success: deleteProfilePhoneNumbersuccess,
        failure: deleteProfilePhoneNumberFailure
    })
}

const DELETE_PROFILE_PHONE_NUMBER_SUCCESS = createAction(
    'DELETE_PROFILE_PHONE_NUMBER_SUCCESS'
)
const deleteProfilePhoneNumbersuccess = response => ({
    type: DELETE_PROFILE_PHONE_NUMBER_SUCCESS,
    phoneNumberID: Number(get(response, 'data', null))
})

const DELETE_PROFILE_PHONE_NUMBER_FAILURE = createAction(
    'DELETE_PROFILE_PHONE_NUMBER_FAILURE'
)
const deleteProfilePhoneNumberFailure = err => ({
    type: DELETE_PROFILE_PHONE_NUMBER_FAILURE,
    error: err
})

const UPDATE_PROFILE_PHONE_NUMBER = createAction('UPDATE_PROFILE_PHONE_NUMBER')
const updateProfilePhoneNumber = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.updateProfilePhoneNumber(datas), {
        success: updateProfilePhoneNumbersuccess,
        failure: updateProfilePhoneNumberFailure
    })
}

const UPDATE_PROFILE_PHONE_NUMBER_SUCCESS = createAction(
    'UPDATE_PROFILE_PHONE_NUMBER_SUCCESS'
)
const updateProfilePhoneNumbersuccess = response => ({
    type: UPDATE_PROFILE_PHONE_NUMBER_SUCCESS,
    phoneNumber: get(response, 'data', {})
})

const UPDATE_PROFILE_PHONE_NUMBER_FAILURE = createAction(
    'UPDATE_PROFILE_PHONE_NUMBER_FAILURE'
)
const updateProfilePhoneNumberFailure = err => ({
    type: UPDATE_PROFILE_PHONE_NUMBER_FAILURE,
    error: err
})

const FETCH_PROFILE_EMAILS = createAction('FETCH_PROFILE_EMAILS')
const fetchProfileEmails = access_token => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.fetchProfileEmails(access_token), {
        success: fetchProfileEmailsSuccess,
        failure: fetchProfileEmailsFailure
    })
}

const FETCH_PROFILE_EMAILS_SUCCESS = createAction(
    'FETCH_PROFILE_EMAILS_SUCCESS'
)
const fetchProfileEmailsSuccess = response => {
    return {
        type: FETCH_PROFILE_EMAILS_SUCCESS,
        profileEmails: get(response, 'data', [])
    }
}

const FETCH_PROFILE_EMAILS_FAILURE = createAction(
    'FETCH_PROFILE_EMAILS_FAILURE'
)
const fetchProfileEmailsFailure = err => {
    return {
        type: FETCH_PROFILE_EMAILS_FAILURE,
        error: err
    }
}

const SAVE_PROFILE_EMAIL = createAction('SAVE_PROFILE_EMAIL')
const saveProfileEmail = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.saveProfileEmail(datas), {
        success: saveProfileEmailSuccess,
        failure: saveProfileEmailFailure
    })
}

const SAVE_PROFILE_EMAIL_SUCCESS = createAction('SAVE_PROFILE_EMAIL_SUCCESS')
const saveProfileEmailSuccess = response => ({
    type: SAVE_PROFILE_EMAIL_SUCCESS,
    profileEmail: get(response, 'data', {})
})

const SAVE_PROFILE_EMAIL_FAILURE = createAction('SAVE_PROFILE_EMAIL_FAILURE')
const saveProfileEmailFailure = err => ({
    type: SAVE_PROFILE_EMAIL_FAILURE,
    error: err
})

const DELETE_PROFILE_EMAIL = createAction('DELETE_PROFILE_EMAIL')
const deleteProfileEmail = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.deleteProfileEmail(datas), {
        success: deleteProfileEmailSuccess,
        failure: deleteProfileEmailFailure
    })
}

const DELETE_PROFILE_EMAIL_SUCCESS = createAction(
    'DELETE_PROFILE_EMAIL_SUCCESS'
)
const deleteProfileEmailSuccess = response => ({
    type: DELETE_PROFILE_EMAIL_SUCCESS,
    profileEmailID: Number(get(response, 'data', null))
})

const DELETE_PROFILE_EMAIL_FAILURE = createAction(
    'DELETE_PROFILE_EMAIL_FAILURE'
)
const deleteProfileEmailFailure = err => ({
    type: DELETE_PROFILE_EMAIL_FAILURE,
    error: err
})

const UPDATE_PROFILE_EMAIL = createAction('UPDATE_PROFILE_EMAIL')
const updateProfileEmail = datas => dispatch => {
    return DispatchAPI(dispatch, ProfileAPI.updateProfileEmail(datas), {
        success: updateProfileEmailSuccess,
        failure: updateProfileEmailFailure
    })
}

const UPDATE_PROFILE_EMAIL_SUCCESS = createAction(
    'UPDATE_PROFILE_EMAIL_SUCCESS'
)
const updateProfileEmailSuccess = response => ({
    type: UPDATE_PROFILE_EMAIL_SUCCESS,
    profileEmailID: Number(get(response, 'data', '-1'))
})

const UPDATE_PROFILE_EMAIL_FAILURE = createAction(
    'UPDATE_PROFILE_EMAIL_FAILURE'
)
const updateProfileEmailFailure = err => ({
    type: UPDATE_PROFILE_EMAIL_FAILURE,
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
    deleteUserDocument,
    fetchProfilePhoneNumbers,
    saveProfilePhoneNumber,
    deleteProfilePhoneNumber,
    updateProfilePhoneNumber,
    fetchProfileEmails,
    saveProfileEmail,
    updateProfileEmail,
    deleteProfileEmail
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
        case FETCH_PROFILE_PHONE_NUMBERS:
        case SAVE_PROFILE_PHONE_NUMBER:
        case DELETE_PROFILE_PHONE_NUMBER:
        case UPDATE_PROFILE_PHONE_NUMBER:
        case FETCH_PROFILE_EMAILS:
        case SAVE_PROFILE_EMAIL:
        case DELETE_PROFILE_EMAIL:
        case UPDATE_PROFILE_EMAIL:
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
        case SAVE_PROFILE_PHONE_NUMBER_FAILURE:
        case DELETE_PROFILE_PHONE_NUMBER_FAILURE:
        case UPDATE_PROFILE_PHONE_NUMBER_FAILURE:
        case FETCH_PROFILE_PHONE_NUMBERS_FAILURE:
        case FETCH_PROFILE_EMAILS_FAILURE:
        case SAVE_PROFILE_EMAIL_FAILURE:
        case DELETE_PROFILE_EMAIL_FAILURE:
        case UPDATE_PROFILE_EMAIL_FAILURE:
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
                profile: {
                    ...state.profile,
                    profile_photo: action.profileImage.userphoto.photo
                },
                isLoading: false
            }
        case DELETE_PROFILE_IMAGE_SUCCESS:
            const deletedProfilePhoto = state.profileImages.filter(
                x => x.id === action.profileImageID
            )[0]
            return {
                ...state,
                profileImages: state.profileImages.filter(
                    x => x.id !== action.profileImageID
                ),
                profile: {
                    ...state.profile,
                    profile_photo: deletedProfilePhoto.is_active
                        ? null
                        : state.profile.profile_photo
                },
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
                profile: {
                    ...state.profile,
                    profile_photo: state.profileImages.filter(
                        x => x.is_active
                    )[0].userphoto.photo
                },
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
        case FETCH_PROFILE_PHONE_NUMBERS_SUCCESS:
            return {
                ...state,
                phoneNumbers: action.phoneNumbers,
                isLoading: false
            }
        case SAVE_PROFILE_PHONE_NUMBER_SUCCESS:
            return {
                ...state,
                phoneNumbers: [...state.phoneNumbers, action.phoneNumber],
                isLoading: false
            }
        case DELETE_PROFILE_PHONE_NUMBER_SUCCESS:
            return {
                ...state,
                phoneNumbers: state.phoneNumbers.filter(
                    x => x.id !== action.phoneNumberID
                ),
                isLoading: false
            }
        case UPDATE_PROFILE_PHONE_NUMBER_SUCCESS:
            return {
                ...state,
                phoneNumbers: state.phoneNumbers.map(x => {
                    return x.id === action.phoneNumber.id
                        ? action.phoneNumber
                        : { ...x, primary: false }
                }),
                isLoading: false
            }
        case SAVE_PROFILE_EMAIL_SUCCESS:
            return {
                ...state,
                profileEmails: [...state.profileEmails, action.profileEmail],
                isLoading: false
            }
        case UPDATE_PROFILE_EMAIL_SUCCESS:
            return {
                ...state,
                profileEmails: state.profileEmails.map(x => {
                    x.id === action.profileEmailID
                        ? (x.primary = true)
                        : (x.primary = false)
                    return x
                }),
                isLoading: false
            }
        case DELETE_PROFILE_EMAIL_SUCCESS:
            return {
                ...state,
                profileEmails: state.profileEmails.filter(
                    x => x.id !== action.profileEmailID
                ),
                isLoading: false
            }
        case FETCH_PROFILE_EMAILS_SUCCESS:
            return {
                ...state,
                profileEmails: action.profileEmails,
                isLoading: false
            }
        default:
            return state
    }
}
