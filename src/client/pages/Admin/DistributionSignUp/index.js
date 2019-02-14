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
                <DistributionSignUpList />
                <DistributionSignUp />
            </div>
        )
    }
}

export default DistributionSignupsPage
