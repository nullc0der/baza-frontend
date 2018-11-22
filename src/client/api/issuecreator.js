import { formAPI, jsonAPI } from './base'

const ISSUE_CREATOR_BASE = '/issue'

export const createIssue = data => {
    const url = `${ISSUE_CREATOR_BASE}/create/`
    return formAPI(api => api.post(url, data))
}

export const getIssueTypes = () => {
    const url = `${ISSUE_CREATOR_BASE}/gettypes/`
    return jsonAPI(api => api.get(url))
}