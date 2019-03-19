import get from 'lodash/get'

import { DispatchAPI } from 'api/base'
import * as GroupNewsAPI from 'api/group-news'

const INITIAL_STATE = {
    news: [],
    landingNews: [],
    isLoading: false,
    hasError: null,
    editingNewsID: -1
}

const createAction = str => `GROUP_NEWS_${str}`

const FETCH_GROUP_NEWS = createAction('FETCH_GROUP_NEWS')
const fetchGroupNews = groupID => dispatch => {
    return DispatchAPI(dispatch, GroupNewsAPI.fetchNews(groupID), {
        success: fetchGroupNewsSuccess,
        failure: fetchGroupNewsFailure
    })
}

const FETCH_GROUP_NEWS_SUCCESS = createAction('FETCH_GROUP_NEWS_SUCCESS')
const fetchGroupNewsSuccess = res => ({
    type: FETCH_GROUP_NEWS_SUCCESS,
    news: get(res, 'data', [])
})

const FETCH_GROUP_NEWS_FAILURE = createAction('FETCH_GROUP_NEWS_FAILURE')
const fetchGroupNewsFailure = err => ({
    type: FETCH_GROUP_NEWS_FAILURE,
    error: err
})

const FETCH_SINGLE_GROUP_NEWS = createAction('FETCH_SINGLE_GROUP_NEWS')
const fetchSingleGroupNews = newsID => dispatch => {
    return DispatchAPI(dispatch, GroupNewsAPI.fetchSingleNews(newsID), {
        success: fetchSingleGroupNewsSuccess,
        failure: fetchSingleGroupNewsFailure
    })
}

const FETCH_SINGLE_GROUP_NEWS_SUCCESS = createAction(
    'FETCH_SINGLE_GROUP_NEWS_SUCCESS'
)
const fetchSingleGroupNewsSuccess = res => ({
    type: FETCH_SINGLE_GROUP_NEWS_SUCCESS,
    news: get(res, 'data', {})
})

const FETCH_SINGLE_GROUP_NEWS_FAILURE = createAction(
    'FETCH_SINGLE_GROUP_NEWS_FAILURE'
)
const fetchSingleGroupNewsFailure = err => ({
    type: FETCH_SINGLE_GROUP_NEWS_FAILURE,
    error: err
})

const CREATE_GROUP_NEWS = createAction('CREATE_GROUP_NEWS')
const createGroupNews = data => dispatch => {
    return DispatchAPI(dispatch, GroupNewsAPI.createNews(data), {
        success: createGroupNewsSuccess,
        failure: createGroupNewsFailure
    })
}

const CREATE_GROUP_NEWS_SUCCESS = createAction('CREATE_GROUP_NEWS_SUCCESS')
const createGroupNewsSuccess = res => ({
    type: CREATE_GROUP_NEWS_SUCCESS,
    news: get(res, 'data', {})
})

const CREATE_GROUP_NEWS_FAILURE = createAction('CREATE_GROUP_NEWS_FAILURE')
const createGroupNewsFailure = err => ({
    type: CREATE_GROUP_NEWS_FAILURE,
    error: err
})

const UPDATE_GROUP_NEWS = createAction('UPDATE_GROUP_NEWS')
const updateGroupNews = (newsID, data) => dispatch => {
    return DispatchAPI(dispatch, GroupNewsAPI.updateNews(newsID, data), {
        success: updateGroupNewsSuccess,
        failure: updateGroupNewsFailure
    })
}

const UPDATE_GROUP_NEWS_SUCCESS = createAction('UPDATE_GROUP_NEWS_SUCCESS')
const updateGroupNewsSuccess = res => ({
    type: UPDATE_GROUP_NEWS_SUCCESS,
    news: get(res, 'data', {})
})

const UPDATE_GROUP_NEWS_FAILURE = createAction('UPDATE_GROUP_NEWS_FAILURE')
const updateGroupNewsFailure = err => ({
    type: UPDATE_GROUP_NEWS_FAILURE,
    error: err
})

const DELETE_GROUP_NEWS = createAction('DELETE_GROUP_NEWS')
const deleteGroupNews = newsID => dispatch => {
    return DispatchAPI(dispatch, GroupNewsAPI.deleteNews(newsID), {
        success: deleteGroupNewsSuccess,
        failure: deleteGroupNewsFailure
    })
}

const DELETE_GROUP_NEWS_SUCCESS = createAction('DELETE_GROUP_NEWS_SUCCESS')
const deleteGroupNewsSuccess = res => ({
    type: DELETE_GROUP_NEWS_SUCCESS,
    newsID: get(res.data, 'news_id', -1)
})

const DELETE_GROUP_NEWS_FAILURE = createAction('DELETE_GROUP_NEWS_FAILURE')
const deleteGroupNewsFailure = err => ({
    type: DELETE_GROUP_NEWS_FAILURE,
    error: err
})

const PUBLISH_GROUP_NEWS = createAction('PUBLISH_GROUP_NEWS')
const publishGroupNews = (newsID, isPublished) => dispatch => {
    return DispatchAPI(
        dispatch,
        GroupNewsAPI.publishNews(newsID, isPublished),
        {
            success: publishGroupNewsSuccess,
            failure: publishGroupNewsFailure
        }
    )
}

const PUBLISH_GROUP_NEWS_SUCCESS = createAction('PUBLISH_GROUP_NEWS_SUCCESS')
const publishGroupNewsSuccess = res => ({
    type: PUBLISH_GROUP_NEWS_SUCCESS,
    news: get(res, 'data', {})
})

const PUBLISH_GROUP_NEWS_FAILURE = createAction('PUBLISH_GROUP_NEWS_FAILURE')
const publishGroupNewsFailure = err => ({
    type: PUBLISH_GROUP_NEWS_FAILURE,
    error: err
})

const FETCH_LANDING_NEWS = createAction('FETCH_LANDING_NEWS')
const fetchLandingNews = () => dispatch => {
    return DispatchAPI(dispatch, GroupNewsAPI.fetchLandingNews, {
        success: fetchLandingNewsSuccess,
        failure: fetchLandingNewsFailure
    })
}

const FETCH_LANDING_NEWS_SUCCESS = createAction('FETCH_LANDING_NEWS_SUCCESS')
const fetchLandingNewsSuccess = res => ({
    type: FETCH_LANDING_NEWS_SUCCESS,
    landingNews: get(res, 'data', [])
})

const FETCH_LANDING_NEWS_FAILURE = createAction('FETCH_LANDING_NEWS_FAILURE')
const fetchLandingNewsFailure = err => ({
    type: FETCH_LANDING_NEWS_FAILURE,
    error: err
})

const FETCH_SINGLE_LANDING_NEWS = createAction('FETCH_SINGLE_LANDING_NEWS')
const fetchSingleLandingNews = () => dispatch => {
    return DispatchAPI(dispatch, GroupNewsAPI.fetchSingleLandingNews, {
        success: fetchSingleLandingNewsSuccess,
        failure: fetchSingleLandingNewsFailure
    })
}

const FETCH_SINGLE_LANDING_NEWS_SUCCESS = createAction(
    'FETCH_SINGLE_LANDING_NEWS_SUCCESS'
)
const fetchSingleLandingNewsSuccess = res => ({
    type: FETCH_SINGLE_LANDING_NEWS_SUCCESS,
    landingNews: get(res, 'data', {})
})

const FETCH_SINGLE_LANDING_NEWS_FAILURE = createAction(
    'FETCH_SINGLE_LANDING_NEWS_FAILURE'
)
const fetchSingleLandingNewsFailure = err => ({
    type: FETCH_SINGLE_LANDING_NEWS_FAILURE,
    error: err
})

const SET_EDITING_NEWS_ID = createAction('SET_EDITING_NEWS_ID')
const setEditingNewsID = newsID => ({
    type: SET_EDITING_NEWS_ID,
    newsID
})

export const actions = {
    fetchGroupNews,
    fetchSingleGroupNews,
    createGroupNews,
    updateGroupNews,
    publishGroupNews,
    deleteGroupNews,
    fetchLandingNews,
    fetchSingleLandingNews,
    setEditingNewsID
}

export default function GroupNewsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_GROUP_NEWS:
        case FETCH_SINGLE_GROUP_NEWS:
        case CREATE_GROUP_NEWS:
        case UPDATE_GROUP_NEWS:
        case PUBLISH_GROUP_NEWS:
        case DELETE_GROUP_NEWS:
        case FETCH_LANDING_NEWS:
        case FETCH_SINGLE_LANDING_NEWS:
            return {
                ...state,
                isLoading: true,
                hasError: null
            }
        case FETCH_GROUP_NEWS_FAILURE:
        case FETCH_SINGLE_GROUP_NEWS_FAILURE:
        case CREATE_GROUP_NEWS_FAILURE:
        case UPDATE_GROUP_NEWS_FAILURE:
        case PUBLISH_GROUP_NEWS_FAILURE:
        case DELETE_GROUP_NEWS_FAILURE:
        case FETCH_LANDING_NEWS_FAILURE:
        case FETCH_SINGLE_LANDING_NEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: action.error
            }
        case FETCH_GROUP_NEWS_SUCCESS:
            return {
                ...state,
                news: action.news
            }
        case CREATE_GROUP_NEWS_SUCCESS:
            return {
                ...state,
                news: [...state.news, action.news]
            }
        case UPDATE_GROUP_NEWS_SUCCESS:
        case PUBLISH_GROUP_NEWS_SUCCESS:
        case FETCH_SINGLE_GROUP_NEWS_SUCCESS:
            return {
                ...state,
                news: state.news.map(x =>
                    x.id === action.news.id ? action.news : x
                )
            }
        case DELETE_GROUP_NEWS_SUCCESS:
            return {
                ...state,
                news: state.news.filter(x => x.id !== action.newsID)
            }
        case FETCH_LANDING_NEWS_SUCCESS:
            return {
                ...state,
                landingNews: action.landingNews
            }
        case FETCH_SINGLE_LANDING_NEWS_SUCCESS:
            return {
                ...state,
                landingNews: state.landingNews.map(x =>
                    x.id === action.landingNews.id ? action.landingNews : x
                )
            }
        case SET_EDITING_NEWS_ID:
            return {
                ...state,
                editingNewsID: action.newsID
            }
        default:
            return state
    }
}
