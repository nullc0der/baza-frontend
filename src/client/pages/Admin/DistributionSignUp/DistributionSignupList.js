import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { actions as distributionSignupActions } from 'store/DistributionSignUp'
import s from './DistributionSignUp.scss'

class DistributionSignUpList extends Component {
    componentDidMount() {
        this.props.fetchSignupList()
    }

    render() {
        const cx = classnames(s.signuplist)

        return (
            <div className={cx}>
                <div className="header">Signups</div>
                <div className="list">
                    {this.props.signupList.map((item, i) => (
                        <div
                            key={i}
                            className="item"
                            onClick={() => this.props.setSelectedID(item.id_)}>
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
    signupList: state.DistributionSignUp.signupList
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
