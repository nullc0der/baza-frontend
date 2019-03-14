import { jsonAPI } from './base'

export const fetchDonations = () => {
    const url = '/mock/donations/'
    return jsonAPI(api => api.get(url), { mock: true })
}

export const fetchRecentDonations = () => {
    const url = '/donate/getlatest/'
    return jsonAPI(api => api.get(url))
}
