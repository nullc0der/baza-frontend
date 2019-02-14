import { jsonAPI } from './base'

export const fetchWalletTransanctions = walletID => {
    const url = '/proxc/transactions/'
    return jsonAPI(api => api.get(url, { wallet_id: walletID }))
}

export const sendPayment = data => {
    const url = '/proxc/transactions/'
    return jsonAPI(api => api.post(url, data))
}
