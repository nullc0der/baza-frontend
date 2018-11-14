import React, { Component } from 'react'
import classnames from 'classnames'
import moment from 'moment'
import showdown from 'showdown'
import { Scrollbars } from 'react-custom-scrollbars'

import Avatar from 'components/Avatar'
import Dialog from 'components/ui/Dialog'

class PostGroupCard extends Component {
    state = {
        postModalIsShown: false,
        postInModal: {},
        commentInput: '',
        clickedOnPostAction: -1
    }

    shouldShowPostOptions = post => {
        if (this.props.permissionSet.indexOf(105) !== -1) {
            return true
        }
        if (post.creator.id === this.props.userProfile.user.id) {
            return true
        }
        return false
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.postInModal.id !== this.state.postInModal.id) {
            this.props.getComments(this.state.postInModal.id)
        }
        if (prevProps.comments !== this.props.comment) {
            if (this.commentScroller) {
                this.commentScroller.scrollToBottom()
            }
        }
    }

    convertMDToHtml = md => {
        const converter = new showdown.Converter({
            noHeaderId: true,
            simpleLineBreaks: true,
            openLinksInNewWindow: true,
            simplifiedAutoLink: true
        })
        return converter.makeHtml(md)
    }

    togglePostModal = e => {
        this.setState(prevState => ({
            postModalIsShown: !prevState.postModalIsShown
        }))
    }

    openPostModal = (e, post) => {
        this.setState({
            postModalIsShown: true,
            postInModal: post
        })
    }

    onChangeCommentInput = e => {
        this.setState({
            commentInput: e.target.value
        })
    }

    sendComment = (e, postID) => {
        e.preventDefault()
        if (this.state.commentInput.length) {
            this.props.createComment(postID, this.state.commentInput)
            this.setState({
                commentInput: ''
            })
        }
    }

    onPostActionClick = (e, postID) => {
        if (this.state.clickedOnPostAction === postID) {
            this.setState({
                clickedOnPostAction: -1
            })
        } else {
            this.setState({
                clickedOnPostAction: postID
            })
        }
    }

    setEditingPost = (e, postID) => {
        e.preventDefault()
        this.props.updateEditingPost(postID)
        this.setState(prevState => ({
            postModalIsShown: !prevState.postModalIsShown
        }))
    }

    renderOnePost = (post, i) => {
        return (
            <div
                className="post"
                key={i}
                onClick={e => this.openPostModal(e, post)}>
                <div className="header">
                    <div className="avatar">
                        <Avatar
                            className="avatar-image"
                            size={30}
                            own={false}
                            otherProfile={{
                                username:
                                    post.creator.fullname ||
                                    post.creator.username,
                                profile_photo: post.creator.user_image_url,
                                default_avatar_color:
                                    post.creator.default_avatar_color
                            }}
                        />
                    </div>
                    <div className="info">
                        <span className="username">
                            {post.creator.username}
                        </span>
                        <span className="time">
                            {moment(post.created_on).format('h:mm a')}
                        </span>
                    </div>
                    <div className="flex-1" />
                    {!post.approved && (
                        <div className="status">Pending Approval</div>
                    )}
                    {/* {
                        this.shouldShowPostOptions(post) && 
                        <div className={`actions dropdown ${this.state.clickedOnPostAction === post.id && 'open'}`}>
                            <i className='fas fa-ellipsis-v' onClick={(e) => this.onPostActionClick(e, post.id)}></i>
                            <ul className='dropdown-menu animated fadeIn'>
                                {(this.props.permissionSet.indexOf(105) !== -1 & !post.approved) ?
                                    <li onClick={(e) => this.props.requestApprovePost(e, post.id)}><a href='#'>Approve</a></li> : ''
                                }
                                <li onClick={(e) => this.props.requestDeletePost(e, post.id)}><a href='#'>Delete</a></li>
                            </ul>
                        </div>
                    } */}
                </div>
                <div
                    className="content"
                    dangerouslySetInnerHTML={{
                        __html: this.convertMDToHtml(post.post)
                    }}
                />
                <div className="footer">
                    {/*<div className='social-buttons'>
                        <i className='fab fa-facebook'></i>
                        <i className='fab fa-twitter'></i>
                  </div>*/}
                    <div className="flex-1" />
                    <div className="comment-count">
                        {post.comment_count !== 0 ? (
                            <p>{post.comment_count} comments</p>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        )
    }

    renderDetailPost = post => {
        return (
            <div className="post post-modal">
                <div className="header">
                    <div className="avatar">
                        <Avatar
                            className="avatar-image"
                            own={false}
                            size={30}
                            otherProfile={{
                                username:
                                    post.creator.fullname ||
                                    post.creator.username,
                                profile_photo: post.creator.user_image_url,
                                default_avatar_color:
                                    post.creator.default_avatar_color
                            }}
                        />
                    </div>
                    <div className="info">
                        <span className="username">
                            {post.creator.username}
                        </span>
                        <span className="time">
                            {moment(post.created_on).format('h:mm a')}
                        </span>
                    </div>
                    <div className="flex-1" />
                    {!post.approved && (
                        <div className="status">Pending Approval</div>
                    )}
                    {this.shouldShowPostOptions(post) && (
                        <div
                            className={`actions dropdown ${this.state
                                .clickedOnPostAction === post.id && 'open'}`}>
                            <i
                                className="fa fa-ellipsis-v"
                                onClick={e =>
                                    this.onPostActionClick(e, post.id)
                                }
                            />
                            <ul className="dropdown-menu animated fadeIn">
                                {(this.props.permissionSet.indexOf(105) !==
                                    -1) |
                                (post.creator.id ===
                                    this.props.userProfile.user.id) ? (
                                    <li
                                        onClick={e =>
                                            this.setEditingPost(e, post.id)
                                        }>
                                        <a href="#">Edit</a>
                                    </li>
                                ) : (
                                    ''
                                )}
                                {(this.props.permissionSet.indexOf(105) !==
                                    -1) &
                                !post.approved ? (
                                    <li
                                        onClick={e =>
                                            this.props.requestApprovePost(
                                                e,
                                                post.id
                                            )
                                        }>
                                        <a href="#">Approve</a>
                                    </li>
                                ) : (
                                    ''
                                )}
                                <li
                                    onClick={e =>
                                        this.props.requestDeletePost(e, post.id)
                                    }>
                                    <a href="#">Delete</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div
                    className="content"
                    dangerouslySetInnerHTML={{
                        __html: this.convertMDToHtml(post.post)
                    }}
                />
                <div className="footer">
                    <div className="comment-box">
                        <Scrollbars
                            autoHide
                            autoHeight
                            autoHeightMax={300}
                            ref={node => {
                                this.commentScroller = node
                            }}>
                            {this.props.comments.map(x =>
                                x.post.id === post.id ? (
                                    <div className="comment" key={x.id}>
                                        <div className="avatar">
                                            <Avatar
                                                className="avatar-image"
                                                own={false}
                                                otherProfile={{
                                                    username:
                                                        x.commentor.fullname ||
                                                        post.commentor.username,
                                                    profile_photo:
                                                        post.commentor
                                                            .user_image_url,
                                                    default_avatar_color:
                                                        post.commentor
                                                            .default_avatar_color
                                                }}
                                            />
                                        </div>
                                        <div className="content">
                                            <p className="username">
                                                {x.commentor.username}
                                            </p>
                                            <p className="text">{x.comment}</p>
                                            <p className="time">
                                                {moment(x.commented_on).format(
                                                    'MMM Do, YY. h:mm a'
                                                )}
                                            </p>
                                        </div>
                                        {!x.approved &
                                        (this.props.permissionSet.indexOf(
                                            105
                                        ) !==
                                            -1) ? (
                                            <div
                                                className="status"
                                                title="approve"
                                                onClick={e =>
                                                    this.props.requestApproveComment(
                                                        e,
                                                        x.id
                                                    )
                                                }>
                                                <i className="fa fa-check" />
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        {(this.props.permissionSet.indexOf(
                                            105
                                        ) !==
                                            -1) |
                                        (this.userProfile.user.id ===
                                            x.commentor.id) ? (
                                            <div
                                                className="status"
                                                title="delete"
                                                onClick={e =>
                                                    this.props.requestDeleteComment(
                                                        e,
                                                        x.id,
                                                        x.post.id
                                                    )
                                                }>
                                                <i className="fa fa-trash" />
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                ) : (
                                    ''
                                )
                            )}
                        </Scrollbars>
                        <div className="comment">
                            <div className="avatar">
                                <Avatar className="avatar-image" size={30} />
                            </div>
                            <div className="comment-input-box">
                                <form
                                    onSubmit={e =>
                                        this.sendComment(e, post.id)
                                    }>
                                    <input
                                        type="text"
                                        className="comment-input"
                                        value={this.state.commentInput}
                                        onChange={this.onChangeCommentInput}
                                        placeholder="press enter to post a comment"
                                    />
                                    <i
                                        className="fas fa-paper-plane"
                                        onClick={e =>
                                            this.sendComment(e, post.id)
                                        }
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { className, date, posts, dialogClass } = this.props

        const cx = classnames(className, 'flex-vertical', 'post-group')

        return (
            <div className={cx}>
                <div className="date-area">
                    {moment(date).format('MMM Do, YYYY')}
                </div>
                <div className="ui-post-group-card">
                    {posts.map(this.renderOnePost)}
                </div>
                <Dialog
                    id="postModal"
                    onRequestClose={this.togglePostModal}
                    isOpen={this.state.postModalIsShown}
                    title={false}
                    className={dialogClass}
                    showClose={false}>
                    {this.state.postModalIsShown &&
                        this.renderDetailPost(this.state.postInModal)}
                </Dialog>
            </div>
        )
    }
}

export default PostGroupCard
