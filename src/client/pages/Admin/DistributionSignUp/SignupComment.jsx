import React, { Component } from 'react'
import get from 'lodash/get'
import moment from 'moment'
import { connect } from 'react-redux'

import { actions as distributionSignupStaffSideActions } from 'store/DistributionSignUpStaffSide'

import { CardContent } from 'components/ui/CardWithTabs'
import TextField from 'components/ui/TextField'
import Avatar from 'components/Avatar'

const Comment = props => {
    const {
        comment,
        shouldShowCommentActions,
        onClickEditComment,
        onClickDeleteComment
    } = props
    return (
        <div className="flex-horizontal comment">
            <div className="info">
                <p className="title">{comment.title}</p>
                <div className="flex-horizontal user-info align-items-center">
                    <Avatar
                        className="avatar-image"
                        size={40}
                        otherProfile={{
                            username: comment.commented_by.username,
                            profile_photo: comment.commented_by.user_image_url,
                            default_avatar_color:
                                comment.commented_by.user_avatar_color
                        }}
                        own={false}
                    />
                    <span className="username">
                        {comment.commented_by.fullname}
                    </span>
                </div>
                <div className="timestamp mt-1">
                    {moment(comment.commented_on).format(
                        'MMMM Do YYYY, h:mm a'
                    )}
                </div>
            </div>
            <div className="content flex-1 ml-1">{comment.content}</div>
            {!!shouldShowCommentActions && (
                <div className="actions ml-1">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onClickEditComment(comment.id)}>
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger ml-1"
                        onClick={() => onClickDeleteComment(comment.id)}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

class SignupComment extends Component {
    state = {
        inputValues: {
            title: '',
            content: ''
        },
        errorValues: {
            title: null,
            content: null
        },
        editingComment: null
    }

    componentDidMount() {
        if (this.props.selectedID) {
            this.props.fetchSignupComments(this.props.selectedID)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedID !== this.props.selectedID) {
            this.props.fetchSignupComments(this.props.selectedID)
        }
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onCommentSubmit = () => {
        const {
            createSignupComment,
            selectedID,
            updateSignupComment
        } = this.props
        const { editingComment } = this.state
        const submitFn = editingComment
            ? updateSignupComment
            : createSignupComment
        const data = editingComment
            ? { id: editingComment, ...this.state.inputValues }
            : this.state.inputValues
        submitFn(selectedID, data)
            .then(() => {
                this.setState({
                    inputValues: {
                        title: '',
                        content: ''
                    },
                    editingComment: null
                })
            })
            .catch(responseData => {
                this.setState({
                    errorValues: {
                        title: get(responseData, 'title', null),
                        content: get(responseData, 'content', null)
                    }
                })
            })
    }

    shouldShowCommentActions = commentorID => {
        const { userProfile } = this.props
        return commentorID === userProfile.id
    }

    onClickEditComment = id => {
        const { signupComments } = this.props
        const comment = signupComments.filter(x => x.id === id)
        if (comment.length) {
            this.setState({
                inputValues: {
                    title: comment[0].title,
                    content: comment[0].content
                },
                editingComment: id
            })
        }
    }

    onClickEditCommentCancel = () => {
        this.setState({
            inputValues: {
                title: '',
                content: ''
            },
            editingComment: null
        })
    }

    onClickDeleteComment = commentID => {
        const { selectedID, deleteSignupComment } = this.props
        deleteSignupComment(selectedID, commentID)
    }

    render() {
        const { signupComments } = this.props
        const { editingComment } = this.state
        return (
            <CardContent>
                <div className="comment-post-form">
                    <div className="flex-vertical">
                        <label>Post a comment</label>
                        <TextField
                            id="title"
                            label="Title"
                            value={this.state.inputValues.title}
                            errorState={this.state.errorValues.title}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            id="content"
                            label="Description"
                            className="mt-3"
                            value={this.state.inputValues.content}
                            errorState={this.state.errorValues.content}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className="flex-horizontal j-end my-1">
                        <button
                            className="btn btn-primary"
                            onClick={this.onCommentSubmit}>
                            Submit
                        </button>
                        {!!editingComment && (
                            <button
                                className="btn btn-danger ml-1"
                                onClick={this.onClickEditCommentCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
                {!!signupComments.length && (
                    <div className="comment-section">
                        <label>Comments</label>
                        {signupComments.map((x, i) => (
                            <Comment
                                key={i}
                                comment={x}
                                shouldShowCommentActions={this.shouldShowCommentActions(
                                    x.commented_by.id
                                )}
                                onClickEditComment={this.onClickEditComment}
                                onClickDeleteComment={this.onClickDeleteComment}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    signupComments: state.DistributionSignUpStaffSide.signupComments,
    selectedID: state.DistributionSignUpStaffSide.selectedID,
    userProfile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchSignupComments(id) {
        return dispatch(
            distributionSignupStaffSideActions.fetchSignupComments(id)
        )
    },
    createSignupComment(signupID, data) {
        return dispatch(
            distributionSignupStaffSideActions.createSignupComment(
                signupID,
                data
            )
        )
    },
    updateSignupComment(signupID, data) {
        return dispatch(
            distributionSignupStaffSideActions.updateSignupComment(
                signupID,
                data
            )
        )
    },
    deleteSignupComment(signupID, commentID) {
        return dispatch(
            distributionSignupStaffSideActions.deleteSignupComment(
                signupID,
                commentID
            )
        )
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupComment)
