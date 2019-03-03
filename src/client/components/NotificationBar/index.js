import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import s from './NotificationBar.scss'

class NotificationBar extends Component {
    render() {
        const { className } = this.props
        const cx = classnames(
            s.container,
            'flex-horizontal',
            'a-center',
            className
        )
        return (
            <div className={cx}>
                <Link to="#!baza-registration">
                    Register for baza distribution or check your application
                    status <i className="fa fa-arrow-right" />
                </Link>
            </div>
        )
    }
}

export default NotificationBar
