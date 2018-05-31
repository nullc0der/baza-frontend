import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import Dialog from 'components/ui/Dialog'

import { Link, Redirect } from 'react-router-dom'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import TextField from 'components/ui/TextField'
import Auth from 'utils/authHelpers'

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
        redirectToOrigin: false
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
                if (responseData.key) {
                    this.setState({
                        redirectToOrigin: true
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

    render() {
        const cx = classnames(s.loginDialog, 'login-dialog')
        const { originURL } = this.props.location.state || {
            originURL: '/admin/member-profile'
        }

        return this.state.redirectToOrigin ? (
            <Redirect to={originURL} />
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
                        onChange={this.onInputChange}
                        errorState={
                            this.state.errorText.username.length
                                ? this.state.errorText.username
                                : null
                        }
                    />
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        className="mb-3"
                        icon={<i className="material-icons">lock_outline</i>}
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
                            onClick={this.toggleRememberMe}
                        />
                        <label htmlFor="remember_me_check"> Remember Me </label>
                    </div>
                    <div className="col-md-6 mt-3 text-right">
                        <a
                            href="#"
                            className="font-weight-bold text-dark forgot-password-link">
                            {' '}
                            Forgot Password{' '}
                        </a>
                    </div>
                </div>
                <div className="well text-center mt-3">
                    <p> or login with </p>
                    <ul className="list-inline social-login-list">
                        <li className="list-inline-item">
                            <i className="fa fa-google-plus" />
                        </li>
                        <li className="list-inline-item">
                            <i className="fa fa-facebook" />
                        </li>
                        <li className="list-inline-item">
                            <i className="fa fa-twitter" />
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
