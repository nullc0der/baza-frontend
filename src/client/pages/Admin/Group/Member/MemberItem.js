import React, { Component } from 'react'
import classnames from 'classnames'
import find from 'lodash/find'
import Avatar from 'components/Avatar'
import chunk from 'lodash/chunk'
import Dialog from 'components/ui/Dialog'

class MemberItem extends Component {
    state = {
        subscribeBoxIsOpen: false
    }

    toggleGroup = group => {
        this.props.toggleSubscribedGroup(
            this.props.memberId,
            this.props.subscribed_groups,
            group
        )
    }

    renderGroup = (group, i) => {
        const { subscribedGroups = [] } = this.props
        const cx = classnames(
            `subscribe-box-group group-item group-id-${group.id}`,
            {
                'is-inactive': subscribedGroups.indexOf(group.id) === -1
            }
        )
        return (
            <div key={i} onClick={e => this.toggleGroup(group)} className={cx}>
                <div className="group-icon">
                    {group.icon.type === 'material' ? (
                        <i className="material-icons"> {group.icon.name} </i>
                    ) : (
                        <i className={`fa fa-${group.icon.name}`} />
                    )}
                </div>
                <div className="group-name"> {group.name} </div>
            </div>
        )
    }

    renderSubscribedGroup = (group_id, i) => {
        const { groups = [] } = this.props
        const g = find(groups, { id: group_id }) || {}

        const name = g.name || ''
        const icon = g.icon || {}

        return (
            <div
                key={i}
                className={`group-item flex-horizontal a-center j-center group-id-${
                    g.id
                }`}
                title={name}>
                {icon.type === 'material' ? (
                    <i className="material-icons"> {icon.name} </i>
                ) : (
                    <i className={`fa fa-${icon.name}`} />
                )}
            </div>
        )
    }

    toggleSubscribeBox = () => {
        this.setState({
            subscribeBoxIsOpen: !this.state.subscribeBoxIsOpen
        })
    }

    render() {
        const {
            className,
            userName = '',
            fullName = '',
            avatarUrl = '',
            avatarColor = '',
            subscribedGroups = [],
            groups = []
        } = this.props

        const cx = classnames(
            className,
            'ui-member-item',
            'flex-horizontal j-between'
        )

        const gchunks = chunk(groups, 4)

        return (
            <div className={cx}>
                <Dialog
                    id="edit-group-subscriptions"
                    onRequestClose={this.toggleSubscribeBox}
                    isOpen={this.state.subscribeBoxIsOpen}
                    title={false}>
                    <div className="subscribe-box">
                        {gchunks.map((x, i) => (
                            <div
                                key={i}
                                className={`box flex-horizontal a-center box-${i +
                                    1}`}>
                                {x.map((y, j) =>
                                    this.renderGroup(
                                        y,
                                        i.toString() + j.toString()
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </Dialog>
                <div
                    onClick={this.toggleSubscribeBox}
                    className="flex-horizontal a-center flex-1">
                    <div className="in-left flex-horizontal a-center">
                        <Avatar
                            className="avatar-image"
                            own={false}
                            otherProfile={{
                                username: userName,
                                profile_photo: avatarUrl,
                                default_avatar_color: avatarColor
                            }}
                        />
                        <div className="details">
                            <div className="name">
                                {' '}
                                {fullName || userName}{' '}
                                <span className="username">@{userName}</span>{' '}
                            </div>
                            {/* <div
                                className={`status is-${
                                    isOnline ? 'online' : 'offline'
                                }`}>
                                {' '}
                                {isOnline ? 'Online' : 'Offline'}{' '}
                            </div> */}
                        </div>
                    </div>
                    <div className="in-right flex-horizontal flex-1">
                        <div className="subscribed-groups flex-horizontal-reverse a-center">
                            {!subscribedGroups.length ? (
                                <div className="group-item flex-horizontal a-center j-center">
                                    <i className="material-icons">add_circle</i>
                                </div>
                            ) : (
                                subscribedGroups.map(this.renderSubscribedGroup)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemberItem
