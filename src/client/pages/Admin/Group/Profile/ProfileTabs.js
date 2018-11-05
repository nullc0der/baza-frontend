import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import {
    Card,
    CardHeader,
    CardHeaderTabs,
    CardBody
} from 'components/ui/CardWithTabs'

import Settings from './Settings'
import Notification from './Notification'
import s from './Profile.scss'

const PROFILE_TABS = [{ label: 'Settings' }, { label: 'Notifications' }]

const GROUP_JOIN_TYPES = [
    { id: 'open', name: 'Open' },
    { id: 'closed', name: 'Closed' },
    { id: 'invite', name: 'Invite Only' },
    { id: 'request', name: 'Request Only' }
]

export default class ProfileTabs extends Component {
    state = {
        selectedTabIndex: 0,
        selectedGroupJoinType: {},
        autoApprovePost: false,
        autoApproveComment: false
    }

    componentDidMount = () => {
        if (!isEmpty(this.props.group)) {
            this.setInputValues()
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.group !== this.props.group) {
            this.setInputValues()
        }
    }

    setInputValues = () => {
        const { group } = this.props
        const selectedGroupJoinType = GROUP_JOIN_TYPES.filter(
            x => x.id === group.join_status
        )
        this.setState({
            selectedGroupJoinType: selectedGroupJoinType.length
                ? selectedGroupJoinType[0]
                : GROUP_JOIN_TYPES[0],
            autoApprovePost: group.auto_approve_post,
            autoApproveComment: group.auto_approve_comment
        })
    }

    onTabClick = (tab, selectedTabIndex) => {
        this.setState({ selectedTabIndex })
    }

    changeSwipeIndex = selectedTabIndex => {
        this.setState({ selectedTabIndex })
    }

    toggleInputs = id => {
        this.setState(
            {
                [id]: !this.state[id]
            },
            () => this.sendData()
        )
    }

    onClickGroupJoinType = data => {
        this.setState(
            {
                selectedGroupJoinType: data
            },
            () => this.sendData()
        )
    }

    sendData = () => {
        const data = new FormData()
        data.append('join_status', this.state.selectedGroupJoinType.id)
        data.append('auto_approve_post', this.state.autoApprovePost)
        data.append('auto_approve_comment', this.state.autoApproveComment)
        this.props.editGroup(this.props.group.id, data)
    }

    render() {
        const { group, className } = this.props
        const cx = classnames(s.profileTabs, className)
        return (
            <Card className={cx}>
                <CardHeader
                    title={group.name}
                    className={`group-type-${group.group_type.toLowerCase()}`}>
                    <CardHeaderTabs
                        onTabClick={this.onTabClick}
                        selectedIndex={this.state.selectedTabIndex}
                        tabs={PROFILE_TABS}
                    />
                </CardHeader>
                <CardBody>
                    <SwipeableViews
                        index={this.state.selectedTabIndex}
                        onChangeIndex={this.changeSwipeIndex}>
                        <Settings
                            selectedGroupJoinType={
                                this.state.selectedGroupJoinType
                            }
                            groupJoinTypes={GROUP_JOIN_TYPES}
                            autoApprovePost={this.state.autoApprovePost}
                            autoApproveComment={this.state.autoApproveComment}
                            toggleInputs={this.toggleInputs}
                            onClickGroupJoinType={this.onClickGroupJoinType}
                            flaggedForDelete={
                                this.props.group.flagged_for_deletion
                            }
                            flaggedForDeleteOn={
                                this.props.group.flagged_for_deletion_on
                            }
                            deleteGroup={() => this.props.deleteGroup(group.id)}
                        />
                        <Notification />
                    </SwipeableViews>
                </CardBody>
            </Card>
        )
    }
}
