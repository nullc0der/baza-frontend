import * as LandingAPI from 'api/landing'
import { DispatchAPI } from 'api/base'

const INITIAL_STATE = {
    landingStats: {},
    isLoading: false,
    hasError: null
}

const createAction = str => `LANDING_${str}`

const FETCH_LANDING_STATS = createAction('FETCH_LANDING_STATS')
const fetchLandingStats = () => dispatch => {
    dispatch({ type: FETCH_LANDING_STATS })

    return DispatchAPI(dispatch, LandingAPI.getLandingStats, {
        success: fetchLandingStatsSuccess,
        failure: fetchLandingStatsError
    })
}

const FETCH_LANDING_STATS_SUCCESS = createAction('FETCH_LANDING_STATS_SUCCESS')
const fetchLandingStatsSuccess = response => ({
    type: FETCH_LANDING_STATS_SUCCESS,
    data: response.data
})

const FETCH_LANDING_STATS_ERROR = createAction('FETCH_LANDING_STATS_ERROR')
const fetchLandingStatsError = err => ({
    type: FETCH_LANDING_STATS_ERROR,
    error: err
})

export const actions = {
    fetchLandingStats
}

export default function LandingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_LANDING_STATS:
            return { ...state, isLoading: true, hasError: null }
        case FETCH_LANDING_STATS_ERROR:
            return { ...state, hasError: action.error, isLoading: false }
        case FETCH_LANDING_STATS_SUCCESS:
            return {
                ...state,
                landingStats: action.data
            }
        default:
            return state
    }
}
