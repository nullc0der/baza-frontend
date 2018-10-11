import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'

import Auth from 'utils/authHelpers'

import { store, saveLocalState } from 'store'
import { actions as authActions } from 'store/Auth'
import Header from 'components/Header'
import TextField from 'components/ui/TextField'

import s from './SignUp.scss'

class TwoFactorPage extends Component {
    state = {
        inputValues: {
            code: ''
        },
        errorText: {
            code: null,
            nonField: null
        },
        shouldRedirect: false
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onTwoFactorSubmit = () => {
        const locationState = this.props.location.state
        Auth.twoFactorLogin(this.state.inputValues.code, locationState.uuid)
            .then(responseData => {
                store.dispatch(
                    authActions.authenticateUser(
                        responseData.access_token,
                        responseData.email_verification,
                        responseData.email_verified,
                        responseData.expires_in
                    )
                )
                if (locationState.rememberMe || responseData.from_social) {
                    saveLocalState(store.getState())
                }
                this.setState({
                    shouldRedirect: true
                })
            })
            .catch(responseData => {
                this.setState({
                    errorText: {
                        code: get(responseData, 'code', null),
                        nonField: get(responseData, 'non_field_errors', null)
                    }
                })
            })
    }

    render() {
        const cx = classnames(s.twoFactorPage, 'two-factor-page')
        return this.state.shouldRedirect ? (
            <Redirect to={this.props.location.state.redirectURL} />
        ) : (
            <div className={cx}>
                <Header invert InCenter />
                <div className="container-fluid page-layer two-factor-page-container">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-sm-12 col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        Enter your two factor code or one of
                                        your recovery code below
                                    </div>
                                    <div className="card-text two-factor-section">
                                        <TextField
                                            id="code"
                                            label="Code"
                                            className="mb-3"
                                            value={this.state.inputValues.code}
                                            onChange={this.onInputChange}
                                            errorState={
                                                this.state.errorText.code
                                            }
                                        />
                                        {!!this.state.errorText.nonField &&
                                            this.state.errorText.nonField.map(
                                                (x, i) => (
                                                    <p
                                                        className="text-danger"
                                                        key={i}>
                                                        {x}
                                                    </p>
                                                )
                                            )}
                                        <button
                                            className="btn btn-dark btn-block"
                                            onClick={this.onTwoFactorSubmit}>
                                            SUBMIT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    location: state.router.location
})

const mapDispatchToProps = dispatch => ({
    authenticateUser(authToken, emailVerification, emailVerified, expiresIn) {
        return dispatch(
            authActions.authenticateUser(
                authToken,
                emailVerification,
                emailVerified,
                expiresIn
            )
        )
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TwoFactorPage)
