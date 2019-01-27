import { jsonAPI } from 'api/base'

export const initiatePayment =(url, data) => {
    return jsonAPI(api => api.post(url, data))
}
