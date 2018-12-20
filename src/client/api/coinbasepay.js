import { jsonAPI } from 'api/base'

export const initiatePayment = amount => {
    const url = '/coinbase/initiate/1/'
    return jsonAPI(api => api.post(url, { amount }))
}
