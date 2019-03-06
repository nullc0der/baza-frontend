import { jsonAPI } from 'api/base'

const LANDING_BASE = '/landing'

export const getLandingStats = () => {
    const url = `${LANDING_BASE}/stats/`
    return jsonAPI(api => api.get(url))
}
