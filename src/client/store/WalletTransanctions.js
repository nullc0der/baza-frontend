import { DispatchAPI } from 'api/base'
import * as WalletTransanctionsAPI from 'api/wallet-transanctions'

import get from 'lodash/get'

const createAction = str => `WALLET_TRANSANCTIONS_${str}`

const INITIAL_STATE = {
    isLoading: false,
    hasError: false,
    list: [],
    isPaymentSending: false,
    hasPaymentSendError: false
}

const FETCH_TRANSANCTIONS = createAction('FETCH_TRANSANCTIONS')
const fetchTransanctions = walletID => dispatch => {
    dispatch({ type: FETCH_TRANSANCTIONS })
    return DispatchAPI(
        dispatch,
        WalletTransanctionsAPI.fetchWalletTransanctions(walletID),
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
        list: get(response, 'data', [])
    }
}

const FETCH_TRANSANCTIONS_FAILURE = createAction('FETCH_TRANSANCTIONS_FAILURE')
const fetchTransanctionsFailure = err => {
    return {
        type: FETCH_TRANSANCTIONS_FAILURE,
        error: err
    }
}

const CLEAR_TRANSANCTIONS = createAction('CLEAR_TRANSANCTIONS')
const clearTransanctions = () => ({
    type: CLEAR_TRANSANCTIONS
})

const SEND_PAYMENT = createAction('SEND_PAYMENT')
const sendPayment = data => dispatch => {
    dispatch({ type: SEND_PAYMENT })
    return DispatchAPI(dispatch, WalletTransanctionsAPI.sendPayment(data), {
        success: sendPaymentSuccess,
        failure: sendPaymentFailure
    })
}

const SEND_PAYMENT_SUCCESS = createAction('SEND_PAYMENT_SUCCESS')
const sendPaymentSuccess = response => ({
    type: SEND_PAYMENT_SUCCESS,
    transanction: get(response, 'data', {})
})

const SEND_PAYMENT_FAILURE = createAction('SEND_PAYMENT_FAILURE')
const sendPaymentFailure = err => ({
    type: SEND_PAYMENT_FAILURE,
    error: err
})

const RECEIVED_TXDATA_ON_WEBSOCKET = createAction(
    'RECEIVED_TXDATA_ON_WEBSOCKET'
)
const receivedTxdataOnWebsocket = transanction => ({
    type: RECEIVED_TXDATA_ON_WEBSOCKET,
    transanction
})

export const actions = {
    fetchTransanctions,
    clearTransanctions,
    sendPayment,
    receivedTxdataOnWebsocket
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
        case SEND_PAYMENT:
            return {
                ...state,
                isPaymentSending: true,
                hasPaymentSendError: false
            }
        case SEND_PAYMENT_FAILURE:
            return {
                ...state,
                isPaymentSending: false,
                hasPaymentSendError: action.error
            }
        case SEND_PAYMENT_SUCCESS:
            return {
                ...state,
                isPaymentSending: false,
                hasPaymentSendError: false,
                list: [...state.list, action.transanction]
            }
        case RECEIVED_TXDATA_ON_WEBSOCKET:
            return {
                ...state,
                list: [...state.list, action.transanction]
            }
        default:
            return state
    }
}
