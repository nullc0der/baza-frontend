import { DispatchAPI } from 'api/base'
import * as WalletAccountsAPI from 'api/wallet-accounts'

import get from 'lodash/get'

const createAction = str => `WALLET_ACCOUNTS_${str}`

const INITIAL_STATE = {
  isLoading: false,
  hasError: false,
  list: [],
  selectedWalletId: null
}

const FETCH_ACCOUNTS = createAction('FETCH_ACCOUNTS')
const fetchAccounts = () => dispatch => {
  dispatch({ type: FETCH_ACCOUNTS })
  return DispatchAPI(dispatch, WalletAccountsAPI.fetchWalletAccounts, {
    success: fetchAccountsSuccess,
    failure: fetchAccountsFailure
  })
}

const FETCH_ACCOUNTS_SUCCESS = createAction('FETCH_ACCOUNTS_SUCCESS')
const fetchAccountsSuccess = response => {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    list: get(response, 'data.results', [])
  }
}

const FETCH_ACCOUNTS_FAILURE = createAction('FETCH_ACCOUNTS_FAILURE')
const fetchAccountsFailure = err => {
  return {
    type: FETCH_ACCOUNTS_FAILURE,
    error: err.message
  }
}

const SELECT_WALLET = createAction('SELECT_WALLET')
const selectWallet = walletId => ({
  type: SELECT_WALLET,
  walletId
})

export const actions = {
  fetchAccounts,
  selectWallet
}

export default function WalletAccountsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return { ...state, isLoading: true, hasError: false }
    case FETCH_ACCOUNTS_SUCCESS:
      return { ...state, isLoading: false, list: [...action.list] }
    case FETCH_ACCOUNTS_FAILURE:
      return { ...state, isLoading: false, hasError: action.error }
    case SELECT_WALLET:
      return { ...state, selectedWalletId: get(action, 'walletId', null) }
    default:
      return state
  }
}
