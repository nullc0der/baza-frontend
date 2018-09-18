import { formAPI } from './base'

export const issueCreator = data => {
    const url = '/postissue/'
    return formAPI(api => api.post(url, data))
}
