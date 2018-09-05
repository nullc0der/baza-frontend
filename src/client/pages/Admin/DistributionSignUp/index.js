import React, { Component } from 'react'
import classnames from 'classnames'

import DistributionSignUpList from './DistributionSignupList'
import DistributionSignUp from './DistributionSignUp'
import s from './DistributionSignUp.scss'

class DistributionSignupsPage extends Component {
    render() {
        const cx = classnames(s.container)
        return (
            <div className={cx}>
                <DistributionSignUpList />
                <DistributionSignUp />
            </div>
        )
    }
}

export default DistributionSignupsPage
