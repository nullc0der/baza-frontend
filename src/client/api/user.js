import { jsonAPI, formAPI } from './base'

export const fetchProfile = () => {
    const url = '/profile/'
    return jsonAPI(api => api.get(url))
}

export const saveProfile = datas => {
    const url = '/profile/'
    return jsonAPI(api => api.post(url, datas))
}

export const fetchProfileImages = () => {
    const url = '/profile/profilephotos/'
    return jsonAPI(api => api.get(url))
}

export const saveProfileImage = datas => {
    const url = '/profile/profilephotos/'
    return formAPI(api => api.post(url, datas))
}

export const deleteProfileImage = datas => {
    const url = '/profile/profilephotos/'
    return jsonAPI(api => api.delete(url, datas))
}

export const updateProfileImage = datas => {
    const url = '/profile/profilephotos/'
    return jsonAPI(api => api.put(url, datas))
}
