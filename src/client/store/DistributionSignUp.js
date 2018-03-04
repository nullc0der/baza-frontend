import { DispatchAPI } from 'api/base'
import * as DistributionSignUpAPI from 'api/distribution-signup'

import isBoolean from 'lodash/isBoolean'

const createAction = str => `DISTRIBUTION_SIGNUP_${str}`

const INITIAL_STATE = {
  editMode: true,
  isLoading: false,
  data: {
    id: 41,
    fullName: 'Sharad Kant',
    email: {
      value: 'someemail@comp.com',
      isVerified: true,
      error: 'This email was used for previous signups'
    },
    phone: {
      value: '9876543210',
      isVerified: false,
      error: 'No data available on twilio'
    },
    status: 'approved',
    signupDate: '2016-12-10',
    verifiedDate: '2016-12-19',
    referralCode: '5bauhdl',
    walletAddress: '9102uuanvuviuh1902u409fhlxncbxqiwi',
    isOnDistribution: false,
    profileLink: 'user.name.here',
    photos: [
      {
        id: 1,
        url: 'https://api.adorable.io/avatars/285/abott1@adorable.png',
        isProfilePhoto: true
      },
      {
        id: 2,
        url: 'https://api.adorable.io/avatars/285/abott2@adorable.png',
        isProfilePhoto: false
      },
      {
        id: 3,
        url: 'https://api.adorable.io/avatars/285/abott3@adorable.png',
        isProfilePhoto: false
      },
      {
        id: 4,
        url: 'https://api.adorable.io/avatars/285/abott4@adorable.png',
        isProfilePhoto: false
      },
      {
        id: 5,
        url: 'https://api.adorable.io/avatars/285/abott5@adorable.png',
        isProfilePhoto: false
      },
      {
        id: 6,
        url: 'https://api.adorable.io/avatars/285/abott6@adorable.png',
        isProfilePhoto: false
      },
      {
        id: 7,
        url: 'https://api.adorable.io/avatars/285/abott7@adorable.png',
        isProfilePhoto: false
      },
      {
        id: 8,
        url: 'https://api.adorable.io/avatars/285/abott8@adorable.png',
        isProfilePhoto: false
      },
      {
        id: 9,
        url: 'https://api.adorable.io/avatars/285/abott9@adorable.png',
        isProfilePhoto: false
      }
    ],
    documents: [
      { id: 1, name: 'Agreement.pdf', type: 'pdf', url: '#' },
      { id: 2, name: 'Support.pdf', type: 'pdf', url: '#' },
      { id: 3, name: 'Guidelines.pdf', type: 'pdf', url: '#' },
      { id: 4, name: 'Documentation.pdf', type: 'pdf', url: '#' }
    ]
  },
  hasError: false
}

INITIAL_STATE._fetchedData = { ...INITIAL_STATE.data } // Store a copy of fetched data to discard changes

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

const FETCH_ACCOUNT = createAction('FETCH_ACCOUNT')
const fetchAccount = id => (dispatch, getState) => {
  dispatch({ type: FETCH_ACCOUNT })

  // mock id as all of the profile.
  // the api already returns what's passed to it
  // delete the following line when linking with real api
  id = getState().DistributionSignUp.data

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

export const actions = {
  saveAccount,
  deletePhoto,
  fetchAccount,
  toggleEditMode,
  setFullName,
  setPhone,
  setEmail,
  setProfileLink,
  discardEdits
}

const removePhotoFromList = (list, idToRemove) => {
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
      return { ...state, isLoading: true, hasError: false }

    case FETCH_ACCOUNT_SUCCESS:
    case SAVE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: { ...action.data },
        _fetchedData: { ...action.data }
      }

    case FETCH_ACCOUNT_FAILURE:
    case SAVE_ACCOUNT_FAILURE:
      return { ...state, isLoading: false, hasError: action.error }
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: isBoolean(action.force) ? action.force : !state.editMode
      }
    case SET_EMAIL:
      return {
        ...state,
        data: { ...state.data, email: { ...state.email, value: action.email } }
      }
    case SET_PHONE:
      return {
        ...state,
        data: { ...state.data, phone: { ...state.phone, value: action.phone } }
      }
    case SET_FULL_NAME:
      return { ...state, data: { ...state.data, fullName: action.fullName } }
    case SET_PROFILE_LINK:
      return {
        ...state,
        data: { ...state.data, profileLink: action.profileLink }
      }
    case DISCARD_EDITS:
      return { ...state, data: { ...state._fetchedData } }

    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          photos: removePhotoFromList(state.data.photos, action.photoId)
        }
      }

    default:
      return state
  }
}
