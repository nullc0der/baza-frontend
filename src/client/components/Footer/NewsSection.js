import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import classnames from 'classnames'
import take from 'lodash/take'
import words from 'lodash/words'
import moment from 'moment'

import { actions as groupNewsActions } from 'store/GroupNews'

import Dialog from 'components/ui/Dialog'

class NewsSection extends Component {
    state = {
        newsModalIsOpen: false
    }

    componentDidMount = () => {
        this.props.fetchLandingNews()
    }

    toggleNewsModal = () => {
        this.setState({
            newsModalIsOpen: !this.state.newsModalIsOpen
        })
    }

    onClickNews = newsID => {
        this.setState(
            {
                newsModalIsOpen: false
            },
            () => this.props.navigate(`#!news/${newsID}`)
        )
    }

    renderOneNews = (news, index) => {
        const newsContentInWords = words(news.news)
        const newsContent =
            newsContentInWords.length <= 20
                ? newsContentInWords.join(' ')
                : newsContentInWords.slice(0, 20).join(' ')
        return (
            <div
                className="news-item"
                key={index}
                onClick={() => this.onClickNews(news.id)}>
                <p className="news-title">{news.title}</p>
                <div className="news-content">{newsContent}</div>
                <div className="news-published-date">
                    {moment(news.created_on).format('Do MMMM, YYYY')}
                </div>
            </div>
        )
    }

    renderOneModalNews = (news, index) => {
        const newsContentInWords = words(news.news)
        const newsContent =
            newsContentInWords.length <= 100
                ? newsContentInWords.join(' ')
                : newsContentInWords.slice(0, 100).join(' ')
        return (
            <div
                className="news-item"
                key={index}
                onClick={() => this.onClickNews(news.id)}>
                <div className="d-flex justify-content-between align-items-center">
                    {news.title ? (
                        <p className="news-title">{news.title}</p>
                    ) : (
                        <div className="flex-1" />
                    )}
                    <div className="badge news-published-date-badge">
                        {moment(news.created_on).format('Do MMMM, YYYY')}
                    </div>
                </div>
                <div className="news-content">{newsContent}...</div>
            </div>
        )
    }

    render() {
        const { className, landingNews, newsModalClass } = this.props
        const cx = classnames(className, 'news-section')
        return (
            <div className={cx}>
                <div className="news-header">
                    <p className="news-section-title">LATEST NEWS</p>
                    <div
                        className="badge ml-1 read-more-badge"
                        onClick={this.toggleNewsModal}>
                        Read More
                    </div>
                </div>
                {take(landingNews, 2).map(this.renderOneNews)}
                <Dialog
                    className={newsModalClass}
                    isOpen={this.state.newsModalIsOpen}
                    title="Baza Foundation - News"
                    onRequestClose={this.toggleNewsModal}>
                    {landingNews.map(this.renderOneModalNews)}
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    landingNews: state.GroupNews.landingNews
})

const mapDispatchToProps = dispatch => ({
    navigate(...args) {
        return dispatch(push(...args))
    },
    fetchLandingNews: () => dispatch(groupNewsActions.fetchLandingNews())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsSection)
