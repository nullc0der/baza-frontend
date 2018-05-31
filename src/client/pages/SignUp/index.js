import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Auth from 'utils/authHelpers'

import Header from 'components/Header'

import TextField from 'components/ui/TextField'
import Carousel from 'components/ui/Carousel'
import EnhancedPasswordField from 'components/ui/EnhancedPasswordField'

import s from './SignUp.scss'

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class SignUpPage extends Component {
    state = {
        inputValues: {
            username: '',
            password1: '',
            password2: ''
        },
        errorText: {
            username: null,
            password1: null,
            password2: null,
            nonField: null
        }
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
        const { username, password1, password2 } = this.state.inputValues
        const register = Auth.register(username, password1, password2)
        register
            .then(responseData => {
                if (responseData.key) {
                    this.props.navigate('/admin/member-profile')
                } else {
                    this.setState({
                        errorText: {
                            username: get(responseData, 'username', null),
                            password1: get(responseData, 'password1', null),
                            password2: get(responseData, 'password2', null),
                            nonField: get(
                                responseData,
                                'non_field_errors',
                                null
                            )
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
        const cx = classnames(s.container, 'signup-page')

        return (
            <div className={cx}>
                <Header invert inCenter />
                <div className="container-fluid page-layer px-0">
                    <div className="row h-100 no-gutters">
                        <div className="col-md-6 signup-container">
                            <div className="flex-vertical align-align-items-center justify-content-center text-center p-4">
                                <h4> Hi There! </h4>
                                <p> Ready to create your awesome account </p>

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
                                    <EnhancedPasswordField
                                        id="password1"
                                        label="Password"
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
                                        checkStrength={true}
                                    />
                                    <EnhancedPasswordField
                                        id="password2"
                                        label="Confirm Password"
                                        className="mt-3"
                                        errorState={
                                            this.state.errorText.password2
                                        }
                                        onChange={this.onInputChange}
                                        icon={
                                            <i className="material-icons">
                                                lock_outline
                                            </i>
                                        }
                                    />
                                    {/* <TextField
                                        label="Email"
                                        className="mt-3"
                                        value={this.state.email}
                                        errorState={this.state.emailError}
                                        onChange={this.updateEmail}
                                        icon={
                                            <i className="material-icons">
                                                mail_outline
                                            </i>
                                        }
                                    /> */}

                                    {this.state.errorText.nonField && (
                                        <div className="well mb-2 mt-2 error-div">
                                            {this.state.errorText.nonField.map(
                                                (x, i) => <p key={i}>{x}</p>
                                            )}
                                        </div>
                                    )}
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
