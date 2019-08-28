import { jsonAPI } from './base'

export const fetchSignups = () => {
    return jsonAPI(api => api.get('/bazasignup/signups/'))
}

export const fetchSignupUserProfile = id => {
    const url = `/bazasignup/signup/${id}/userprofile/`
    return jsonAPI(api => api.get(url))
}

export const fetchSignup = id => {
    const url = `/bazasignup/signup/${id}/`
    return jsonAPI(api => api.get(url))
}

export const fetchComments = signupID => {
    const url = `/bazasignup/signup/${signupID}/comments/`
    return jsonAPI(api => api.get(url))
}

export const postComment = (signupID, data) => {
    const url = `/bazasignup/signup/${signupID}/comments/`
    return jsonAPI(api => api.post(url, data))
}

export const updateComment = (signupID, data) => {
    const url = `/bazasignup/signup/${signupID}/comments/`
    return jsonAPI(api => api.patch(url, data))
}

export const deleteComment = (signupID, commentID) => {
    const url = `/bazasignup/signup/${signupID}/comments/?id=${commentID}`
    return jsonAPI(api => api.delete(url))
}

export const markFormViolation = (signupID, data) => {
    const url = `/bazasignup/signup/${signupID}/reset/`
    return jsonAPI(api => api.post(url, data))
}

export const getStaffBarData = () => {
    const url = '/bazasignup/signup/staffbar/'
    return jsonAPI(api => api.get(url))
}

export const loginOutStaff = request_type => {
    const url = '/bazasignup/signup/loginoutstaff/'
    return jsonAPI(api => api.post(url, { request_type }))
}

export const changeSignupStatus = (id, status) => {
    const url = `/bazasignup/signup/${id}/`
    return jsonAPI(api => api.post(url, { status }))
}
