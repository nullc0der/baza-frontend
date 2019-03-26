import React, { Component } from 'react'
import classnames from 'classnames'
import find from 'lodash/find'
import moment from 'moment'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Dialog from 'components/ui/Dialog'

import { actions as groupNewsActions } from 'store/GroupNews'

import s from './NewsDialog.scss'

class NewsDialog extends Component {
    state = {
        newsID: -1
    }

    componentDidMount() {
        const newsID = this.props.location.hash.split('/')[1]
        this.setState({
            newsID
        })
        this.props.fetchSingleLandingNews(newsID)
    }

    closeNewsModal = () => {
        const { pathname, hash } = this.props.location
        this.props.navigate(pathname + (hash || '').replace(hash, ''))
    }

    render() {
        const cx = classnames(s.container)
        const { newsID } = this.state
        const { landingNews } = this.props
        const news = find(landingNews, ['id', Number(newsID)])
        return news ? (
            <Dialog
                className={cx}
                isOpen
                title={news.title}
                onRequestClose={this.closeNewsModal}>
                <div className="d-flex justify-content-end">
                    <div className="badge news-published-date-badge">
                        {moment(news.created_on).format('Do MMMM, YYYY')}
                    </div>
                </div>
                <div
                    className="news-content"
                    dangerouslySetInnerHTML={{
                        __html: news.converted_news
                    }}
                />
            </Dialog>
        ) : null
    }
}

const mapStateToProps = state => ({
    location: state.router.location,
    landingNews: state.GroupNews.landingNews
})

const mapDispatchToProps = dispatch => ({
    navigate(...args) {
        return dispatch(push(...args))
    },
    fetchLandingNews: () => dispatch(groupNewsActions.fetchLandingNews()),
    fetchSingleLandingNews: newsID =>
        dispatch(groupNewsActions.fetchSingleLandingNews(newsID))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsDialog)
