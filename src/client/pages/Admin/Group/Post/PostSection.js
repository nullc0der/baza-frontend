import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import groupBy from 'lodash/groupBy'

import { actions as groupPostActions } from 'store/GroupPosts'
import PostGroupCard from './PostGroupCard'
import PostEditor from './PostEditor'

import s from './PostPage.scss'

class PostSectionCard extends Component {
    state = {
        posts: {}
    }

    componentDidMount = () => {
        this.props.fetchPosts(this.props.groupID)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.posts !== this.props.posts) {
            this.setPosts(this.props.posts)
        }
    }

    setPosts = fetchedPosts => {
        let finalPosts = groupBy(fetchedPosts, 'created_date')
        for (const finalPost in finalPosts) {
            finalPosts[finalPost].reverse()
        }
        this.setState({
            posts: finalPosts
        })
    }

    requestDeletePost = (e, postID) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.deletePost(postID)
    }

    requestApprovePost = (e, postID) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.approvePost(postID)
    }

    requestDeleteComment = (e, commentID) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.deleteComment(commentID)
    }

    requestApproveComment = (e, commentID) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.approveComment(commentID)
    }

    render() {
        const { className, groupID } = this.props

        const cx = classnames(className)

        return (
            <div className={cx}>
                {Object.keys(this.state.posts)
                    .reverse()
                    .map((date, i) => (
                        <PostGroupCard
                            key={i}
                            posts={this.state.posts[date]}
                            comments={this.props.comments}
                            date={date}
                            requestDeletePost={this.requestDeletePost}
                            requestApprovePost={this.requestApprovePost}
                            createComment={this.props.createComment}
                            getComments={this.props.fetchComments}
                            requestDeleteComment={this.requestDeleteComment}
                            requestApproveComment={this.requestApproveComment}
                            permissionSet={this.props.group.user_permission_set}
                            updateEditingPost={this.props.updateEditingPost}
                            userProfile={this.props.userProfile}
                            dialogClass={s.postsection}
                        />
                    ))}
                <PostEditor
                    posts={this.props.posts}
                    editingPost={this.props.editingPost}
                    createPost={this.props.createPost}
                    groupID={groupID}
                    updateEditingPost={this.props.updateEditingPost}
                    updatePost={this.props.updatePost}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editingPost: state.GroupPosts.editingPost,
    posts: state.GroupPosts.posts,
    comments: state.GroupPosts.comments,
    userProfile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchPosts: groupID => dispatch(groupPostActions.fetchGroupPost(groupID)),
    createPost: data => dispatch(groupPostActions.createGroupPost(data)),
    updatePost: (postID, data) =>
        dispatch(groupPostActions.updateGroupPost(postID, data)),
    deletePost: postID => dispatch(groupPostActions.deleteGroupPost(postID)),
    approvePost: postID => dispatch(groupPostActions.approveGroupPost(postID)),
    fetchComments: postID => dispatch(groupPostActions.getPostComment(postID)),
    createComment: data => dispatch(groupPostActions.createPostComment(data)),
    deleteComment: commentID =>
        dispatch(groupPostActions.deletePostComment(commentID)),
    approveComment: commentID =>
        dispatch(groupPostActions.approvePostComment(commentID)),
    updateEditingPost: postID =>
        dispatch(groupPostActions.updateEditingPost(postID))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostSectionCard)
