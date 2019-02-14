import React, { Component } from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'

import s from './Members.scss'
import MembersManagement from './MembersManagement'
import NotificationCenter from 'pages/Admin/Group/NotificationCenter'

class MembersManagementPage extends Component {
    render() {
        const { className } = this.props

        const cx = classnames(s.container, className, 'flex-horizontal flex-1')

        const managementClass = classnames(s.management, 'flex-1')
        const notificationClass = classnames(s.notifications, 'flex-1')
        return (
            <div className={cx}>
                <Helmet
                    title={`Group | ${this.props.match.params.id} | Members`}
                />
                <MembersManagement
                    className={managementClass}
                    groupID={this.props.match.params.id}
                />
                <div className="boxes-in-right flex-vertical">
                    <NotificationCenter
                        className={notificationClass}
                        groupID={this.props.match.params.id}
                    />
                </div>
            </div>
        )
    }
}

export default MembersManagementPage
