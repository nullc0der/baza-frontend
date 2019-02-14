import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicCard from '../BasicCard'
import WebSocketWrapper from 'components/WebSocketWrapper'

import { actions as profileActions } from 'store/UserProfile'

import s from './TasksList.scss'

class TasksList extends Component {
    updateUserTasks = data => {
        this.props.updateUserTasks(data.message)
    }

    renderOneTask = (task, index) => {
        const status =
            task.status === 'done' ? 'badge-success' : 'badge-warning'
        const statusText = task.status === 'done' ? 'Done' : 'Pending '
        return (
            <div className="task-item" key={index}>
                <div className="task-description">
                    {task.id}. {task.description}
                </div>
                {task.status === 'done' ? (
                    <div className={`task-status badge badge-pill ${status}`}>
                        {statusText}
                    </div>
                ) : (
                    <a
                        className={`task-status badge badge-pill ${status}`}
                        href={task.href}>
                        {statusText}
                        <i className="fa fa-arrow-right" />
                    </a>
                )}
            </div>
        )
    }

    render() {
        return (
            <BasicCard title="Validation Tasks" className={s.container}>
                {this.props.tasks.map(this.renderOneTask)}
                <WebSocketWrapper
                    url="/ws/profiletasks/"
                    onWebSocketData={this.updateUserTasks}
                />
            </BasicCard>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.UserProfile.tasks
})

const mapDispatchToProps = dispatch => ({
    updateUserTasks: message =>
        dispatch(profileActions.updateUserTasks(message))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksList)
