import { jsonAPI } from './base'

export const fetchWalletAccounts = () => {
  const url = '/wallet-accounts'
  return jsonAPI(api => api.get(url))
}
