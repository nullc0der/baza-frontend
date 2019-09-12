import React, { Component } from 'react'

import GroupInviteNotification from './GroupInviteNotification'
import NewSignupNotification from './NewSignupNotification'

class NotificationItem extends Component {
    state = {
        actionButtonsRevealed: false,
        actionsVisible: false
    }

    onRevealActionClick = e => {
        this.setState(prevState => ({
            actionButtonsRevealed: !prevState.actionButtonsRevealed,
            actionsVisible: false
        }))
    }

    onSwipeLeft = e => {
        this.setState(
            {
                actionButtonsRevealed: true,
                actionsVisible: true
            },
            () => this.props.setActiveNode(this.props.notification.id)
        )
    }

    onSwipeRight = e => {
        this.setState({
            actionButtonsRevealed: false,
            actionsVisible: false
        })
    }

    render() {
        const {
            notification,
            isActive,
            acceptDenyInvite,
            navigateTo
        } = this.props
        const { actionsVisible, actionButtonsRevealed } = this.state

        switch (notification.type) {
            case 'groupinvite':
                return (
                    <GroupInviteNotification
                        isActive={isActive}
                        notification={notification}
                        actionButtonsRevealed={actionButtonsRevealed}
                        actionsVisible={actionsVisible}
                        onSwipeLeft={this.onSwipeLeft}
                        onSwipeRight={this.onSwipeRight}
                        onRevealActionClick={this.onRevealActionClick}
                        acceptDenyInvite={acceptDenyInvite}
                    />
                )
            case 'distribution_signup':
                return (
                    <NewSignupNotification
                        isActive={isActive}
                        notification={notification}
                        onItemClick={() => navigateTo('/distribution-signup')}
                    />
                )
            default:
                return null
        }
    }
}

export default NotificationItem
