import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'
import { Redirect } from 'react-router-dom'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import TwitterLogin from 'react-twitter-auth'

import { store, saveLocalAuthState } from 'store'
import { actions as authActions } from 'store/Auth'
import Auth from 'utils/authHelpers'
import Header from 'components/Header'

import TextField from 'components/ui/TextField'
import Carousel from 'components/ui/Carousel'
import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'
import FacebookLogin from 'components/FacebookLogin'
import GoogleLogin from 'components/GoogleLogin'
import Config from 'utils/config'
import s from './SignUp.scss'

class SignUpPage extends Component {
    state = {
        inputValues: {
            username: '',
            email: '',
            password: '',
            password1: ''
        },
        errorText: {
            username: null,
            email: null,
            password: null,
            password1: null,
            nonField: null
        },
        registerSuccessText: '',
        shouldRedirect: false,
        redirectURL: '',
        uuid: ''
    }

    componentDidMount = () => {
        const checkRegEnabled = Auth.checkRegistrationEnabled()
        checkRegEnabled.then(responseData => {
            if (!responseData.is_registration_enabled) {
                this.setState({
                    registerSuccessText: 'Registration is disabled on this site'
                })
            }
        })
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onRegisterClick = e => {
        e.preventDefault()
        const { username, email, password, password1 } = this.state.inputValues
        const register = Auth.register(username, email, password, password1)
        register
            .then(responseData => {
                if (responseData.is_registration_enabled) {
                    if (responseData.status === 'success') {
                        if (responseData.email_verification === 'mandatory') {
                            this.setState({
                                registerSuccessText:
                                    'Registration was successful.\n' +
                                    'We sent an email to the one provided.\n' +
                                    'Please check your email to verify and continue.\n' +
                                    '\n' +
                                    'Note: Check your spam folder if it is not in your inbox.'
                            })
                        } else {
                            this.setState({
                                registerSuccessText: 'Please login to continue'
                            })
                        }
                    } else {
                        this.setState({
                            errorText: {
                                username: get(responseData, 'username', null),
                                email: get(responseData, 'email', null),
                                password: get(responseData, 'password', null),
                                password1: get(responseData, 'password1', null),
                                nonField: get(
                                    responseData,
                                    'non_field_errors',
                                    null
                                )
                            }
                        })
                    }
                } else {
                    this.setState({
                        registerSuccessText:
                            'Registration is disabled on this site'
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

    handleSocialResponse = responseData => {
        if (responseData.access_token) {
            if (responseData.email_exist) {
                if (
                    responseData.email_verification === 'mandatory' &&
                    !responseData.email_verified
                ) {
                    this.setState({
                        registerSuccessText:
                            'Registration was successful.\n' +
                            'We sent an email to the one provided in your social account.\n' +
                            'Please check your email to verify and continue.\n' +
                            '\n' +
                            'Note: Check your spam folder if it is not in your inbox.'
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
                        redirectURL: '/profile/'
                    })
                    saveLocalAuthState('baza-auth', {
                        Auth: store.getState().Auth
                    })
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
                fromSocial: responseData.from_social,
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
                this.handleSocialResponse(responseData)
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
                this.handleSocialResponse(data)
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
        const cx = classnames(s.container, 'signup-page')
        const twitterLoginUrl = Config.get('API_ROOT') + '/auth/twitter/login/'
        const twitterRequestTokenUrl =
            Config.get('API_ROOT') + '/auth/twitter/getrequesttoken/'
        return this.state.shouldRedirect ? (
            <Redirect
                to={{
                    pathname: this.state.redirectURL,
                    state: {
                        fromSocial: this.state.fromSocial,
                        uuid: this.state.uuid,
                        redirectURL: '/profile'
                    }
                }}
            />
        ) : (
            <div className={cx}>
                <Header invert inCenter />
                <div className="container-fluid page-layer px-0">
                    <div className="row h-100 no-gutters">
                        <div className="col-md-6 signup-container">
                            {!this.state.registerSuccessText ? (
                                <div className="flex-vertical align-items-center justify-content-center text-center p-4">
                                    <h4> Hi There! </h4>
                                    <p>
                                        {' '}
                                        Ready to create your awesome account{' '}
                                    </p>

                                    <form
                                        className="signup-form my-2"
                                        onSubmit={this.onRegisterClick}>
                                        <TextField
                                            id="username"
                                            label="Username"
                                            className="mt-3"
                                            errorState={
                                                this.state.errorText.username
                                            }
                                            onChange={this.onInputChange}
                                            value={
                                                this.state.inputValues.username
                                            }
                                            icon={
                                                <i className="material-icons">
                                                    perm_identity
                                                </i>
                                            }
                                        />
                                        <TextField
                                            id="email"
                                            label="Email"
                                            className="mt-3"
                                            errorState={
                                                this.state.errorText.email
                                            }
                                            onChange={this.onInputChange}
                                            value={this.state.inputValues.email}
                                            icon={
                                                <i className="material-icons">
                                                    email
                                                </i>
                                            }
                                        />
                                        <EnhancedPasswordField
                                            id="password"
                                            label="Password"
                                            className="mt-3"
                                            errorState={
                                                this.state.errorText.password
                                            }
                                            onChange={this.onInputChange}
                                            value={
                                                this.state.inputValues.password
                                            }
                                            icon={
                                                <i className="material-icons">
                                                    lock_outline
                                                </i>
                                            }
                                            checkStrength={true}
                                            showStrength={
                                                this.state.inputValues.password
                                                    .length > 0
                                            }
                                        />
                                        <EnhancedPasswordField
                                            id="password1"
                                            label="Confirm Password"
                                            className="mt-3"
                                            errorState={
                                                this.state.errorText.password1
                                            }
                                            onChange={this.onInputChange}
                                            value={
                                                this.state.inputValues.password1
                                            }
                                            icon={
                                                <i className="material-icons">
                                                    lock_outline
                                                </i>
                                            }
                                        />
                                        {this.state.errorText.nonField && (
                                            <div className="well mb-2 mt-2 error-div">
                                                {this.state.errorText.nonField.map(
                                                    (x, i) => (
                                                        <p key={i}>{x}</p>
                                                    )
                                                )}
                                            </div>
                                        )}
                                        <div className="well text-center mt-3">
                                            <p> or signup with </p>
                                            <ul className="list-inline social-login-list">
                                                <li className="list-inline-item">
                                                    <GoogleLogin
                                                        tag="div"
                                                        handleGoogleLogin={
                                                            this
                                                                .handleSocialLogin
                                                        }
                                                    />
                                                </li>
                                                <li className="list-inline-item">
                                                    <FacebookLogin
                                                        tag="div"
                                                        handleFacebookLogin={
                                                            this
                                                                .handleSocialLogin
                                                        }
                                                    />
                                                </li>
                                                <li className="list-inline-item">
                                                    <TwitterLogin
                                                        tag="div"
                                                        loginUrl={
                                                            twitterLoginUrl
                                                        }
                                                        requestTokenUrl={
                                                            twitterRequestTokenUrl
                                                        }
                                                        onSuccess={
                                                            this
                                                                .handleTwitterLogin
                                                        }
                                                        onFailure={err =>
                                                            console.log(err)
                                                        }>
                                                        <i className="fa fa-twitter" />
                                                    </TwitterLogin>
                                                </li>
                                            </ul>
                                        </div>
                                        <button
                                            className="mt-2 btn btn-dark btn-block"
                                            onClick={this.onRegisterClick}>
                                            {' '}
                                            Sign Up{' '}
                                        </button>
                                        {/* <div className="form-check form-check-inline mt-2 text-left">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="add_to_newsletter"
                                            value="add_to_newsletter"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="add_to_newsletter">
                                            {' '}
                                            Yes! Add me to your newsletter list{' '}
                                        </label>
                                    </div> */}
                                    </form>
                                </div>
                            ) : (
                                <div className="flex-vertical justify-content-center align-items-center p-4 register-success-container">
                                    <p>{this.state.registerSuccessText}</p>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 carousel-container bg-dark">
                            <Carousel className="signup-carousel h-100">
                                <div className="carousel-item active">
                                    <div
                                        className="page-layer bg"
                                        style={{
                                            backgroundImage: `url(/public/img/signup/martin-luther-king.png)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            "I’m now convinced that the simplest
                                            approach will prove to be the most
                                            effective the solution to poverty is
                                            to abolish it directly by a now
                                            widely discussed measure: the
                                            guaranteed income."
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            ~ Martin Luther King Jr
                                            <br />
                                            Where Do We Go from Here : Chaos or
                                            Community (1967)
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        className="page-layer bg"
                                        style={{
                                            backgroundImage: `url(/public/img/signup/erich-fromm.png)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            "Guaranteed income would not only
                                            establish freedom as a reality
                                            rather than a slogan, it would also
                                            establish a principle deeply rooted
                                            in Western religious and humanist
                                            tradition: man has the right to
                                            live, regardless!"
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            ~ Erich Fromm
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        className="page-layer bg"
                                        style={{
                                            backgroundImage: `url(/public/img/signup/mark-zuckerberg.jpg)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            "We should have a society that
                                            measures progress not just by
                                            economic metrics like GDP, but by
                                            how many of us have a role we find
                                            the meaningful. We should explore
                                            ideas like universal basic income to
                                            make sure everyone has a cushion to
                                            try new ideas."
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            ~ Mark Zuckerberg
                                        </p>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})

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
)(SignUpPage)
