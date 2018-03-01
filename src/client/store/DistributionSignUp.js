import { DispatchAPI } from 'api/base'
import * as DistributionSignUpAPI from 'api/distribution-signup'

const createAction = str => `DISTRIBUTION_SIGNUP_${str}`

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  hasError: false,
  _fetchedData: null // Store a copy of fetched data to discard changes
}

const SAVE_ACCOUNT = createAction('SAVE_ACCOUNT')
const saveAccount = data => dispatch => {
  dispatch({ type: SAVE_ACCOUNT })
  return DispatchAPI(dispatch, DistributionSignUpAPI.saveAccount(data), {
    success: saveAccountSuccess,
    failure: saveAccountFailure
  })
}

const SAVE_ACCOUNT_SUCCESS = createAction('SAVE_ACCOUNT_SUCCESS')
const saveAccountSuccess = response => ({
  type: SAVE_ACCOUNT_SUCCESS,
  data: response.data
})
const SAVE_ACCOUNT_FAILURE = createAction('SAVE_ACCOUNT_FAILURE')
const saveAccountFailure = err => ({
  type: SAVE_ACCOUNT_FAILURE,
  error: err.message
})

const FETCH_ACCOUNT = createAction('FETCH_ACCOUNT')
const fetchAccount = data => dispatch => {
  dispatch({ type: FETCH_ACCOUNT })
  return DispatchAPI(dispatch, DistributionSignUpAPI.fetchAccount(data), {
    success: fetchAccountSuccess,
    failure: fetchAccountFailure
  })
}
const FETCH_ACCOUNT_SUCCESS = createAction('FETCH_ACCOUNT_SUCCESS')
const fetchAccountSuccess = response => ({
  type: FETCH_ACCOUNT_SUCCESS,
  data: response.data
})
const FETCH_ACCOUNT_FAILURE = createAction('FETCH_ACCOUNT_FAILURE')
const fetchAccountFailure = err => ({
  type: FETCH_ACCOUNT_FAILURE,
  error: err.message
})

export const actions = {
  saveAccount,
  fetchAccount
}

export default function DistributionSignUpReducer(
  state = INITIAL_STATE,
  action
) {
  switch (action.type) {
    case FETCH_ACCOUNT:
    case SAVE_ACCOUNT:
      return { ...state, isLoading: true, hasError: false }

    case FETCH_ACCOUNT_SUCCESS:
    case SAVE_ACCOUNT_SUCCESS:
      return { ...state, isLoading: false, data: { ...action.data } }

    case FETCH_ACCOUNT_FAILURE:
    case SAVE_ACCOUNT_FAILURE:
      return { ...state, isLoading: false, hasError: action.error }

    default:
      return state
  }
}
