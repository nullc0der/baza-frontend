import { jsonAPI } from './base'

export const fetchNotifications = () => {
    const url = '/notifications/'
    return jsonAPI(api => api.get(url))
}

export const setReadStatus = idList => {
    const url = '/notifications/setread/'
    return jsonAPI(api => api.post(url, { idlist: idList }))
}
