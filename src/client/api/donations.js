import { jsonAPI } from './base'

export const fetchDonations = () => {
    const url = '/mock/donations/'
    return jsonAPI(api => api.get(url), { mock: true })
}
