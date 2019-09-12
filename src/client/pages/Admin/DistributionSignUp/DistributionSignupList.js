import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import union from 'lodash/union'

import Avatar from 'components/Avatar'

import { actions as distributionSignupStaffSideActions } from 'store/DistributionSignUpStaffSide'
import s from './DistributionSignUp.scss'

class DistributionSignUpList extends Component {
    state = {
        signupList: [],
        newestToOldest: true
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
            x.fullname.toLowerCase().startsWith(searchString.toLowerCase())
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
        if (this.state.newestToOldest) {
            finalList.sort((a, b) =>
                a.id_ < b.id_ ? 1 : b.id_ < a.id_ ? -1 : 0
            )
        } else {
            finalList.sort((a, b) =>
                a.id_ > b.id_ ? 1 : b.id_ > a.id_ ? -1 : 0
            )
        }
        this.setState({
            signupList: finalList
        })
    }

    onSidebarItemClick = (e, id) => {
        this.props.setSelectedID(id)
    }

    toggleSignupOrder = () => {
        let { signupList } = this.state
        if (this.state.newestToOldest) {
            signupList.sort((a, b) =>
                a.id_ > b.id_ ? 1 : b.id_ > a.id_ ? -1 : 0
            )
        } else {
            signupList.sort((a, b) =>
                a.id_ < b.id_ ? 1 : b.id_ < a.id_ ? -1 : 0
            )
        }
        this.setState({
            newestToOldest: !this.state.newestToOldest,
            signupList: signupList
        })
    }

    render() {
        const cx = classnames(s.signuplist)

        return (
            <div className={cx}>
                <div className="header">
                    Application List
                    <div
                        className="sort-button"
                        onClick={this.toggleSignupOrder}>
                        <i
                            className={`fas fa-sort-amount-${
                                this.state.newestToOldest ? 'down' : 'up'
                            }`}></i>
                    </div>
                </div>
                <div className="list">
                    {this.state.signupList.map((item, i) => (
                        <div
                            key={i}
                            className={`${
                                item.id_ === this.props.selectedID
                                    ? 'item is-active'
                                    : 'item'
                            }`}
                            onClick={e => this.onSidebarItemClick(e, item.id_)}>
                            <Avatar
                                className="avatar-image"
                                size={40}
                                otherProfile={{
                                    username: item.username,
                                    profile_photo: item.user_image_url,
                                    default_avatar_color: item.user_avatar_color
                                }}
                                own={false}
                            />
                            <div className="info">
                                <div className="username">{item.fullname}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    signupList: state.DistributionSignUpStaffSide.signups,
    selectedID: state.DistributionSignUpStaffSide.selectedID,
    searchString: state.Common.subHeaderSearchString,
    filters: state.Common.subHeaderFilters
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
