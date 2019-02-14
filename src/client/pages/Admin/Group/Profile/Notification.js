import React, { Component } from 'react'
import Linkify from 'react-linkify'
import { connect } from 'react-redux'
import get from 'lodash/get'

import TextField from 'components/ui/TextField'
import { CardContent } from 'components/ui/CardWithTabs'
import { actions as groupActions } from 'store/Group'

class GroupNotification extends Component {
    state = {
        notificationInputValue: '',
        notificationInputError: null,
        editingNotification: null
    }

    componentDidMount = () => {
        this.props.fetchNotifications(this.props.groupID)
    }

    onChangeNotificationInput = (id, value) => {
        this.setState({
            notificationInputValue: value,
            notificationInputError: null
        })
    }

    onClickSubmit = () => {
        if (!this.state.editingNotification) {
            this.props
                .createNotification(this.props.groupID, {
                    notification: this.state.notificationInputValue
                })
                .then(res => {
                    this.setState({
                        notificationInputValue: '',
                        notificationInputError: null
                    })
                })
                .catch(err => {
                    this.setState({
                        notificationInputError: get(err, 'notification', null)
                    })
                })
        } else {
            this.props
                .updateNotification(this.props.groupID, {
                    id: this.state.editingNotification,
                    notification: this.state.notificationInputValue
                })
                .then(res => {
                    this.setState({
                        notificationInputValue: '',
                        notificationInputError: null,
                        editingNotification: null
                    })
                })
                .catch(err => {
                    this.setState({
                        notificationInputError: get(err, 'notification', null)
                    })
                })
        }
    }

    deleteNotification = notificationID => {
        this.props.deleteNotification(this.props.groupID, {
            id: notificationID
        })
    }

    onEditClick = (notificationID, content) => {
        this.setState({
            editingNotification: notificationID,
            notificationInputValue: content
        })
    }

    toggleImportant = (notificationID, notification, state) => {
        const data = {
            id: notificationID,
            notification: notification,
            is_important: state
        }
        this.props.updateNotification(this.props.groupID, data)
    }

    discardEdit = () => {
        this.setState({
            editingNotification: null,
            notificationInputValue: ''
        })
    }

    renderOneNotification = (notification, i) => (
        <div className="notification" key={i}>
            <span>{new Date(notification.created_on).toLocaleString()}</span>
            <p>
                <Linkify>{notification.notification}</Linkify>
            </p>
            <div className="actions">
                <i
                    className="material-icons"
                    title="important"
                    onClick={() =>
                        this.toggleImportant(
                            notification.id,
                            notification.notification,
                            notification.is_important ? false : true
                        )
                    }>
                    {notification.is_important ? 'star' : 'star_border'}
                </i>
                <i
                    className="material-icons"
                    title="edit"
                    onClick={() =>
                        this.onEditClick(
                            notification.id,
                            notification.notification
                        )
                    }>
                    mode_edit
                </i>
                <i
                    className="material-icons"
                    title="delete"
                    onClick={() => this.deleteNotification(notification.id)}>
                    delete
                </i>
            </div>
        </div>
    )
    render() {
        return (
            <CardContent>
                <div className="notifications-section flex-vertical">
                    <div className="notifications flex-1">
                        {this.props.groupNotifications.map(
                            this.renderOneNotification
                        )}
                    </div>
                    <div className="notification-input flex-horizontal">
                        <TextField
                            id="notificationInput"
                            label="Add notification"
                            className="mr-1"
                            value={this.state.notificationInputValue}
                            onChange={this.onChangeNotificationInput}
                            errorState={this.state.notificationInputError}
                        />
                        {this.state.editingNotification && (
                            <button
                                className="btn btn-warning mr-1"
                                onClick={this.discardEdit}>
                                <i className="fa fa-fw fa-times" />
                            </button>
                        )}
                        <button
                            className="btn btn-dark"
                            onClick={this.onClickSubmit}>
                            {this.state.editingNotification ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    groupNotifications: state.Group.groupNotifications
})

const mapDispatchToProps = dispatch => ({
    fetchNotifications: groupID =>
        dispatch(groupActions.fetchGroupNotifications(groupID)),
    createNotification: (groupID, data) =>
        dispatch(groupActions.createGroupNotification(groupID, data)),
    deleteNotification: (groupID, data) =>
        dispatch(groupActions.deleteGroupNotification(groupID, data)),
    updateNotification: (groupID, data) =>
        dispatch(groupActions.editGroupNotification(groupID, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupNotification)
