import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'components/Avatar'
import moment from 'moment'

import { actions as distributionSignupStaffSideActions } from 'store/DistributionSignUpStaffSide'
import { CardContent } from 'components/ui/CardWithTabs'

class ActivityLog extends Component {
    componentDidMount() {
        if (this.props.selectedID) {
            this.props.fetchActivityLogs(this.props.selectedID)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedID !== this.props.selectedID) {
            this.props.fetchActivityLogs(this.props.selectedID)
        }
    }

    render() {
        const { signupActivityLogs } = this.props

        return (
            <CardContent>
                <div className="activity-header">
                    <h6>
                        <span>Activities</span>
                    </h6>
                </div>
                <div className="activity-logs">
                    {!!signupActivityLogs.length &&
                        signupActivityLogs.map((x, i) => (
                            <div className="activity" key={i}>
                                <div className="flex-horizontal activity-info align-items-center">
                                    <Avatar
                                        className="avatar-image"
                                        size={18}
                                        otherProfile={{
                                            username: x.created_by.username,
                                            profile_photo:
                                                x.created_by.user_image_url,
                                            default_avatar_color:
                                                x.created_by.user_avatar_color
                                        }}
                                        own={false}
                                    />
                                    <span className="username">
                                        {x.created_by.fullname}
                                    </span>
                                    <div className="flex-1" />
                                    <div className="timestamp">
                                        {moment(x.created_on).format(
                                            'MMMM Do YYYY, h:mm a'
                                        )}
                                    </div>
                                </div>
                                <div className="message">
                                    {x.message}{' '}
                                    {!!x.is_assignment_activity &&
                                        x.related_user.fullname}
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    selectedID: state.DistributionSignUpStaffSide.selectedID,
    signupActivityLogs: state.DistributionSignUpStaffSide.signupActivityLogs
})

const mapDispatchToProps = dispach => ({
    fetchActivityLogs(id) {
        return dispach(
            distributionSignupStaffSideActions.fetchSignupActivityLogs(id)
        )
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityLog)
