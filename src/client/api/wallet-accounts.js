import { jsonAPI } from './base'

export const fetchWalletAccounts = () => {
    const url = '/mock/walletaccounts/'
    return jsonAPI((api) => api.get(url))
}

export const fetchWithdrawBazaInfo = () => {
    return jsonAPI((api) => api.get('/proxc/withdrawbaza/'))
}

export const withdrawBaza = (password) => {
    return jsonAPI((api) => api.post('/proxc/withdrawbaza/', { password }))
}
