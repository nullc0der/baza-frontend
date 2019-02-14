import React, { Component } from 'react'
import classnames from 'classnames'

import Sidebar from './Sidebar'
import ContentView from './ContentView'

import s from './HashTag.scss'
export default class HashTagPage extends Component {
    render() {
        const cx = classnames(s.container)
        return (
            <div className={cx}>
                <Sidebar />
                <ContentView />
            </div>
        )
    }
}
