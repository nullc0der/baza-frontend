import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import union from 'lodash/union'

import { actions as distributionSignupActions } from 'store/DistributionSignUp'
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
            <div className={cx}>
                <div className="header">Signups</div>
                <div className="list">
                    {this.state.signupList.map((item, i) => (
                        <div
                            key={i}
                            className={`item ${item.id_ ===
                                this.props.selectedID && 'is-active'}`}
                            onClick={e => this.onSidebarItemClick(e, item.id_)}>
                            <div className="avatar" />
                            <div className="info">
                                <div className="username">{item.username}</div>
                                <div className="status text-capitalize">
                                    {item.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    signupList: state.DistributionSignUp.signupList,
    selectedID: state.DistributionSignUp.selectedID,
    searchString: state.Common.subHeaderSearchString,
    filters: state.Common.subHeaderFilters
})

const mapDispatchProps = dispatch => ({
    fetchSignupList: () => {
        dispatch(distributionSignupActions.fetchSignupsList())
    },
    setSelectedID: id => {
        dispatch(distributionSignupActions.setSelectedID(id))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchProps
)(DistributionSignUpList)
