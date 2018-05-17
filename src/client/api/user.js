import { jsonAPI } from './base'

export const fetchProfile = () => {
    const url = '/profile/me/'
    return jsonAPI(api => api.get(url))
}
