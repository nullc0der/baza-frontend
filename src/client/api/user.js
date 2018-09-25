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

export const fetchUserImages = () => {
    const url = '/profile/photos/'
    return jsonAPI(api => api.get(url))
}

export const saveUserImage = datas => {
    const url = '/profile/photos/'
    return formAPI(api => api.post(url, datas))
}

export const deleteUserImage = datas => {
    const url = '/profile/photos/'
    return jsonAPI(api => api.delete(url, datas))
}

export const fetchUserDocuments = () => {
    const url = '/profile/documents/'
    return jsonAPI(api => api.get(url))
}

export const saveUserDocument = datas => {
    const url = '/profile/documents/'
    return formAPI(api => api.post(url, datas))
}

export const deleteUserDocument = datas => {
    const url = '/profile/documents/'
    return jsonAPI(api => api.delete(url, datas))
}
