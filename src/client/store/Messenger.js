import get from 'lodash/get'
import includes from 'lodash/includes'

import { DispatchAPI } from 'api/base'
import * as MessengerAPI from 'api/messenger'

const INITIAL_STATE = {
    rooms: [],
    minichats: [],
    chats: {},
    uploadProgress: {},
    selected: 0,
    searchText: '',
    websocketTypingStatus: 0,
    isLoading: false,
    hasError: null
}

const createAction = str => `MESSENGER_${str}`

const calculateUnread = unreadCount => {
    if (unreadCount < 0) {
        return 0
    }
    return unreadCount
}

const ROOM_SELECTED = createAction('ROOM_SELECTED')
const roomSelected = selected => ({
    type: ROOM_SELECTED,
    selected
})

const SEARCH_TEXT_CHANGED = createAction('SEARCH_TEXT_CHANGED')
const searchTextChanged = searchText => ({
    type: SEARCH_TEXT_CHANGED,
    searchText
})

const READ_STATUS_UPDATED = createAction('READ_STATUS_UPDATED')
const readStatusUpdated = (roomId, unreadCount = 0) => ({
    type: READ_STATUS_UPDATED,
    roomId,
    unreadCount: calculateUnread(unreadCount)
})

const UPDATE_TYPING_STATUS = createAction('UPDATE_TYPING_STATUS')
const updateTypingStatus = chatroom => ({
    type: UPDATE_TYPING_STATUS,
    chatroom
})

const OPEN_MINI_CHAT = createAction('OPEN_MINI_CHAT')
const openMiniChat = roomId => ({
    type: OPEN_MINI_CHAT,
    roomId
})

const CLOSE_MINI_CHAT = createAction('CLOSE_MINI_CHAT')
const closeMiniChat = roomId => ({
    type: CLOSE_MINI_CHAT,
    roomId
})

const LOAD_ROOMS = createAction('LOAD_ROOMS')
const loadRooms = () => dispatch => {
    return DispatchAPI(dispatch, MessengerAPI.getChatRooms, {
        success: loadRoomsSuccess,
        failure: loadRoomsError
    })
}

const LOAD_ROOMS_ERROR = createAction('LOAD_ROOMS_ERROR')
const loadRoomsError = err => ({
    type: LOAD_ROOMS_ERROR,
    error: err
})

const LOAD_ROOMS_SUCESS = createAction('LOAD_ROOMS_SUCESS')
const loadRoomsSuccess = res => ({
    type: LOAD_ROOMS_SUCESS,
    rooms: get(res, 'data', {})
})

const DELETE_CHAT_ROOM = createAction('DELETE_CHAT_ROOM')
const deleteChatRoom = roomId => dispatch => {
    return DispatchAPI(dispatch, MessengerAPI.deleteChatRoom(roomId), {
        success: deleteChatRoomSuccess,
        failure: deleteChatRoomError
    })
}

const DELETE_CHAT_ROOM_SUCCESS = createAction('DELETE_CHAT_ROOM_SUCCESS')
const deleteChatRoomSuccess = res => ({
    type: DELETE_CHAT_ROOM_SUCCESS,
    roomId: Number(get(res.data, 'id', -1))
})

const DELETE_CHAT_ROOM_ERROR = createAction('DELETE_CHAT_ROOM_ERROR')
const deleteChatRoomError = err => ({
    type: DELETE_CHAT_ROOM_ERROR,
    error: err
})

const CHATS_FETCH_DATA = createAction('CHATS_FETCH_DATA')
const chatsFetchData = roomId => dispatch => {
    return DispatchAPI(dispatch, MessengerAPI.getMessages(roomId), {
        success: chatsFetchDataSuccess,
        error: chatsFetchDataError
    })
}

const CHATS_FETCH_DATA_SUCCESS = createAction('CHATS_FETCH_DATA_SUCCESS')
const chatsFetchDataSuccess = res => ({
    type: CHATS_FETCH_DATA_SUCCESS,
    roomId: get(res.data, 'room_id', -1),
    chats: get(res, 'data', {})
})

const CHATS_FETCH_DATA_ERROR = createAction('CHATS_FETCH_DATA_ERROR')
const chatsFetchDataError = err => ({
    type: CHATS_FETCH_DATA_ERROR,
    error: err
})

const CHAT_SEND = createAction('CHAT_SEND')
const chatSend = (roomId, datas, containsFile) => dispatch => {
    return DispatchAPI(
        dispatch,
        MessengerAPI.sendMessage(roomId, datas, containsFile),
        {
            success: chatSendSuccess,
            error: chatSendError
        }
    )
}

const CHAT_SEND_SUCCESS = createAction('CHAT_SEND_SUCCESS')
const chatSendSuccess = res => ({
    type: CHAT_SEND_SUCCESS,
    roomId: get(res.data, 'room_id', -1),
    chat: get(res, 'data', {})
})

const CHAT_SEND_ERROR = createAction('CHAT_SEND_ERROR')
const chatSendError = err => ({
    type: CHAT_SEND_ERROR,
    error: err
})

const RECEIVED_CHAT_ON_WEBSOCKET = createAction('RECEIVED_CHAT_ON_WEBSOCKET')
const receivedChatOnWebsocket = (roomId, chat) => ({
    type: RECEIVED_CHAT_ON_WEBSOCKET,
    roomId,
    chat
})

const CLEAR_CHAT = createAction('CLEAR_CHAT')
const clearChat = roomId => ({
    type: CLEAR_CHAT,
    roomId
})

const DELETE_CHATS = createAction('DELETE_CHATS')
const deleteChats = datas => dispatch => {
    return DispatchAPI(dispatch, MessengerAPI.deleteMessages(datas), {
        success: deleteChatsSuccess,
        failure: deleteChatsError
    })
}

const DELETE_CHATS_ERROR = createAction('DELETE_CHATS_ERROR')
const deleteChatsError = err => ({
    type: DELETE_CHATS_ERROR,
    error: err
})

const DELETE_CHATS_SUCCESS = createAction('DELETE_CHATS_SUCCESS')
const deleteChatsSuccess = res => ({
    type: DELETE_CHATS_SUCCESS,
    roomId: get(res.data, 'room_id', -1),
    chatIds: get(res.data, 'message_ids', [])
})

const FILE_UPLOAD_PROGRESS = createAction('FILE_UPLOAD_PROGRESS')
const fileUploadProgress = (roomId, progress) => ({
    type: FILE_UPLOAD_PROGRESS,
    roomId,
    progress
})

const UPDATE_CHAT_READ_STATUS = createAction('UPDATE_CHAT_READ_STATUS')
const updateChatReadStatus = (roomId, chatIds) => ({
    type: UPDATE_CHAT_READ_STATUS,
    roomId,
    chatIds
})

export const actions = {
    updateTypingStatus,
    readStatusUpdated,
    searchTextChanged,
    roomSelected,
    loadRooms,
    deleteChatRoom,
    openMiniChat,
    closeMiniChat,
    chatsFetchData,
    chatSend,
    receivedChatOnWebsocket,
    clearChat,
    deleteChats,
    fileUploadProgress,
    updateChatReadStatus
}

export default function ChatRoomsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_ROOMS:
        case DELETE_CHAT_ROOM:
        case CHATS_FETCH_DATA:
        case CHAT_SEND:
        case DELETE_CHATS:
            return { ...state, isLoading: true, hasError: null }
        case LOAD_ROOMS_ERROR:
        case DELETE_CHAT_ROOM_ERROR:
        case CHATS_FETCH_DATA_ERROR:
        case CHAT_SEND_ERROR:
        case DELETE_CHATS_ERROR:
            return { ...state, hasError: action.error, isLoading: false }
        case LOAD_ROOMS_SUCESS:
            return { ...state, rooms: action.rooms }
        case ROOM_SELECTED:
            return { ...state, selected: action.selected }
        case SEARCH_TEXT_CHANGED:
            return { ...state, searchText: action.searchText }
        case READ_STATUS_UPDATED:
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    return room.id === action.roomId
                        ? { ...room, unread_count: action.unreadCount }
                        : room
                })
            }
        case DELETE_CHAT_ROOM_SUCCESS:
            return {
                ...state,
                rooms: state.rooms.filter(room => room.id !== action.roomId)
            }
        case UPDATE_TYPING_STATUS:
            return { ...state, websocketTypingStatus: action.chatroom }
        case OPEN_MINI_CHAT:
            let roomIdExist = state.minichats.indexOf(action.roomId) > -1
            let minichats = state.minichats.slice()
            if (!roomIdExist) {
                minichats.push(action.roomId)
            }
            return { ...state, minichats: minichats }
        case CLOSE_MINI_CHAT:
            return {
                ...state,
                minichats: state.minichats.filter(x => x !== action.roomId)
            }
        case CHATS_FETCH_DATA_SUCCESS:
            return {
                ...state,
                chats: { ...state.chats, [action.roomId]: action.chats }
            }
        case CHAT_SEND_SUCCESS:
        case RECEIVED_CHAT_ON_WEBSOCKET:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.roomId]: [
                        ...state.chats[action.roomId],
                        action.chat
                    ]
                }
            }
        case CLEAR_CHAT:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.roomId]: []
                }
            }
        case DELETE_CHATS_SUCCESS:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.roomId]: state.chats[action.roomId].filter(
                        chat => !includes(action.chatIds, chat.id)
                    )
                }
            }
        case FILE_UPLOAD_PROGRESS:
            return {
                ...state,
                uploadProgress: {
                    roomId: action.roomId,
                    progress: action.progress
                }
            }
        case UPDATE_CHAT_READ_STATUS:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.roomId]: state.chats[action.roomId].map(chat => {
                        return includes(action.chatIds, chat.id)
                            ? { ...chat, read: true }
                            : chat
                    })
                }
            }
        default:
            return state
    }
}
