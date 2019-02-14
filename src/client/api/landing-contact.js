import { jsonAPI } from './base'


export const landingContact = datas => {
    const url = '/landingcontact/'
    return jsonAPI(api => api.post(url, datas))
}