import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import Dialog from 'components/ui/Dialog'

import { Link, Redirect } from 'react-router-dom'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import TwitterLogin from 'react-twitter-auth'

import { store, saveLocalState } from 'store'
import { actions as authActions } from 'store/Auth'
import Auth from 'utils/authHelpers'

import TextField from 'components/ui/TextField'
import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'
import FacebookLogin from 'components/FacebookLogin'
import GoogleLogin from 'components/GoogleLogin'

import s from './SignUp.scss'

class LoginDialog extends Component {
    state = {
        inputValues: {
            username: '',
            password: '',
            rememberMe: false
        },
        errorText: {
            username: '',
            password: '',
            nonField: ''
        },
        shouldRedirect: false,
        redirectToOrigin: false,
        email: '',
        emailVerificationRequired: false,
        redirectURL: '',
        uuid: ''
    }

    closeLoginModal = () => {
        const { pathname, hash } = this.props.location
        this.props.navigate(pathname + (hash || '').replace('#!login', ''))
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    toggleRememberMe = () => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                rememberMe: !prevState.inputValues.rememberMe
            }
        }))
    }

    onLoginClick = e => {
        e.preventDefault()
        const { username, password, rememberMe } = this.state.inputValues
        const login = Auth.login(username, password, rememberMe)
        login
            .then(responseData => {
                if (responseData.access_token) {
                    if (
                        responseData.email_verification === 'mandatory' &&
                        !responseData.email_verified
                    ) {
                        this.setState({
                            email: get(responseData, 'email', ''),
                            emailVerificationRequired: true
                        })
                    } else {
                        store.dispatch(
                            authActions.authenticateUser(
                                responseData.access_token,
                                responseData.email_verification,
                                responseData.email_verified,
                                responseData.expires_in
                            )
                        )
                        if (rememberMe) {
                            saveLocalState(store.getState())
                        }
                        this.setState({
                            shouldRedirect: true,
                            redirectToOrigin: true
                        })
                    }
                } else if (responseData.two_factor_enabled) {
                    this.setState({
                        shouldRedirect: true,
                        redirectURL: '/twofactor/',
                        uuid: responseData.uuid
                    })
                } else {
                    this.setState({
                        errorText: {
                            username: get(responseData, 'username', ''),
                            password: get(responseData, 'password', ''),
                            nonField: get(responseData, 'non_field_errors', '')
                        }
                    })
                }
            })
            .catch(err => {
                this.setState(prevState => ({
                    errorText: {
                        ...prevState.errorText,
                        nonField: [err]
                    }
                }))
            })
    }

    handleSocialLoginResponse = responseData => {
        if (responseData.access_token) {
            if (responseData.email_exist) {
                if (
                    responseData.email_verification === 'mandatory' &&
                    !responseData.email_verified
                ) {
                    this.setState({
                        email: get(responseData, 'email', ''),
                        emailVerificationRequired: true
                    })
                } else {
                    this.props.authenticateUser(
                        responseData.access_token,
                        responseData.email_verification,
                        responseData.email_verified,
                        responseData.expires_in
                    )
                    this.setState({
                        shouldRedirect: true,
                        redirectToOrigin: true
                    })
                    saveLocalState(store.getState())
                }
            } else {
                this.setState({
                    shouldRedirect: true,
                    redirectURL: '/addemail/'
                })
            }
        } else if (responseData.two_factor_enabled) {
            this.setState({
                shouldRedirect: true,
                redirectURL: '/twofactor/',
                uuid: responseData.uuid
            })
        } else {
            this.setState({
                errorText: {
                    nonField: get(responseData, 'non_field_errors', '')
                }
            })
        }
    }

    handleSocialLogin = (token, backend) => {
        const convertToken = Auth.convertToken(token, backend)
        convertToken
            .then(responseData => {
                this.handleSocialLoginResponse(responseData)
            })
            .catch(err => {
                this.setState(prevState => ({
                    errorText: {
                        ...prevState.errorText,
                        nonField: get(err, 'non_field_errors', '')
                    }
                }))
            })
    }

    handleTwitterLogin = res => {
        if (res.status === 200) {
            res.json().then(data => {
                this.handleSocialLoginResponse(data)
            })
        } else {
            res.json().then(data => {
                this.setState(prevState => ({
                    errorText: {
                        ...prevState.errorText,
                        nonField: get(data, 'non_field_errors', '')
                    }
                }))
            })
        }
    }

    render() {
        const cx = classnames(s.loginDialog, 'login-dialog')
        const { originURL } = this.props.location.state || {
            originURL: '/profile'
        }
        const twitterLoginUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000/api/v1/auth/twitter/login/'
                : '/api/v1/auth/twitter/login/'
        const twitterRequestTokenUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000/api/v1/auth/twitter/getrequesttoken/'
                : '/api/v1/auth/twitter/getrequesttoken/'

        return this.state.shouldRedirect ? (
            this.state.redirectToOrigin ? (
                <Redirect to={originURL} />
            ) : (
                    <Redirect
                        to={{
                            pathname: this.state.redirectURL,
                            state: {
                                rememberMe: this.state.inputValues.rememberMe,
                                uuid: this.state.uuid,
                                redirectURL: originURL
                            }
                        }}
                    />
                )
        ) : (
                <Dialog
                    className={cx}
                    isOpen={true}
                    title="Welcome Back"
                    onRequestClose={this.closeLoginModal}>
                    <form onSubmit={this.onLoginClick}>
                        <TextField
                            id="username"
                            label="Username"
                            className="mb-3"
                            icon={<i className="material-icons">person</i>}
                            value={this.state.inputValues.username}
                            onChange={this.onInputChange}
                            errorState={
                                this.state.errorText.username.length
                                    ? this.state.errorText.username
                                    : null
                            }
                        />
                        <EnhancedPasswordField
                            id="password"
                            label="Password"
                            className="mb-3"
                            icon={<i className="material-icons">lock_outline</i>}
                            value={this.state.inputValues.password}
                            onChange={this.onInputChange}
                            errorState={
                                this.state.errorText.password.length
                                    ? this.state.errorText.password
                                    : null
                            }
                        />
                        {this.state.errorText.nonField.length > 0 && (
                            <div className="well mb-2 error-div">
                                {this.state.errorText.nonField.map((x, i) => (
                                    <p key={i}>{x}</p>
                                ))}
                            </div>
                        )}
                        {!!this.state.emailVerificationRequired && (
                            <div className="well mb-2 error-div">
                                Please verify your email id, We have sent an email
                            containing verification url at {this.state.email}
                            </div>
                        )}
                        <button
                            className="btn btn-dark btn-block"
                            onClick={this.onLoginClick}>
                            SUBMIT
                    </button>
                    </form>
                    <div className="row">
                        <div className="col-md-6 mt-3 flex-horizontal align-items-center">
                            <input
                                name="remember_me_check"
                                type="checkbox"
                                checked={this.state.inputValues.rememberMe}
                                // onClick={this.toggleRememberMe}
                                onChange={this.toggleRememberMe}
                            />
                            <label htmlFor="remember_me_check"> Remember Me </label>
                        </div>
                        <div className="col-md-6 mt-3 text-right">
                            <Link
                                to={{
                                    pathname: 'resetpassword',
                                    state: { fromLogin: true }
                                }}
                                className="font-weight-bold text-dark forgot-password-link">
                                {' '}
                                Forgot Password{' '}
                            </Link>
                        </div>
                    </div>
                    <div className="well text-center mt-3">
                        <p> or login with </p>
                        <ul className="list-inline social-login-list">
                            <li className="list-inline-item">
                                <GoogleLogin
                                    tag="div"
                                    handleGoogleLogin={this.handleSocialLogin}
                                />
                            </li>
                            <li className="list-inline-item">
                                <FacebookLogin
                                    tag="div"
                                    handleFacebookLogin={this.handleSocialLogin}
                                />
                            </li>
                            <li className="list-inline-item">
                                <TwitterLogin
                                    tag="div"
                                    loginUrl={twitterLoginUrl}
                                    requestTokenUrl={twitterRequestTokenUrl}
                                    onSuccess={this.handleTwitterLogin}
                                    onFailure={err => console.log(err)}>
                                    <i className="fa fa-twitter" />
                                </TwitterLogin>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-content text-center">
                        Login with your registered username & password. If you are
                        not registered then
                    <Link className="text-dark font-weight-bold" to="/signup">
                            {' '}
                            Sign Up{' '}
                        </Link>
                        here.
                </div>
                </Dialog>
            )
    }
}

const mapStateToProps = state => ({
    location: state.router.location
})

const mapDispatchToProps = dispatch => ({
    navigate(...args) {
        return dispatch(push(...args))
    },
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
)(LoginDialog)
