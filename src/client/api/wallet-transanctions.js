import { jsonAPI } from './base'

export const fetchWalletTransanctions = () => {
    const url = '/mock/wallettransactions/'
    return jsonAPI(api => api.get(url))
}
