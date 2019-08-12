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
