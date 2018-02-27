import { DispatchAPI } from 'api/base'
import * as WalletTransanctionsAPI from 'api/wallet-transanctions'

import get from 'lodash/get'

const createAction = str => `WALLET_TRANSANCTIONS_${str}`

const INITIAL_STATE = {
  isLoading: false,
  hasError: false,
  list: []
}

const FETCH_TRANSANCTIONS = createAction('FETCH_TRANSANCTIONS')
const fetchTransanctions = () => dispatch => {
  dispatch({ type: FETCH_TRANSANCTIONS })
  return DispatchAPI(
    dispatch,
    WalletTransanctionsAPI.fetchWalletTransanctions,
    {
      success: fetchTransanctionsSuccess,
      failure: fetchTransanctionsFailure
    }
  )
}

const FETCH_TRANSANCTIONS_SUCCESS = createAction('FETCH_TRANSANCTIONS_SUCCESS')
const fetchTransanctionsSuccess = response => {
  return {
    type: FETCH_TRANSANCTIONS_SUCCESS,
    list: get(response, 'data.results', [])
  }
}

const FETCH_TRANSANCTIONS_FAILURE = createAction('FETCH_TRANSANCTIONS_FAILURE')
const fetchTransanctionsFailure = err => {
  return {
    type: FETCH_TRANSANCTIONS_FAILURE,
    error: err.message
  }
}

const CLEAR_TRANSANCTIONS = createAction('CLEAR_TRANSANCTIONS')
const clearTransanctions = () => ({
  type: CLEAR_TRANSANCTIONS
})

export const actions = {
  fetchTransanctions,
  clearTransanctions
}

export default function WalletAccountsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRANSANCTIONS:
      return { ...state, isLoading: true, hasError: false }
    case FETCH_TRANSANCTIONS_SUCCESS:
      return { ...state, isLoading: false, list: [...action.list] }
    case FETCH_TRANSANCTIONS_FAILURE:
      return { ...state, isLoading: false, hasError: action.error }
    case CLEAR_TRANSANCTIONS:
      return { ...state, list: [] }
    default:
      return state
  }
}
