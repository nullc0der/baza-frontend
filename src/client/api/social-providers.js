import { jsonAPI, formAPI } from './base'

export const fetchProfileImageURL = (provider) => {
    // const url = `/mock/download-image/${provider}`
    const url = '/hashtag/downloadsocialimage?provider=' + provider
    return jsonAPI(api => api.get(url))
}

export const uploadProfileImage = (provider, photo) => {
    // const url = `/mock/upload-image/${provider}`
    const url = '/hashtag/uploadimage'
    const data = new FormData()
    data.append('provider', provider)
    data.append('photo', photo)
    return formAPI(api => api.post(url, data))
}

export const fetchProviders = () => {
    const url = '/profile/socialauths'
    return jsonAPI(api => api.get(url))
}
