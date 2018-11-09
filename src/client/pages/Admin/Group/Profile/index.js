import React, { Component, Fragment } from 'react'
import isEmpty from 'lodash/isEmpty'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { actions as groupActions } from 'store/Group'

import ProfileCard from './ProfileCard'
import ProfileTabs from './ProfileTabs'

import { isAdmin } from 'pages/Admin/Group/utils'

class GroupProfile extends Component {
    state = {
        groupData: {}
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
                groupData: group[0]
            })
        } else {
            this.props.fetchGroup(groupID)
        }
    }

    render() {
        return (
            <div className="row align-stretch">
                {!isEmpty(this.state.groupData) &&
                    (isAdmin(this.state.groupData.user_permission_set) ? (
                        <Fragment>
                            <div className="col-12 col-md-3">
                                <ProfileCard
                                    group={this.state.groupData}
                                    editGroup={this.props.editGroup}
                                />
                            </div>
                            <div className="col-12 col-md-9 mt-3 mt-md-0 mt-lg-0 mt-xl-0">
                                <ProfileTabs
                                    group={this.state.groupData}
                                    editGroup={this.props.editGroup}
                                    deleteGroup={this.props.deleteGroup}
                                />
                            </div>
                        </Fragment>
                    ) : (
                        <Redirect to="/403" />
                    ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.Group.groups,
    userProfile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchGroup: groupID => dispatch(groupActions.fetchGroup(groupID)),
    editGroup: (groupID, data) =>
        dispatch(groupActions.editGroup(groupID, data)),
    deleteGroup: groupID => dispatch(groupActions.deleteGroup(groupID)),
    changeLastSelectedGroup: groupID =>
        dispatch(groupActions.changeLastSelectedGroup(groupID))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupProfile)
