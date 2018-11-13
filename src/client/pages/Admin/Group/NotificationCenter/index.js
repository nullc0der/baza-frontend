import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import WebSocketWrapper from 'components/WebSocketWrapper'

import NotificationItem from './NotificationItem'

import c from './NotificationCenter.scss'

import { actions as groupActions } from 'store/Group'
import { joinRequestAction } from 'api/group'

class NotificationCenter extends Component {
    state = {
        activeNode: null
    }

    componentDidMount() {
        this.props.loadNotifications(this.props.groupID)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.groupID !== this.props.groupID) {
            this.props.loadNotifications(this.props.groupID)
        }
    }

    acceptDenyJoinRequest = (notificationID, requestID, accept) => {
        const { groupID } = this.props
        joinRequestAction(groupID, {
            request_id: requestID,
            accept: accept
        }).then(res => {
            if (accept) {
                this.props.addGroupMember(res.data)
            }
            this.props.removeMyNotification(notificationID)
        })
    }

    setNotificationRead = notificationID => {
        this.props
            .setNotificationRead(this.props.groupID, {
                id: notificationID
            })
            .then(res => this.props.removeMyNotification(notificationID))
    }

    setActiveNode = id => {
        this.setState({
            activeNode: id
        })
    }

    onWebSocketData = data => {
        const { message } = data
        if (message.group_id === Number(this.props.groupID)) {
            this.props.receivedWebsocketNotification(message.notification)
        }
    }

    render() {
        const { className, notifications } = this.props

        const cx = classnames(className, c.container, 'flex-vertical')

        return (
            <div className={cx}>
                <div className="nc-header">Notification Center</div>
                <div className="nc-list flex-1 scroll-y">
                    {notifications.map((x, i) => (
                        <NotificationItem
                            key={i}
                            notification={x}
                            isActive={this.state.activeNode === x.id}
                            setActiveNode={this.setActiveNode}
                            acceptDenyJoinRequest={this.acceptDenyJoinRequest}
                            setNotificationRead={this.setNotificationRead}
                            initChat={this.chatButtonClicked}
                        />
                    ))}
                </div>
                <WebSocketWrapper
                    url="/ws/groupnotifications/"
                    onWebSocketData={this.onWebSocketData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    notifications: state.Group.myNotifications
})

const mapDispatchToProps = dispatch => ({
    addGroupMember: member => dispatch(groupActions.addGroupMember(member)),
    loadNotifications: groupID =>
        dispatch(groupActions.fetchGroupMyNotifications(groupID)),
    setNotificationRead: (groupID, data) =>
        dispatch(groupActions.setReadGroupMyNotification(groupID, data)),
    removeMyNotification: myNotificationID =>
        dispatch(groupActions.removeMyNotification(myNotificationID)),
    receivedWebsocketNotification: myNotification =>
        dispatch(groupActions.receivedMyNotificationOnWebsocket(myNotification))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationCenter)
