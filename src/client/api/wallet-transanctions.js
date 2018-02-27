import { jsonAPI } from './base'

export const fetchWalletTransanctions = () => {
  const url = '/wallet-transanctions'
  return jsonAPI(api => api.get(url))
}
