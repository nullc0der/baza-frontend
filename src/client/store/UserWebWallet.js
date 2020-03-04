import * as userWebWalletApi from 'api/userwebwallet'
import { DispatchAPI } from 'api/base'

const INITIAL_STATE = {
    webWallets: [],
    selectedWebWallet: {},
    selectedWebWalletDetails: {},
    isLoading: false,
    hasError: false
}

const createAction = str => `USER_WEB_WALLET_${str}`

const GET_WEB_WALLETS = createAction('GET_WEB_WALLETS')
const getWebWallets = () => dispatch =>
    DispatchAPI(dispatch, userWebWalletApi.getUserWebWallets, {
        success: getWebWalletsSuccess,
        failure: getWebWalletsFailure
    })

const GET_WEB_WALLETS_SUCCESS = createAction('GET_WEB_WALLETS_SUCCESS')
const getWebWalletsSuccess = response => ({
    type: GET_WEB_WALLETS_SUCCESS,
    data: response.data
})

const GET_WEB_WALLETS_FAILURE = createAction('GET_WEB_WALLETS_FAILURE')
const getWebWalletsFailure = err => ({
    type: GET_WEB_WALLETS_FAILURE,
    err
})

const GET_WEB_WALLETS_DETAILS = createAction('GET_WEB_WALLETS_DETAILS')
const getWebWalletsDetails = walletId => dispatch =>
    DispatchAPI(dispatch, userWebWalletApi.getUserWebWallet(walletId), {
        success: getWebWalletsDetailsSuccess,
        failure: getWebWalletsDetailsFailure
    })

const GET_WEB_WALLETS_DETAILS_SUCCESS = createAction(
    'GET_WEB_WALLETS_DETAILS_SUCCESS'
)
const getWebWalletsDetailsSuccess = response => ({
    type: GET_WEB_WALLETS_DETAILS_SUCCESS,
    data: response.data
})

const GET_WEB_WALLETS_DETAILS_FAILURE = createAction(
    'GET_WEB_WALLETS_DETAILS_FAILURE'
)
const getWebWalletsDetailsFailure = err => ({
    type: GET_WEB_WALLETS_DETAILS_FAILURE,
    err
})

const SELECT_WEB_WALLET = createAction('SELECT_WEB_WALLET')
const selectWebWallet = wallet => ({
    type: SELECT_WEB_WALLET,
    wallet
})

export const actions = {
    getWebWallets,
    getWebWalletsDetails,
    selectWebWallet
}

export default function UserWebWalletReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_WEB_WALLETS:
        case GET_WEB_WALLETS_DETAILS:
            return { ...state, isLoading: true, hasError: false }
        case GET_WEB_WALLETS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                webWallets: action.data
            }
        case GET_WEB_WALLETS_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedWebWalletDetails: action.data
            }
        case SELECT_WEB_WALLET:
            return {
                ...state,
                isLoading: false,
                selectedWebWallet: action.wallet
            }
        case GET_WEB_WALLETS_FAILURE:
        case GET_WEB_WALLETS_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: action.err
            }
        default:
            return state
    }
}
