import React from 'react'
import classnames from 'classnames'

export const RoadmapItem = ({ title, intermediate, status, date, index }) => (
    <div
        className={classnames('milestone-item', {
            'is-done': status === 'done',
            'is-active': status === 'active',
            'is-pending': status === 'pending'
        })}>
        <div className="milestone-inner">
            <div className="milestone-count">{index + 1}</div>
            <div className="milestone-title">{title}</div>
            {intermediate && (
                <div className={`milestone-progress i-${index}`} />
            )}
        </div>
        <div className="milestone-stamp">{date}</div>
    </div>
)

const RoadmapLadder = ({ list = [] }) => {
    return (
        <div className="milestone-ladder mt-2">
            {list.map((item, index) => {
                const wrapperClass = classnames('milestone-item-wrapper', {
                    'in-right': index % 2
                })
                return (
                    <div className={wrapperClass} key={index}>
                        <RoadmapItem
                            index={index}
                            status={item.status}
                            date={item.date}
                            title={item.title}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default RoadmapLadder
