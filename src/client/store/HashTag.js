import { DispatchAPI } from 'api/base'
import * as SocialProvidersAPI from 'api/social-providers'

const DEFAULT_PROVIDERS = [
    { name: 'Twitter', icon: 'twitter', className: 'btn-twitter', connected: false },
    { name: 'Facebook', icon: 'facebook-f', className: 'btn-fb', connected: false }
]

const createAction = str => `HASHTAG_${str}`
const INITIAL_STATE = {
    providers: DEFAULT_PROVIDERS,
    selectedProvider: 0
}

const CHANGE_PROVIDER = createAction('CHANGE_PROVIDER')
const changeProvider = (selectedProvider) => ({
    type: CHANGE_PROVIDER,
    selectedProvider
})

const DOWNLOAD_IMAGE = createAction('DOWNLOAD_IMAGE')
const downloadImage = (provider) => (dispatch, getState) => {
    dispatch({ type: DOWNLOAD_IMAGE })
    return DispatchAPI(dispatch, SocialProvidersAPI.fetchProfileImageURL(provider), {
        success: downloadImageSuccess,
        failure: downloadImageFailure
    })
}

const DOWNLOAD_IMAGE_SUCCESS = createAction('DOWNLOAD_IMAGE_SUCCESS')
const downloadImageSuccess = (response) => ({
    type: DOWNLOAD_IMAGE_SUCCESS,
    imageUrl: response.imageUrl
})

const DOWNLOAD_IMAGE_FAILURE = createAction('DOWNLOAD_IMAGE_FAILURE')
const downloadImageFailure = (err) => ({
    type: DOWNLOAD_IMAGE_FAILURE,
    error: err.message
})


const UPLOAD_IMAGE = createAction('UPLOAD_IMAGE')
const uploadImage = (provider, image) => (dispatch, getState) => {
    dispatch({ type: UPLOAD_IMAGE })
    return DispatchAPI(dispatch, SocialProvidersAPI.uploadProfileImage(provider, image), {
        success: uploadImageSuccess,
        failure: uploadImageFailure
    })
}

const UPLOAD_IMAGE_SUCCESS = createAction('UPLOAD_IMAGE_SUCCESS')
const uploadImageSuccess = (response) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    imageUrl: response.imageUrl
})

const UPLOAD_IMAGE_FAILURE = createAction('UPLOAD_IMAGE_FAILURE')
const uploadImageFailure = (err) => ({
    type: UPLOAD_IMAGE_FAILURE,
    error: err.message
})

const FETCH_PROVIDERS = createAction('FETCH_PROVIDERS')
const fetchProviders = () => (dispatch) => {
    dispatch({ type: FETCH_PROVIDERS })
    return DispatchAPI(dispatch, SocialProvidersAPI.fetchProviders(), {
        success: fetchProvidersSuccess,
        failure: fetchProvidersFailure
    })
}
const FETCH_PROVIDERS_SUCCESS = createAction('FETCH_PROVIDERS_SUCCESS')
const fetchProvidersSuccess = response => ({
    type: FETCH_PROVIDERS_SUCCESS,
    providers: response.data
})
const FETCH_PROVIDERS_FAILURE = createAction('FETCH_PROVIDERS_FAILURE')
const fetchProvidersFailure = err => ({
    type: FETCH_PROVIDERS_FAILURE,
    error: err.message
})

export const actions = {
    changeProvider,
    downloadImage,
    uploadImage,
    fetchProviders
}

export default function HashTag(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_PROVIDER:
            return {
                ...state,
                selectedProvider: action.selectedProvider
            }
        case DOWNLOAD_IMAGE:
        case UPLOAD_IMAGE:
        case FETCH_PROVIDERS:
            return { ...state, isLoading: true, hasError: false }

        case DOWNLOAD_IMAGE_FAILURE:
        case UPLOAD_IMAGE_FAILURE:
        case FETCH_PROVIDERS_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }

        case DOWNLOAD_IMAGE_SUCCESS:
            return { ...state, isLoading: false, downloadedImageUrl: action.imageUrl }
        case UPLOAD_IMAGE_SUCCESS:
            return { ...state, isLoading: false, uploadedImageUrl: action.imageUrl }
        case FETCH_PROVIDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                providers: state.providers.map(provider => {
                    provider.connected = action.providers.some(x => x.provider === provider.name.toLowerCase())
                    return provider
                })
            }
        default:
            return state
    }
}
