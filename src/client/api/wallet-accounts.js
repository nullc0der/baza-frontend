import { jsonAPI } from './base'

export const fetchWalletAccounts = () => {
    const url = '/mock/walletaccounts/'
    return jsonAPI(api => api.get(url))
}
