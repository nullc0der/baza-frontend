import { jsonAPI } from './base'

export const fetchUsers = () => {
    const url = '/members/'
    return jsonAPI(api => api.get(url))
}
