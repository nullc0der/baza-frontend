import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { actions as groupNewsActions } from 'store/GroupNews'

import NewsEditor from './NewsEditor'
import NewsCard from './NewsCard'

import { isNewsEditor } from 'pages/Admin/Group/utils'

class NewsSection extends Component {
    componentDidMount = () => {
        this.props.fetchNews(this.props.groupID)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.groupID !== this.props.groupID) {
            this.props.fetchNews(this.props.groupID)
        }
    }

    render() {
        const { className, groupID, news, group } = this.props
        const cx = classnames(className)
        return (
            <div className={cx}>
                {news.map((x, i) => (
                    <NewsCard
                        key={i}
                        news={x}
                        className="news-card"
                        setEditingNewsID={this.props.setEditingNewsID}
                        publishNews={this.props.publishNews}
                        deleteNews={this.props.deleteNews}
                        showActions={isNewsEditor(group.user_permission_set)}
                    />
                ))}
                {!!isNewsEditor(group.user_permission_set) && (
                    <NewsEditor
                        news={this.props.news}
                        editingNewsID={this.props.editingNewsID}
                        createNews={this.props.createNews}
                        groupID={groupID}
                        setEditingNewsID={this.props.setEditingNewsID}
                        updateNews={this.props.updateNews}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editingNewsID: state.GroupNews.editingNewsID,
    news: state.GroupNews.news,
    userProfile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchNews: groupID => dispatch(groupNewsActions.fetchGroupNews(groupID)),
    createNews: data => dispatch(groupNewsActions.createGroupNews(data)),
    updateNews: (newsID, data) =>
        dispatch(groupNewsActions.updateGroupNews(newsID, data)),
    deleteNews: newsID => dispatch(groupNewsActions.deleteGroupNews(newsID)),
    publishNews: (newsID, isPublished) =>
        dispatch(groupNewsActions.publishGroupNews(newsID, isPublished)),
    setEditingNewsID: newsID =>
        dispatch(groupNewsActions.setEditingNewsID(newsID))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsSection)
