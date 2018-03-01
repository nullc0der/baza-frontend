import { jsonAPI } from './base'

export const saveAccount = data => {
  const { id, accountData } = data

  const method = id ? 'put' : 'post'
  const url = '/distribution-signup' + (id ? `/${id}` : '')

  return jsonAPI(api => api[method](url, accountData))
}

export const fetchAccount = id => {
  const url = `/distribution-signup/${id}`
  return jsonAPI(api => api.get(url))
}
