import { jsonAPI, formAPI } from './base'

export const fetchProfileImageURL = (provider) => {
    const url = `/mock/download-image/${provider}`
    return jsonAPI(api => api.get(url))
}

export const uploadProfileImage = (provider, image) => {
    const url = `/mock/upload-image/${provider}`
    const data = new FormData()
    data.append('image', image)
    return formAPI(api => api.post(url, data))
}
