import get from 'lodash/get'

import { DispatchAPI } from 'api/base'
import * as faqAPIs from 'api/group-faq'

const INITIAL_STATE = {
    landingFaqs: [],
    isLoading: false,
    hasError: null
}

const createAction = str => `GROUP_FAQS_${str}`

const FETCH_LANDING_FAQS = createAction('FETCH_LANDING_FAQS')
const fetchLandingFaqs = () => dispatch => {
    return DispatchAPI(dispatch, faqAPIs.fetchLandingFaq, {
        success: fetchLandingFaqsSuccess,
        failure: fetchLandingFaqsFailure
    })
}

const FETCH_LANDING_FAQS_SUCCESS = createAction('FETCH_LANDING_FAQS_SUCCESS')
const fetchLandingFaqsSuccess = res => ({
    type: FETCH_LANDING_FAQS_SUCCESS,
    faqs: get(res, 'data', [])
})

const FETCH_LANDING_FAQS_FAILURE = createAction('FETCH_LANDING_FAQS_FAILURE')
const fetchLandingFaqsFailure = err => ({
    type: FETCH_LANDING_FAQS_FAILURE,
    error: err
})

export const actions = {
    fetchLandingFaqs
}

export default function GroupFaqsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_LANDING_FAQS:
            return {
                ...state,
                isLoading: true,
                hasError: null
            }
        case FETCH_LANDING_FAQS_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: action.error
            }
        case FETCH_LANDING_FAQS_SUCCESS:
            return {
                ...state,
                landingFaqs: action.faqs
            }
        default:
            return state
    }
}
