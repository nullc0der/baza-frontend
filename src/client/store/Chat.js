//import CHAT_LIST from 'pages/Admin/Messenger/sample-chats' //eslint-disable-line no-unused-vars
//import CHAT_DETAILS from 'pages/Admin/Messenger/sample-detailed-chat'

// eslint-disable-next-line no-unused-vars
const debug = require('debug')('baza:store:chat')

const INITIAL_STATE = {
    minichats: [],
    chats: []
}

function createSampleChat(chat) {
    return Object.assign({}, chat, {
        user: chat.username,
        messages: CHAT_DETAILS
    })
}

const OPEN_MINI_CHAT = 'OPEN_MINI_CHAT'
const openMiniChat = chat => ({
    type: OPEN_MINI_CHAT,
    chat: createSampleChat(chat)
})

const CLOSE_MINI_CHAT = 'CLOSE_MINI_CHAT'
const closeMiniChat = chatid => ({
    type: CLOSE_MINI_CHAT,
    chatid
})

export const actions = {
    openMiniChat,
    closeMiniChat
}

export default function ChatReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPEN_MINI_CHAT:
            return { ...state, minichats: [...state.minichats, action.chat] }
        case CLOSE_MINI_CHAT:
            return {
                ...state,
                minichats: state.minichats.filter(x => x.id !== action.chatid)
            }
        default:
            return state
    }
}
