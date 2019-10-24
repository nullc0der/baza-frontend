import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

class NewsSection extends React.Component {
    onClickNews = newsID => {
        this.props.navigate(`#!news/${newsID}`)
    }

    renderRecentNews = news => {
        return (
            <div className="latest-news">
                <h5 className="text-center news-title">{news.title}</h5>
                <div className="text-right news-published-date mb-2">
                    <div className="badge news-published-date-badge">
                        {moment(news.created_on).format('Do MMMM, YYYY')}
                    </div>
                </div>
                <div
                    className="news-content mb-2"
                    dangerouslySetInnerHTML={{
                        __html: news.converted_news
                    }}
                />
                <div
                    className="text-right"
                    onClick={() => this.onClickNews(news.id)}>
                    <div className="badge read-more-badge">Read More</div>
                </div>
            </div>
        )
    }

    renderOneOtherNews = (news, index) => {
        return (
            <div className="news-item mb-2" key={index}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="news-title">{news.title}</h6>
                    <div
                        className="badge read-more-badge"
                        onClick={() => this.onClickNews(news.id)}>
                        Read More
                    </div>
                </div>
                <div
                    className="news-content mb-1"
                    dangerouslySetInnerHTML={{
                        __html: news.converted_news
                    }}
                />
                <div className="news-published-date">
                    {moment(news.created_on).format('Do MMMM, YYYY')}
                </div>
            </div>
        )
    }

    render() {
        const { className, id, landingNews } = this.props
        const cx = classnames(className, 'news-section')

        return landingNews.length ? (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="text-center mb-3"> News </h3>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            {this.renderRecentNews(landingNews[0])}
                        </div>
                        <div className="col-12 col-md-4 mt-2 mt-md-0">
                            <div className="other-news pr-md-1">
                                {landingNews
                                    .filter((x, i) => i !== 0)
                                    .map(this.renderOneOtherNews)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    }
}

const mapStateToProps = state => ({
    landingNews: state.GroupNews.landingNews
})

const mapDispatchToProps = dispatch => ({
    navigate(...args) {
        return dispatch(push(...args))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsSection)
