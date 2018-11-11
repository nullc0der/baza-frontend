import React, { Component } from 'react'
import BasicCard from '../BasicCard'

import s from './TasksList.scss'

const SAMPLE_TASKS = [
    { id: 1, description: 'Task 1', status: 'pending' },
    { id: 2, description: 'Task 2', status: 'done' },
    { id: 3, description: 'Task 3', status: 'done' },
    { id: 4, description: 'Task 4', status: 'pending' },
    // { id: 5, description: 'Task 5', status: 'pending' },
    // { id: 6, description: 'Task 6', status: 'done' },
    // { id: 7, description: 'Task 7', status: 'pending' },
    // { id: 8, description: 'Task 8', status: 'pending' }
]

class TasksList extends Component {
    renderOneTask = (task, index) => {
        const status = task.status === 'done' ? 'badge-success' : 'badge-warning'
        return (
            <div className='task-item' key={task.id}>
                <div className='task-description'>{index + 1}. {task.description}</div>
                <div className={`task-status badge badge-pill ${status}`}>
                    {task.status === 'done' ? 'Done' : 'Pending'}
                </div>
            </div>
        )
    }

    render() {
        return (
            <BasicCard title='Tasks List' className={s.container}>
                {SAMPLE_TASKS.map(this.renderOneTask)}
            </BasicCard>
        )
    }
}

export default TasksList
