import get from 'lodash/get'

import { DispatchAPI } from 'api/base'
import * as GroupPostsAPI from 'api/group-post'

const INITIAL_STATE = {
    posts: [],
    comments: [],
    isLoading: false,
    hasError: null,
    editingPost: -1
}

const createAction = str => `GROUP_POSTS_${str}`

const FETCH_GROUP_POST = createAction('FETCH_GROUP_POST')
const fetchGroupPost = groupID => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.fetchPosts(groupID), {
        success: fetchGroupPostSuccess,
        failure: fetchGroupPostFailure
    })
}

const FETCH_GROUP_POST_SUCCESS = createAction('FETCH_GROUP_POST_SUCCESS')
const fetchGroupPostSuccess = res => ({
    type: FETCH_GROUP_POST_SUCCESS,
    posts: get(res, 'data', [])
})

const FETCH_GROUP_POST_FAILURE = createAction('FETCH_GROUP_POST_FAILURE')
const fetchGroupPostFailure = err => ({
    type: FETCH_GROUP_POST_FAILURE,
    error: err
})

const CREATE_GROUP_POST = createAction('CREATE_GROUP_POST')
const createGroupPost = data => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.createPost(data), {
        success: createGroupPostSuccess,
        failure: createGroupPostFailure
    })
}

const CREATE_GROUP_POST_SUCCESS = createAction('CREATE_GROUP_POST_SUCCESS')
const createGroupPostSuccess = res => ({
    type: CREATE_GROUP_POST_SUCCESS,
    post: get(res, 'data', {})
})

const CREATE_GROUP_POST_FAILURE = createAction('CREATE_GROUP_POST_FAILURE')
const createGroupPostFailure = err => ({
    type: CREATE_GROUP_POST_FAILURE,
    error: err
})

const UPDATE_GROUP_POST = createAction('UPDATE_GROUP_POST')
const updateGroupPost = (postID, data) => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.updatePost(postID, data), {
        success: updateGroupPostSuccess,
        failure: updateGroupPostFailure
    })
}

const UPDATE_GROUP_POST_SUCCESS = createAction('UPDATE_GROUP_POST_SUCCESS')
const updateGroupPostSuccess = res => ({
    type: UPDATE_GROUP_POST_SUCCESS,
    post: get(res, 'data', {})
})

const UPDATE_GROUP_POST_FAILURE = createAction('UPDATE_GROUP_POST_FAILURE')
const updateGroupPostFailure = err => ({
    type: UPDATE_GROUP_POST_FAILURE,
    error: err
})

const DELETE_GROUP_POST = createAction('DELETE_GROUP_POST')
const deleteGroupPost = postID => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.deletePost(postID), {
        success: deleteGroupPostSuccess,
        failure: deleteGroupPostFailure
    })
}

const DELETE_GROUP_POST_SUCCESS = createAction('DELETE_GROUP_POST_SUCCESS')
const deleteGroupPostSuccess = res => ({
    type: DELETE_GROUP_POST_SUCCESS,
    postID: get(res.data, 'post_id', -1)
})

const DELETE_GROUP_POST_FAILURE = createAction('DELETE_GROUP_POST_FAILURE')
const deleteGroupPostFailure = err => ({
    type: DELETE_GROUP_POST_FAILURE,
    error: err
})

const APPROVE_GROUP_POST = createAction('APPROVE_GROUP_POST')
const approveGroupPost = postID => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.approvePost(postID), {
        success: approveGroupPostSuccess,
        failure: approveGroupPostFailure
    })
}

const APPROVE_GROUP_POST_SUCCESS = createAction('APPROVE_GROUP_POST_SUCCESS')
const approveGroupPostSuccess = res => ({
    type: APPROVE_GROUP_POST_SUCCESS,
    post: get(res, 'data', {})
})

const APPROVE_GROUP_POST_FAILURE = createAction('APPROVE_GROUP_POST_FAILURE')
const approveGroupPostFailure = err => ({
    type: APPROVE_GROUP_POST_FAILURE,
    error: err
})

const GET_POST_COMMENT = createAction('GET_POST_COMMENT')
const getPostComment = postID => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.getComments(postID), {
        success: getPostCommentSuccess,
        failure: getPostCommentFailure
    })
}

const GET_POST_COMMENT_SUCCESS = createAction('GET_POST_COMMENT_SUCCESS')
const getPostCommentSuccess = res => ({
    type: GET_POST_COMMENT_SUCCESS,
    comments: get(res, 'data', {})
})

const GET_POST_COMMENT_FAILURE = createAction('GET_POST_COMMENT_FAILURE')
const getPostCommentFailure = err => ({
    type: GET_POST_COMMENT_FAILURE,
    error: err
})

const CREATE_POST_COMMENT = createAction('CREATE_POST_COMMENT')
const createPostComment = (postID, data) => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.createComment(postID, data), {
        success: createPostCommentSuccess,
        failure: createPostCommentFailure
    })
}

const CREATE_POST_COMMENT_SUCCESS = createAction('CREATE_POST_COMMENT_SUCCESS')
const createPostCommentSuccess = res => ({
    type: CREATE_POST_COMMENT_SUCCESS,
    comment: get(res, 'data', {})
})

const CREATE_POST_COMMENT_FAILURE = createAction('CREATE_POST_COMMENT_FAILURE')
const createPostCommentFailure = err => ({
    type: CREATE_POST_COMMENT_FAILURE,
    error: err
})

const UPDATE_POST_COMMENT = createAction('UPDATE_POST_COMMENT')
const updatePostComment = (commentID, data) => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.updateComment(commentID, data), {
        success: updatePostCommentSuccess,
        failure: updatePostCommentFailure
    })
}

const UPDATE_POST_COMMENT_SUCCESS = createAction('UPDATE_POST_COMMENT_SUCCESS')
const updatePostCommentSuccess = res => ({
    type: UPDATE_POST_COMMENT_SUCCESS,
    comment: get(res, 'data', {})
})

const UPDATE_POST_COMMENT_FAILURE = createAction('UPDATE_POST_COMMENT_FAILURE')
const updatePostCommentFailure = err => ({
    type: UPDATE_POST_COMMENT_FAILURE,
    error: err
})

const DELETE_POST_COMMENT = createAction('DELETE_POST_COMMENT')
const deletePostComment = commentID => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.deleteComment(commentID), {
        success: deletePostCommentSuccess,
        failure: deletePostCommentFailure
    })
}

const DELETE_POST_COMMENT_SUCCESS = createAction('DELETE_POST_COMMENT_SUCCESS')
const deletePostCommentSuccess = res => ({
    type: DELETE_POST_COMMENT_SUCCESS,
    commentID: get(res.data, 'comment_id', -1)
})

const DELETE_POST_COMMENT_FAILURE = createAction('DELETE_POST_COMMENT_FAILURE')
const deletePostCommentFailure = err => ({
    type: DELETE_POST_COMMENT_FAILURE,
    error: err
})

const APPROVE_POST_COMMENT = createAction('APPROVE_POST_COMMENT')
const approvePostComment = commentID => dispatch => {
    return DispatchAPI(dispatch, GroupPostsAPI.approveComment(commentID), {
        success: approvePostCommentSuccess,
        failure: approvePostCommentFailure
    })
}

const APPROVE_POST_COMMENT_SUCCESS = createAction(
    'APPROVE_POST_COMMENT_SUCCESS'
)
const approvePostCommentSuccess = res => ({
    type: APPROVE_POST_COMMENT_SUCCESS,
    comment: get(res, 'data', {})
})

const APPROVE_POST_COMMENT_FAILURE = createAction(
    'APPROVE_POST_COMMENT_FAILURE'
)
const approvePostCommentFailure = err => ({
    type: APPROVE_POST_COMMENT_FAILURE,
    error: err
})
const UPDATE_EDITING_POST = createAction('UPDATE_EDITING_POST')
const updateEditingPost = postID => ({
    type: UPDATE_EDITING_POST,
    postID
})

export const actions = {
    fetchGroupPost,
    createGroupPost,
    updateGroupPost,
    deleteGroupPost,
    approveGroupPost,
    getPostComment,
    createPostComment,
    updatePostComment,
    deletePostComment,
    approvePostComment,
    updateEditingPost
}

export default function GroupPostsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_GROUP_POST:
        case CREATE_GROUP_POST:
        case UPDATE_GROUP_POST:
        case DELETE_GROUP_POST:
        case APPROVE_GROUP_POST:
        case GET_POST_COMMENT:
        case CREATE_POST_COMMENT:
        case UPDATE_POST_COMMENT:
        case DELETE_POST_COMMENT:
        case APPROVE_POST_COMMENT:
            return {
                ...state,
                isLoading: true,
                hasError: null
            }
        case FETCH_GROUP_POST_FAILURE:
        case CREATE_GROUP_POST_FAILURE:
        case UPDATE_GROUP_POST_FAILURE:
        case DELETE_GROUP_POST_FAILURE:
        case APPROVE_GROUP_POST_FAILURE:
        case GET_POST_COMMENT_FAILURE:
        case CREATE_POST_COMMENT_FAILURE:
        case UPDATE_POST_COMMENT_FAILURE:
        case DELETE_POST_COMMENT_FAILURE:
        case APPROVE_POST_COMMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: action.error
            }
        case FETCH_GROUP_POST_SUCCESS:
            return {
                ...state,
                posts: action.posts
            }
        case CREATE_GROUP_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        case UPDATE_GROUP_POST_SUCCESS:
        case APPROVE_GROUP_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(x =>
                    x.id === action.post.id ? action.post : x
                )
            }
        case DELETE_GROUP_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(x => x.id !== action.postID)
            }
        case GET_POST_COMMENT_SUCCESS:
            return {
                ...state,
                comments: action.comments
            }
        case CREATE_POST_COMMENT_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }
        case UPDATE_POST_COMMENT_SUCCESS:
        case APPROVE_POST_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments.map(x =>
                    x.id === action.comment.id ? action.comment : x
                )
            }
        case DELETE_POST_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments.filter(x => x.id !== action.commentID)
            }
        case UPDATE_EDITING_POST:
            return { ...state, editingPost: action.postID }
        default:
            return state
    }
}
