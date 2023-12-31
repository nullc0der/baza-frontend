import { jsonAPI, formAPI } from './base'

export const fetchProfile = () => {
    const url = '/profile/'
    return jsonAPI((api) => api.get(url))
}

export const saveProfile = (datas) => {
    const url = '/profile/'
    return jsonAPI((api) => api.post(url, datas))
}

export const fetchProfileImages = () => {
    const url = '/profile/profilephotos/'
    return jsonAPI((api) => api.get(url))
}

export const saveProfileImage = (datas, upLoadProgressFn) => {
    const url = '/profile/profilephotos/'
    return jsonAPI((api) =>
        api.post(url, datas, {
            onUploadProgress: (value) => upLoadProgressFn(value),
        })
    )
}

export const deleteProfileImage = (datas) => {
    const url = '/profile/profilephotos/'
    return jsonAPI((api) => api.delete(url, datas))
}

export const updateProfileImage = (datas) => {
    const url = '/profile/profilephotos/'
    return jsonAPI((api) => api.put(url, datas))
}

export const fetchUserImages = () => {
    const url = '/profile/photos/'
    return jsonAPI((api) => api.get(url))
}

export const saveUserImage = (datas, upLoadProgressFn) => {
    const url = '/profile/photos/'
    return jsonAPI((api) =>
        api.post(url, datas, {
            onUploadProgress: (value) => upLoadProgressFn(value),
        })
    )
}

export const deleteUserImage = (datas) => {
    const url = '/profile/photos/'
    return jsonAPI((api) => api.delete(url, datas))
}

export const fetchUserDocuments = () => {
    const url = '/profile/documents/'
    return jsonAPI((api) => api.get(url))
}

export const saveUserDocument = (datas, upLoadProgressFn) => {
    const url = '/profile/documents/'
    return formAPI((api) =>
        api.post(url, datas, {
            onUploadProgress: (value) => upLoadProgressFn(value),
        })
    )
}

export const deleteUserDocument = (datas) => {
    const url = '/profile/documents/'
    return jsonAPI((api) => api.delete(url, datas))
}

export const fetchProfilePhoneNumbers = () => {
    const url = '/profile/phonenumbers/'
    return jsonAPI((api) => api.get(url))
}

export const saveProfilePhoneNumber = (datas) => {
    const url = '/profile/phonenumbers/'
    return jsonAPI((api) => api.post(url, datas))
}

export const deleteProfilePhoneNumber = (datas) => {
    const url = '/profile/phonenumbers/'
    return jsonAPI((api) => api.delete(url, datas))
}

export const updateProfilePhoneNumber = (datas) => {
    const url = '/profile/phonenumbers/'
    return jsonAPI((api) => api.put(url, datas))
}

export const fetchProfileEmails = () => {
    const url = `/profile/emails/`
    return jsonAPI((api) => api.get(url))
}

export const saveProfileEmail = (datas) => {
    const url = '/profile/emails/'
    return jsonAPI((api) => api.post(url, datas))
}

export const updateProfileEmail = (datas) => {
    const url = '/profile/emails/'
    return jsonAPI((api) => api.put(url, datas))
}

export const deleteProfileEmail = (datas) => {
    const url = '/profile/emails/'
    return jsonAPI((api) => api.delete(url, datas))
}

export const getSocialAuths = (access_token) => {
    const url = `/profile/socialauths/?access_token=${access_token}`
    return jsonAPI((api) => api.get(url))
}

export const connectOrDisconnectSocialAuth = (datas) => {
    const url = '/profile/socialauths/'
    return jsonAPI((api) => api.post(url, datas))
}

export const setUserPassword = (datas) => {
    const url = '/profile/setpassword/'
    return jsonAPI((api) => api.post(url, datas))
}

export const getTwoFactorStatus = () => {
    const url = '/profile/twofactor/?type=status'
    return jsonAPI((api) => api.get(url))
}

export const getTwoFactorRecoveryCodes = () => {
    const url = '/profile/twofactor/?type=getcodes'
    return jsonAPI((api) => api.get(url))
}

export const getProvisioningUri = () => {
    const url = '/profile/twofactor/'
    return jsonAPI((api) =>
        api.post(url, {
            type: 'geturi',
        })
    )
}

export const verifyTwoFactor = (otp) => {
    const url = '/profile/twofactor/'
    return jsonAPI((api) =>
        api.post(url, {
            type: 'verify',
            otp: otp,
        })
    )
}

export const disableTwoFactor = (password) => {
    const url = '/profile/twofactor/'
    return jsonAPI((api) =>
        api.post(url, {
            type: 'disable',
            password: password,
        })
    )
}

export const sendPhoneVerification = (phoneNumberID) => {
    const url = `/profile/validatephone/?id=${phoneNumberID}`
    return jsonAPI((api) => api.get(url))
}

export const validatePhone = (datas) => {
    const url = '/profile/validatephone/'
    return jsonAPI((api) => api.post(url, datas))
}

export const fetchDistributionSignupLocation = () => {
    return jsonAPI((api) => api.get('/bazasignup/location/'))
}

export const addDistributionSignupLocation = (data) => {
    return jsonAPI((api) => api.post('/bazasignup/location/', data))
}

// Mock APIs
export const fetchActivityLog = () => {
    const url = '/mock/activity-log'
    return jsonAPI((api) => api.get(url), { mock: true })
}
