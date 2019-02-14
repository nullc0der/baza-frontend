import { jsonAPI } from 'api/base'

export const getTotalCoinPurchased = () => {
    const url = '/purchasecoin/totalpurchased/'
    return jsonAPI(api => api.get(url))
}
