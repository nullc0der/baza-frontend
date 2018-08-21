import { jsonAPI } from './base' //eslint-disable-line no-unused-vars

export const saveAccount = data => {
    // mock api
    return Promise.resolve({ data })

    // real api
    // const { id, accountData } = data

    // const method = id ? 'put' : 'post'
    // const url = '/distribution-signup' + (id ? `/${id}` : '')

    // return jsonAPI(api => api[method](url, accountData))
}

export const fetchAccount = id => {
    // mock api
    return Promise.resolve({ data: id })

    // real api
    // const url = `/distribution-signup/${id}`
    // return jsonAPI(api => api.get(url))
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
    return jsonAPI(api => api.post('/bazasignup/userinfotab/', {
        'first_name': firstName,
        'last_name': lastName,
        'referral_code': referralCode,
        'country': country,
        'city': city,
        'state': state,
        'house_number': houseNumber,
        'street_name': streetName,
        'zip_code': zipCode,
        'birthdate': birthDate
    }))
}