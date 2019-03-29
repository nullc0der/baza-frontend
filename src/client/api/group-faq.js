import { jsonAPI } from 'api/base'

export const fetchLandingFaq = () => {
    const url = '/faq/download/'
    return jsonAPI(api => api.get(url))
}
