import get from 'lodash/get'
import { DispatchAPI } from 'api/base'
import * as DonationsAPI from '../api/donations'

const createAction = str => `DONATIONS_${str}`

const INITIAL_STATE = {
    list: [
        { code: '099', iso: 'ATA', totalReceipients: 200, totalDonors: 345 }
    ],
    isLoading: false,
    hasError: false
}

const FETCH_DONATIONS = createAction('FETCH_DONATIONS')
const fetchDonations = () => dispatch => {
    dispatch({ type: FETCH_DONATIONS })
    return DispatchAPI(dispatch, DonationsAPI.fetchDonations, {
        success: fetchDonationsSuccess,
        failure: fetchDonationsFailure
    })
}

const FETCH_DONATIONS_SUCCESS = createAction('FETCH_DONATIONS_SUCCESS')
const fetchDonationsSuccess = response => ({
    type: FETCH_DONATIONS_SUCCESS,
    list: get(response, 'data', [])
})

const FETCH_DONATIONS_FAILURE = createAction('FETCH_DONATIONS_FAILURE')
const fetchDonationsFailure = err => ({
    type: FETCH_DONATIONS_FAILURE,
    error: err.message
})

export const actions = {
    fetchDonations
}

export default function DonationsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_DONATIONS:
            return { ...state, isLoading: true, hasError: false }
        case FETCH_DONATIONS_SUCCESS:
            return { ...state, isLoading: false, list: [...action.list] }
        case FETCH_DONATIONS_FAILURE:
            return { ...state, isLoading: false, error: action.error }
        default:
            return state
    }
}
