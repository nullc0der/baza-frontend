import { DispatchAPI } from 'api/base'
import * as WalletAccountsAPI from 'api/wallet-accounts'

import get from 'lodash/get'

const createAction = (str) => `WALLET_ACCOUNTS_${str}`

const INITIAL_STATE = {
    isLoading: false,
    hasError: false,
    list: [],
    selectedWalletId: null,
    withdrawBazaInfo: {},
}

const FETCH_ACCOUNTS = createAction('FETCH_ACCOUNTS')
const fetchAccounts = () => (dispatch) => {
    dispatch({ type: FETCH_ACCOUNTS })
    return DispatchAPI(dispatch, WalletAccountsAPI.fetchWalletAccounts, {
        success: fetchAccountsSuccess,
        failure: fetchAccountsFailure,
    })
}

const FETCH_ACCOUNTS_SUCCESS = createAction('FETCH_ACCOUNTS_SUCCESS')
const fetchAccountsSuccess = (response) => {
    return {
        type: FETCH_ACCOUNTS_SUCCESS,
        list: get(response, 'data', []),
    }
}

const FETCH_ACCOUNTS_FAILURE = createAction('FETCH_ACCOUNTS_FAILURE')
const fetchAccountsFailure = (err) => {
    return {
        type: FETCH_ACCOUNTS_FAILURE,
        error: err,
    }
}

const SELECT_WALLET = createAction('SELECT_WALLET')
const selectWallet = (walletId) => ({
    type: SELECT_WALLET,
    walletId,
})

const FETCH_WITHDRAW_BAZA_INFO = createAction('FETCH_WITHDRAW_BAZA_INFO')
const fetchWithdrawBazaInfo = () => (dispatch) => {
    return DispatchAPI(dispatch, WalletAccountsAPI.fetchWithdrawBazaInfo, {
        success: fetchWithdrawBazaInfoSuccess,
        failure: fetchWithdrawBazaInfoFailure,
    })
}

const FETCH_WITHDRAW_BAZA_INFO_SUCCESS = createAction(
    'FETCH_WITHDRAW_BAZA_INFO_SUCCESS'
)
const fetchWithdrawBazaInfoSuccess = (response) => {
    return {
        type: FETCH_WITHDRAW_BAZA_INFO_SUCCESS,
        data: get(response, 'data', []),
    }
}

const FETCH_WITHDRAW_BAZA_INFO_FAILURE = createAction(
    'FETCH_WITHDRAW_BAZA_INFO_FAILURE'
)
const fetchWithdrawBazaInfoFailure = (err) => {
    return {
        type: FETCH_WITHDRAW_BAZA_INFO_FAILURE,
        error: err,
    }
}

const CLEAR_PROXC_BALANCE = createAction('CLEAR_PROXC_BALANCE')
const clearProxcBalance = () => ({
    type: CLEAR_PROXC_BALANCE,
})

export const actions = {
    fetchAccounts,
    selectWallet,
    fetchWithdrawBazaInfo,
    clearProxcBalance,
}

export default function WalletAccountsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ACCOUNTS:
        case FETCH_WITHDRAW_BAZA_INFO:
            return { ...state, isLoading: true, hasError: false }
        case FETCH_ACCOUNTS_SUCCESS:
            return { ...state, isLoading: false, list: [...action.list] }
        case FETCH_ACCOUNTS_FAILURE:
        case FETCH_WITHDRAW_BAZA_INFO_FAILURE:
            return { ...state, isLoading: false, hasError: action.error }
        case SELECT_WALLET:
            return { ...state, selectedWalletId: get(action, 'walletId', null) }
        case FETCH_WITHDRAW_BAZA_INFO_SUCCESS:
            return { ...state, isLoading: false, withdrawBazaInfo: action.data }
        case CLEAR_PROXC_BALANCE:
            return {
                ...state,
                withdrawBazaInfo: { ...state.withdrawBazaInfo, balance: 0 },
            }
        default:
            return state
    }
}
