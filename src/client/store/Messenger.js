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
    sendTypingStatus: {},
    isLoading: false,
    hasError: []
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

const ADD_CHAT_ROOM = createAction('ADD_CHAT_ROOM')
const addChatRoom = chatRoom => ({
    type: ADD_CHAT_ROOM,
    chatRoom
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
        failure: chatsFetchDataError
    })
}

const CHATS_FETCH_DATA_SUCCESS = createAction('CHATS_FETCH_DATA_SUCCESS')
const chatsFetchDataSuccess = res => ({
    type: CHATS_FETCH_DATA_SUCCESS,
    roomId: get(res.data, 'room_id', -1),
    chats: get(res.data, 'chats', [])
})

const CHATS_FETCH_DATA_ERROR = createAction('CHATS_FETCH_DATA_ERROR')
const chatsFetchDataError = err => ({
    type: CHATS_FETCH_DATA_ERROR,
    error: err
})

const CHAT_SEND = createAction('CHAT_SEND')
const chatSend = (
    roomId,
    datas,
    containsFile,
    uploadProgressFn
) => dispatch => {
    return DispatchAPI(
        dispatch,
        MessengerAPI.sendMessage(roomId, datas, containsFile, uploadProgressFn),
        {
            success: chatSendSuccess,
            failure: chatSendError
        }
    )
}

const CHAT_SEND_SUCCESS = createAction('CHAT_SEND_SUCCESS')
const chatSendSuccess = res => ({
    type: CHAT_SEND_SUCCESS,
    room: get(res.data, 'room', {}),
    chat: get(res.data, 'chat', {})
})

const CHAT_SEND_ERROR = createAction('CHAT_SEND_ERROR')
const chatSendError = err => ({
    type: CHAT_SEND_ERROR,
    error: err
})

const RECEIVED_CHAT_ON_WEBSOCKET = createAction('RECEIVED_CHAT_ON_WEBSOCKET')
const receivedChatOnWebsocket = (room, chat) => ({
    type: RECEIVED_CHAT_ON_WEBSOCKET,
    room,
    chat
})

const CLEAR_CHAT = createAction('CLEAR_CHAT')
const clearChat = roomId => ({
    type: CLEAR_CHAT,
    roomId
})

const DELETE_CHATS = createAction('DELETE_CHATS')
const deleteChats = (roomId, chatIds) => dispatch => {
    return DispatchAPI(
        dispatch,
        MessengerAPI.deleteMessages({
            ids: chatIds
        }),
        {
            success: deleteChatsSuccess,
            failure: deleteChatsError
        }
    )
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

const INIT_CHAT = createAction('INIT_CHAT')
const initChat = toUser => dispatch => {
    return DispatchAPI(dispatch, MessengerAPI.initChat(toUser), {
        success: initChatSuccess,
        failure: initChatFailure
    })
}

const INIT_CHAT_SUCCESS = createAction('INIT_CHAT_SUCCESS')
const initChatSuccess = res => ({
    type: INIT_CHAT_SUCCESS,
    room: get(res.data, 'room', {}),
    chats: get(res.data, 'messages', [])
})

const INIT_CHAT_ERROR = createAction('INIT_CHAT_ERROR')
const initChatFailure = err => ({
    type: INIT_CHAT_ERROR,
    error: err
})

const DELETE_CHATS_FROM_WEBSOCKET = createAction('DELETE_CHATS_FROM_WEBSOCKET')
const deleteChatsFromWebsocket = (roomId, chatIds) => ({
    type: DELETE_CHATS_FROM_WEBSOCKET,
    roomId,
    chatIds
})

const SEND_TYPING_STATUS = createAction('SEND_TYPING_STATUS')
const sendTypingStatus = typingStatus => ({
    type: SEND_TYPING_STATUS,
    typingStatus
})

const getRooms = (rooms, room) => {
    const roomExist = rooms.filter(x => x.id === room.id)
    if (!roomExist.length) {
        rooms.push(room)
    } else {
        roomExist[0].unread_count = room.unread_count
    }
    return rooms
}

export const actions = {
    updateTypingStatus,
    readStatusUpdated,
    searchTextChanged,
    roomSelected,
    loadRooms,
    deleteChatRoom,
    addChatRoom,
    openMiniChat,
    closeMiniChat,
    chatsFetchData,
    chatSend,
    receivedChatOnWebsocket,
    clearChat,
    deleteChats,
    fileUploadProgress,
    updateChatReadStatus,
    initChat,
    deleteChatsFromWebsocket,
    sendTypingStatus
}

export default function MessengerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_ROOMS:
        case DELETE_CHAT_ROOM:
        case CHATS_FETCH_DATA:
        case CHAT_SEND:
        case DELETE_CHATS:
        case INIT_CHAT:
            return { ...state, isLoading: true, hasError: null }
        case LOAD_ROOMS_ERROR:
        case DELETE_CHAT_ROOM_ERROR:
        case CHATS_FETCH_DATA_ERROR:
        case CHAT_SEND_ERROR:
        case DELETE_CHATS_ERROR:
        case INIT_CHAT_ERROR:
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
        case ADD_CHAT_ROOM:
            return {
                ...state,
                rooms: getRooms(state.rooms.slice(), action.chatRoom)
            }
        case UPDATE_TYPING_STATUS:
            return { ...state, websocketTypingStatus: action.chatroom }
        case OPEN_MINI_CHAT:
            const roomIdExist = state.minichats.indexOf(action.roomId) > -1
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
        case INIT_CHAT_SUCCESS:
            return {
                ...state,
                chats: { ...state.chats, [action.room.id]: action.chats },
                rooms: getRooms(state.rooms.slice(), action.room)
            }
        case CHAT_SEND_SUCCESS:
        case RECEIVED_CHAT_ON_WEBSOCKET:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.room.id]: [
                        ...(state.chats[action.room.id] || {}),
                        action.chat
                    ]
                },
                rooms: getRooms(state.rooms.slice(), action.room)
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
        case DELETE_CHATS_FROM_WEBSOCKET:
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
        case SEND_TYPING_STATUS:
            return {
                ...state,
                sendTypingStatus: action.typingStatus
            }
        default:
            return state
    }
}
