import { jsonAPI, formAPI } from 'api/base'

export const fetchNews = groupID => {
    const url = `/groups/news/?group_id=${groupID}`
    return jsonAPI(api => api.get(url))
}

export const fetchSingleNews = newsID => {
    const url = `/groups/news/${newsID}/`
    return jsonAPI(api => api.get(url))
}

export const createNews = data => {
    const url = '/groups/news/'
    return jsonAPI(api => api.post(url, data))
}

export const updateNews = (newsID, data) => {
    const url = `/groups/news/${newsID}/`
    return jsonAPI(api => api.put(url, data))
}

export const publishNews = (newsID, isPublished = false) => {
    const url = `/groups/news/${newsID}/`
    return jsonAPI(api => api.patch(url, { is_published: isPublished }))
}

export const deleteNews = newsID => {
    const url = `/groups/news/${newsID}/`
    return jsonAPI(api => api.delete(url))
}

export const uploadImage = data => {
    const url = '/groups/news/uploadimage/'
    return formAPI(api => api.post(url, data))
}

export const fetchLandingNews = () => {
    const url = '/groups/news/landingnews/'
    return jsonAPI(api => api.get(url))
}

export const fetchSingleLandingNews = newsID => {
    const url = `/groups/news/landingnews/${newsID}/`
    return jsonAPI(api => api.get(url))
}
