import { jsonAPI, formAPI } from './base' //eslint-disable-line no-unused-vars

export const saveAccount = (id, data) => {
    const url = `/bazasignup/signup/${id}/`
    return jsonAPI(api => api.post(url, data))
}

export const fetchAccount = id => {
    const url = `/bazasignup/signup/${id}/`
    return jsonAPI(api => api.get(url))
}

export const deletePhoto = photoId => {
    // mock api
    return Promise.resolve({
        data: {
            id: photoId
        }
    })

    // real api
    // const url = `/distribution-signup/photo/${photoId}`
    // return jsonAPI(api => api.delete(url))
}

export const deleteDocument = documentId => {
    // mock api
    return Promise.resolve({
        data: {
            id: documentId
        }
    })

    // real api
    // const url = `/distribution-signup/document/${photoId}`
    // return jsonAPI(api => api.delete(url))
}

export const checkCompletedSteps = () => {
    return jsonAPI(api => api.get('/bazasignup/checksteps/'))
}

export const submitNameAddress = (
    firstName,
    lastName,
    referralCode,
    country,
    city,
    state,
    houseNumber,
    streetName,
    zipCode,
    birthDate
) => {
    return jsonAPI(api =>
        api.post('/bazasignup/userinfotab/', {
            first_name: firstName,
            last_name: lastName,
            referral_code: referralCode,
            country: country,
            city: city,
            state: state,
            house_number: houseNumber,
            street_name: streetName,
            zip_code: zipCode,
            birthdate: birthDate
        })
    )
}

export const skipEmail = () => {
    return jsonAPI(api => api.post('/bazasignup/skipemail/'))
}

export const sendVerificationCode = email => {
    return jsonAPI(api =>
        api.post('/bazasignup/sendverificationcode/', {
            email: email
        })
    )
}

export const validateEmailCode = code => {
    return jsonAPI(api =>
        api.post('/bazasignup/validateemailcode/', {
            code: code
        })
    )
}

export const sendVerificationCodeAgain = () => {
    return jsonAPI(api => api.post('/bazasignup/sendverificationcodeagain/'))
}

export const skipPhone = () => {
    return jsonAPI(api => api.post('/bazasignup/skipphone/'))
}

export const sendPhoneVerificationCode = phone => {
    return jsonAPI(api =>
        api.post('/bazasignup/sendphoneverificationcode/', {
            phone
        })
    )
}

export const validatePhoneCode = code => {
    return jsonAPI(api =>
        api.post('/bazasignup/validatesmscode/', {
            code
        })
    )
}

export const sendPhoneVerificationCodeAgain = () => {
    return jsonAPI(api =>
        api.post('/bazasignup/sendphoneverificationcodeagain/')
    )
}

export const uploadSignupImage = image => {
    const data = new FormData()
    data.append('image', image)
    return formAPI(api => api.post('/bazasignup/uploadsignupimage/', data))
}

export const fetchSignupsList = () => {
    return jsonAPI(api => api.get('/bazasignup/signups/'))
}

export const getTotalRecipients = () => {
    const url = '/bazasignup/recipients/'
    return jsonAPI(api => api.get(url))
}
