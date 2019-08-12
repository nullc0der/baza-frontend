import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import union from 'lodash/union'
import isEmpty from 'lodash/isEmpty'

import Avatar from 'components/Avatar'

import { isStaff } from 'pages/Admin/Group/utils'

import { actions as distributionSignupStaffSideActions } from 'store/DistributionSignUpStaffSide'
import s from './DistributionSignUp.scss'

class DistributionSignUpList extends Component {
    state = {
        signupList: []
    }

    componentDidMount() {
        this.props.fetchSignupList()
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.signupList !== this.props.signupList ||
            prevProps.searchString !== this.props.searchString ||
            prevProps.filters !== this.props.filters
        ) {
            this.setSignupList(
                this.props.signupList,
                this.props.searchString,
                this.props.filters
            )
        }
    }

    setSignupList = (signupList, searchString, filters) => {
        let finalList = signupList.filter(x =>
            x.username.toLowerCase().startsWith(searchString.toLowerCase())
        )
        const filteredItems = []
        for (const filter of filters) {
            switch (filter) {
                case 'approved':
                    filteredItems.push(
                        finalList.filter(x => x.status === 'approved')
                    )
                    break
                case 'pending':
                    filteredItems.push(
                        finalList.filter(x => x.status === 'pending')
                    )
                    break
                case 'declined':
                    filteredItems.push(
                        finalList.filter(x => x.status === 'declined')
                    )
                    break
                case 'incomplete':
                    filteredItems.push(
                        finalList.filter(x => x.status === 'incomplete')
                    )
                    break
                default:
                    break
            }
        }
        if (filteredItems.length) {
            finalList = union(...filteredItems)
        }
        this.setState({
            signupList: finalList
        })
    }

    onSidebarItemClick = (e, id) => {
        $('.' + s.signupdetails).addClass('is-open')
        this.props.setSelectedID(id)
    }

    render() {
        const cx = classnames(s.signuplist)

        return (
            !isEmpty(this.props.siteOwnerGroup) && (
                <div className={cx}>
                    {isStaff(this.props.siteOwnerGroup.user_permission_set) ? (
                        <Fragment>
                            <div className="header">Application List</div>
                            <div className="list">
                                {this.state.signupList.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`${
                                            item.id_ === this.props.selectedID
                                                ? 'item is-active'
                                                : 'item'
                                        }`}
                                        onClick={e =>
                                            this.onSidebarItemClick(e, item.id_)
                                        }>
                                        <Avatar
                                            className="avatar-image"
                                            size={40}
                                            otherProfile={{
                                                username: item.username,
                                                profile_photo:
                                                    item.user_image_url,
                                                default_avatar_color:
                                                    item.user_avatar_color
                                            }}
                                            own={false}
                                        />
                                        <div className="info">
                                            <div className="username">
                                                {item.fullname}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Fragment>
                    ) : (
                        <Redirect to="/403" />
                    )}
                </div>
            )
        )
    }
}

const mapStateToProps = state => ({
    signupList: state.DistributionSignUpStaffSide.signups,
    selectedID: state.DistributionSignUpStaffSide.selectedID,
    searchString: state.Common.subHeaderSearchString,
    filters: state.Common.subHeaderFilters,
    siteOwnerGroup: state.Group.siteOwnerGroup
})

const mapDispatchProps = dispatch => ({
    fetchSignupList: () => {
        dispatch(distributionSignupStaffSideActions.fetchSignups())
    },
    setSelectedID: id => {
        dispatch(distributionSignupStaffSideActions.setSelectedID(id))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchProps
)(DistributionSignUpList)
