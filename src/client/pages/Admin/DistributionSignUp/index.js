import React, { Component } from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'

import DistributionSignUpList from './DistributionSignupList'
import DistributionSignUp from './DistributionSignUp'
import s from './DistributionSignUp.scss'

class DistributionSignupsPage extends Component {
    render() {
        const cx = classnames(s.container)
        return (
            <div className={cx}>
                <Helmet title="Distribution Signups" />
                <div className="row h-100">
                    <div className="col-md-3">
                        <DistributionSignUpList />
                    </div>
                    <div className="col-md-9">
                        <DistributionSignUp />
                    </div>
                </div>
            </div>
        )
    }
}

export default DistributionSignupsPage
