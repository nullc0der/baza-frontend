import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'
import { Redirect } from 'react-router-dom'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import TwitterLogin from 'react-twitter-auth'

import { actions as authActions } from 'store/Auth'
import Auth from 'utils/authHelpers'

import Header from 'components/Header'

import TextField from 'components/ui/TextField'
import Carousel from 'components/ui/Carousel'
import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'
import FacebookLogin from 'components/FacebookLogin'
import GoogleLogin from 'components/GoogleLogin'

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
        redirectToSocialEmailPage: false
    }

    componentDidMount = () => {
        const checkRegEnabled = Auth.checkRegistrationEnabled()
        checkRegEnabled.then(responseData => {
            if (!responseData.is_registration_enabled) {
                this.setState({
                    registerSuccessText:
                        'Registration is disabled on this site'
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
                                    'Registration is successful \n' +
                                    'We have sent an email to your provided email.\n' +
                                    'Please verify your email to continue.'
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
                            'Registration is successful \n' +
                            'We have sent an email to ' +
                            get(responseData, 'email', '') +
                            '\n' +
                            'Please verify your email to continue.'
                    })
                } else {
                    this.props.authenticateUser(
                        responseData.access_token,
                        responseData.email_verification,
                        responseData.email_verified,
                        responseData.expires_in
                    )
                    this.setState({
                        shouldRedirect: true
                    })
                }
            } else {
                this.setState({
                    shouldRedirect: true,
                    redirectToSocialEmailPage: true
                })
            }
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
                this.handleSocialResponse(data, true)
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
        const twitterLoginUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000/api/v1/auth/twitter/login/'
                : '/api/v1/auth/twitter/login/'
        const twitterRequestTokenUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000/api/v1/auth/twitter/getrequesttoken/'
                : '/api/v1/auth/twitter/getrequesttoken/'

        return this.state.shouldRedirect ? (
            this.state.redirectToSocialEmailPage ? (
                <Redirect to="/addemail/" />
            ) : (
                <Redirect to="/member-profile/" />
            )
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
                                            icon={
                                                <i className="material-icons">
                                                    alternate_email
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
                                            icon={
                                                <i className="material-icons">
                                                    lock_outline
                                                </i>
                                            }
                                            checkStrength={true}
                                        />
                                        <EnhancedPasswordField
                                            id="password1"
                                            label="Confirm Password"
                                            className="mt-3"
                                            errorState={
                                                this.state.errorText.password1
                                            }
                                            onChange={this.onInputChange}
                                            icon={
                                                <i className="material-icons">
                                                    lock_outline
                                                </i>
                                            }
                                        />
                                        {this.state.errorText.nonField && (
                                            <div className="well mb-2 mt-2 error-div">
                                                {this.state.errorText.nonField.map(
                                                    (x, i) => <p key={i}>{x}</p>
                                                )}
                                            </div>
                                        )}
                                        <div className="well text-center mt-3">
                                            <p> or signup with </p>
                                            <ul className="list-inline social-login-list">
                                                <li className="list-inline-item">
                                                    <GoogleLogin
                                                        handleGoogleLogin={
                                                            this
                                                                .handleSocialLogin
                                                        }
                                                    />
                                                </li>
                                                <li className="list-inline-item">
                                                    <FacebookLogin
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
                                <div className="flex-vertical justify-content-center text-center p-4 register-success-container">
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
                                            backgroundImage: `url(/public/img/signup/hero_image.jpg)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            {' '}
                                            What happens when you become a donor{' '}
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        className="page-layer bg"
                                        style={{
                                            backgroundImage: `url(/public/img/signup/hero_image.jpg)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            {' '}
                                            What happens when you become a donor{' '}
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        className="page-layer bg"
                                        style={{
                                            backgroundImage: `url(/public/img/signup/hero_image.jpg)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            {' '}
                                            What happens when you become a donor{' '}
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        className="page-layer bg"
                                        style={{
                                            backgroundImage: `url(/public/img/signup/hero_image.jpg)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            {' '}
                                            What happens when you become a donor{' '}
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
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
