import { jsonAPI, formAPI } from './base'

export const getChatRooms = () => {
    const url = '/messenger/chatrooms/'
    return jsonAPI(api => api.get(url))
}

export const getMessages = roomID => {
    const url = `/messenger/chat/${roomID}/`
    return jsonAPI(api => api.get(url))
}

export const sendMessage = (roomID, datas, containsFile = false) => {
    const url = `/messenger/chat/${roomID}/`
    if (containsFile) {
        return formAPI(api => api.post(url, datas))
    } else {
        return jsonAPI(api => api.post(url, datas))
    }
}

export const deleteMessages = datas => {
    const url = '/messenger/deletemessages/'
    return jsonAPI(api => api.post(url, datas))
}

export const deleteChatRoom = roomID => {
    const url = '/messenger/deletechatrooms/'
    return jsonAPI(api => api.post(url, { id: roomID }))
}

export const updateMessageStatus = datas => {
    const url = '/messenger/updatemessagestatus/'
    return jsonAPI(api => api.post(url, datas))
}
