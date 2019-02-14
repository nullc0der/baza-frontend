import React, { Component } from 'react'
import classnames from 'classnames'

import Auth from 'utils/authHelpers'

import Header from 'components/Header'

import s from './SignUp.scss'

export default class EmailVerification extends Component {
    state = {
        infoText: 'Please wait while we verify your email...'
    }

    componentDidMount = () => {
        const validationKey = this.props.location.pathname.split('/')[2]
        const validateEmail = Auth.validateEmail(validationKey)
        validateEmail
            .then(responseData => {
                this.setState({
                    infoText: responseData.validation_key[0]
                })
            })
            .catch(responseData => {
                this.setState({
                    infoText: responseData.validation_key[0]
                })
            })
    }

    render() {
        const cx = classnames(s.emailVerification, 'emailverification-page')

        return (
            <div className={cx}>
                <Header invert InCenter />
                <div className="container-fluid page-layer px-0 emailverification-container">
                    <div className="row h-100 align-items-center text-center">
                        <div className="col-12">
                            <p>{this.state.infoText}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
