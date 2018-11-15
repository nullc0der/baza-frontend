import { jsonAPI, formAPI } from 'api/base'

export const fetchPosts = groupID => {
    const url = `/groups/posts/?group_id=${groupID}`
    return jsonAPI(api => api.get(url))
}

export const createPost = data => {
    const url = '/groups/posts/'
    return jsonAPI(api => api.post(url, data))
}

export const updatePost = (postID, data) => {
    const url = `/groups/posts/${postID}/`
    return jsonAPI(api => api.put(url, data))
}

export const deletePost = postID => {
    const url = `/groups/posts/${postID}/`
    return jsonAPI(api => api.delete(url))
}

export const approvePost = postID => {
    const url = `/groups/posts/${postID}/`
    return jsonAPI(api => api.patch(url))
}

export const getComments = postID => {
    const url = `/groups/posts/comment/?post_id=${postID}`
    return jsonAPI(api => api.get(url))
}

export const createComment = data => {
    const url = `/groups/posts/comment/`
    return jsonAPI(api => api.post(url, data))
}

export const updateComment = (commentID, data) => {
    const url = `/groups/posts/comment/${commentID}/`
    return jsonAPI(api => api.put(url, data))
}

export const deleteComment = commentID => {
    const url = `/groups/posts/comment/${commentID}/`
    return jsonAPI(api => api.delete(url))
}

export const approveComment = commentID => {
    const url = `/groups/posts/comment/${commentID}/`
    return jsonAPI(api => api.patch(url))
}

export const uploadImage = data => {
    const url = '/groups/posts/uploadimage/'
    return formAPI(api => api.post(url, data))
}
