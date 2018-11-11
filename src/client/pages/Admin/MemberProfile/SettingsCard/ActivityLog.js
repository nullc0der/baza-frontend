import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as userProfileActions } from 'store/UserProfile'

import s from '../MemberProfile.scss'
import Loader from 'components/ui/Loader';

const debug = require('debug')('baza:member-profile:activity-log')

class ActivityLog extends Component {
    componentDidMount = () => {

    }

    componentWillReceiveProps = (nextProps) => {
        const { list } = this.props
        if (list.length === 0 && nextProps.visible && !this.props.visble) {
            this.fetchActivityLog()
        }
    }

    componentDidUpdate = () => {
        if (this.props.visible) {
            this.fixHeight()
        }
    }

    fetchActivityLog = () => {
        if (this.isFetching) {
            return
        }
        this.isFetching = true
        debug('fetching logs')
        this.props.fetchActivityLog()
            .then(() => {
                this.isFetching = false
            }).catch(() => {
                this.isFetching = false
            })
    }

    fixHeight = () => {
        const parentBounds = this.container.parentElement.getBoundingClientRect()
        this.container.style.height = parentBounds.height + 'px'
        debug('fixed height')
    }

    renderOneLog = (item, index) => {
        return (
            <div className='activity-item' key={item.id}>
                <div className='activity-description'>{item.description}</div>
                <div className='activity-time'>{item.timestamp}</div>
            </div>
        )
    }
    render() {
        const { list, isLoading } = this.props
        return (
            <div className={s.activityLog} ref={node => { this.container = node }}>
                {isLoading
                    ? <Loader />
                    : list.map(this.renderOneLog)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.UserProfile.activityLog.isLoading,
        list: state.UserProfile.activityLog.list || []
    }
}

const mapDispatchToProps = dispatch => ({
    fetchActivityLog() {
        return dispatch(userProfileActions.fetchActivityLog())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityLog)
