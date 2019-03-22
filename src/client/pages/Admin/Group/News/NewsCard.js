import React, { Component } from 'react'
import classnames from 'classnames'
import showdown from 'showdown'

import Avatar from 'components/Avatar'

class NewsCard extends Component {
    convertMDToHtml = md => {
        const converter = new showdown.Converter({
            noHeaderId: true,
            simpleLineBreaks: true,
            openLinksInNewWindow: true,
            simplifiedAutoLink: true
        })
        return converter.makeHtml(md)
    }

    render() {
        const {
            className,
            news,
            setEditingNewsID,
            deleteNews,
            publishNews,
            showActions
        } = this.props
        const cx = classnames(className, 'row', 'no-gutters')
        return (
            <div className={cx}>
                <div className="col-md-7">
                    {!!news.title && (
                        <div className="news-title">{news.title}</div>
                    )}
                    <div
                        className="news-content"
                        dangerouslySetInnerHTML={{
                            __html: this.convertMDToHtml(news.news)
                        }}
                    />
                </div>
                <div className="col-md-5 mt-2 mt-md-0">
                    <div className="news-info d-flex justify-content-md-end">
                        <div className="avatar">
                            <Avatar
                                className="avatar-image"
                                size={60}
                                own={false}
                                otherProfile={{
                                    username: news.editor.username,
                                    profile_photo: news.editor.user_image_url,
                                    default_avatar_color:
                                        news.editor.user_avatar_color
                                }}
                            />
                        </div>
                        <div className="other-info">
                            <p className="label">Edited By</p>
                            <p className="text">
                                {news.editor.fullname || news.editor.username}
                            </p>
                            <p className="label">Created Date</p>
                            <p className="text">
                                {new Date(news.created_on).toLocaleDateString(
                                    'en-US',
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }
                                )}
                            </p>
                        </div>
                    </div>
                    {!!showActions && (
                        <div className="news-actions d-flex justify-content-md-end">
                            <button
                                className={`btn btn-sm ${
                                    news.is_published
                                        ? 'btn-warning'
                                        : 'btn-success'
                                }`}
                                onClick={() =>
                                    publishNews(news.id, !news.is_published)
                                }>
                                {news.is_published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteNews(news.id)}>
                                Delete
                            </button>
                            <button
                                className="btn btn-sm btn-info"
                                onClick={() => setEditingNewsID(news.id)}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default NewsCard
