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

export const saveProfileImage = (datas, upLoadProgressFn) => {
    const url = '/profile/profilephotos/'
    return formAPI(api =>
        api.post(url, datas, {
            onUploadProgress: value => upLoadProgressFn(value)
        })
    )
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

export const saveUserImage = (datas, upLoadProgressFn) => {
    const url = '/profile/photos/'
    return formAPI(api =>
        api.post(url, datas, {
            onUploadProgress: value => upLoadProgressFn(value)
        })
    )
}

export const deleteUserImage = datas => {
    const url = '/profile/photos/'
    return jsonAPI(api => api.delete(url, datas))
}

export const fetchUserDocuments = () => {
    const url = '/profile/documents/'
    return jsonAPI(api => api.get(url))
}

export const saveUserDocument = (datas, upLoadProgressFn) => {
    const url = '/profile/documents/'
    return formAPI(api =>
        api.post(url, datas, {
            onUploadProgress: value => upLoadProgressFn(value)
        })
    )
}

export const deleteUserDocument = datas => {
    const url = '/profile/documents/'
    return jsonAPI(api => api.delete(url, datas))
}

export const fetchProfilePhoneNumbers = () => {
    const url = '/profile/phonenumbers/'
    return jsonAPI(api => api.get(url))
}

export const saveProfilePhoneNumber = datas => {
    const url = '/profile/phonenumbers/'
    return jsonAPI(api => api.post(url, datas))
}

export const deleteProfilePhoneNumber = datas => {
    const url = '/profile/phonenumbers/'
    return jsonAPI(api => api.delete(url, datas))
}
