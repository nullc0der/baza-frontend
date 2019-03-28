import React, { Component, Fragment } from 'react'
import classnames from 'classnames'

import Sidebar from './Sidebar'
import ContentView from './ContentView'

import s from './HashTag.scss'
export default class HashTagPage extends Component {
    render() {
        const cx = classnames(s.container)
        const userOnMobile = $(window).width() < 768
        const { goBack } = this.props.history

        return (
            <div className={cx}>
                {!userOnMobile ? (
                    <Fragment>
                        <Sidebar />
                        <ContentView />
                    </Fragment>
                ) : (
                    <div className="row align-items-center">
                        <div className="col-12 text-black-50 text-center">
                            <p>
                                This app is available on desktop browsers only
                            </p>
                            <btn
                                className="btn btn-sm btn-dark"
                                onClick={goBack}>
                                TAKE ME BACK
                            </btn>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
