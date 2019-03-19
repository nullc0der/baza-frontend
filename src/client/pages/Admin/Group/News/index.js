import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import isEmpty from 'lodash/isEmpty'

import { isMember } from 'pages/Admin/Group/utils'

import NotificationCenter from 'pages/Admin/Group/NotificationCenter'
import GroupCard from 'pages/Admin/Group/GroupCard'

import { actions as groupActions } from 'store/Group'

import s from './NewsPage.scss'
import NewsSection from './NewsSection'

class NewsPage extends Component {
    state = {
        group: {}
    }

    componentDidMount = () => {
        if (this.props.match.params.id) {
            this.loadGroupData(this.props.match.params.id)
            this.props.changeLastSelectedGroup(this.props.match.params.id)
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.groups !== this.props.groups) {
            this.loadGroupData(this.props.match.params.id)
        }
    }

    loadGroupData = groupID => {
        const group = this.props.groups.filter(x => x.id === Number(groupID))
        if (group.length) {
            this.setState({
                group: group[0]
            })
        } else {
            this.props.fetchGroup(groupID)
        }
    }

    render() {
        const { className } = this.props
        const { group } = this.state

        const cx = classnames(
            s.container,
            className,
            'flex-horizontal scroll-y'
        )
        const notificationClass = classnames(s.notifications, 'flex-1')
        const newsSectionClass = classnames(s.newsSection, 'flex-1')
        return (
            !isEmpty(group) &&
            (isMember(group.user_permission_set) ? (
                <div className={cx}>
                    <Helmet title={`Group | ${group.id} | News`} />
                    <NewsSection
                        className={newsSectionClass}
                        groupID={this.props.match.params.id}
                        group={group}
                    />
                    <div className="boxes-in-right flex-vertical">
                        <GroupCard
                            id={group.id}
                            name={group.name}
                            category={group.group_type}
                            headerURL={group.header_image_url}
                            logoURL={group.logo_url}
                            description={group.about}
                            longDescription={group.long_about}
                            members={group.members.length}
                            subscribers={group.subscribers.length}
                        />
                        <NotificationCenter
                            className={notificationClass}
                            groupID={this.props.match.params.id}
                        />
                    </div>
                </div>
            ) : (
                <Redirect to="/403" />
            ))
        )
    }
}

const mapStateToProps = state => ({
    groups: state.Group.groups
})

const mapDispatchToProps = dispatch => ({
    fetchGroup: groupID => dispatch(groupActions.fetchGroup(groupID)),
    changeLastSelectedGroup: groupID =>
        dispatch(groupActions.changeLastSelectedGroup(groupID))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsPage)
