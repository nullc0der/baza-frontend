import { jsonAPI } from 'api/base'

export const getUserWebWallets = () => {
    return jsonAPI(api => api.get('/userwebwallet/'))
}

export const createUserWebWallet = data => {
    return jsonAPI(api => api.post('/userwebwallet/', data))
}

export const getUserWebWallet = walletId => {
    return jsonAPI(api => api.get('/userwebwallet/details/', { id: walletId }))
}

export const sendUserWebWalletTx = data => {
    return jsonAPI(api => api.post('/userwebwallet/send/', data))
}
