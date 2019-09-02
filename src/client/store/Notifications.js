import get from 'lodash/get'
import includes from 'lodash/includes'

import { DispatchAPI } from 'api/base'
import * as NotificationsAPI from 'api/notifications'

const INITIAL_STATE = {
    notifications: [],
    isLoading: false,
    hasError: null
}

const createAction = str => `NOTIFICATION_${str}`

const FETCH_NOTIFICATIONS = createAction('FETCH_NOTIFICATIONS')
const fetchNotifications = () => dispatch => {
    return DispatchAPI(dispatch, NotificationsAPI.fetchNotifications(), {
        success: fetchNotificationsSuccess,
        failure: fetchNotificationsError
    })
}

const FETCH_NOTIFICATIONS_SUCCESS = createAction('FETCH_NOTIFICATIONS_SUCCESS')
const fetchNotificationsSuccess = res => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    notifications: get(res, 'data', {})
})

const FETCH_NOTIFICATIONS_ERROR = createAction('FETCH_NOTIFICATIONS_ERROR')
const fetchNotificationsError = err => ({
    type: FETCH_NOTIFICATIONS_ERROR,
    error: err
})

const SET_READ_STATUS = createAction('SET_READ_STATUS')
const setReadStatus = idList => dispatch => {
    return DispatchAPI(dispatch, NotificationsAPI.setReadStatus(idList), {
        success: setReadStatusSuccess,
        failure: setReadStatusError
    })
}

const SET_READ_STATUS_SUCCESS = createAction('SET_READ_STATUS_SUCCESS')
const setReadStatusSuccess = res => ({
    type: SET_READ_STATUS_SUCCESS,
    notificationsIDs: get(res, 'data', [])
})

const SET_READ_STATUS_ERROR = createAction('SET_READ_STATUS_ERROR')
const setReadStatusError = err => ({
    type: SET_READ_STATUS_ERROR,
    error: err
})

const RECEIVED_NOTIFICATION_ON_WEBSOCKET = createAction(
    'RECEIVED_NOTIFICATION_ON_WEBSOCKET'
)
const receivedNotificationOnWebsocket = notification => ({
    type: RECEIVED_NOTIFICATION_ON_WEBSOCKET,
    notification: notification
})

const REMOVE_NOTIFICATION = createAction('REMOVE_NOTIFICATION')
const removeNotification = notificationID => ({
    type: REMOVE_NOTIFICATION,
    notificationID
})

export const actions = {
    fetchNotifications,
    setReadStatus,
    receivedNotificationOnWebsocket,
    removeNotification
}

export default function NotificationsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
        case SET_READ_STATUS:
            return { ...state, isLoading: true, hasError: null }
        case FETCH_NOTIFICATIONS_ERROR:
        case SET_READ_STATUS_ERROR:
            return { ...state, hasError: action.error, isLoading: false }
        case FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.notifications
            }
        case SET_READ_STATUS_SUCCESS:
            return {
                ...state,
                notifications: state.notifications.filter(
                    x => !includes(action.notificationsIDs, x.id)
                )
            }
        case RECEIVED_NOTIFICATION_ON_WEBSOCKET:
            return {
                ...state,
                notifications: [...state.notifications, action.notification]
            }
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    x => x.id !== action.notificationID
                )
            }
        default:
            return state
    }
}
