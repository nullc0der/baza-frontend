import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Auth from 'utils/authHelpers'

import Header from 'components/Header'

import TextField from 'components/ui/TextField'
import Carousel from 'components/ui/Carousel'

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
        register.then(responseData => {
            if (responseData.key) {
                this.props.navigate('/admin')
            } else {
                this.setState({
                    errorText: {
                        username: get(responseData, 'username', null),
                        password1: get(responseData, 'password1', null),
                        password2: get(responseData, 'password2', null),
                        nonField: get(responseData, 'non_field_errors', null)
                    }
                })
            }
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
                                    <TextField
                                        id="password1"
                                        label="Password"
                                        type="password"
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
                                    <TextField
                                        id="password2"
                                        label="Confirm Password"
                                        type="password"
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
                                            backgroundImage: `url(/public/img/signup/martin-luther-king.png)`
                                        }}
                                    />
                                    <div className="carousel-item-content">
                                        <h3>
                                            "I’m now convinced that the simplest approach will prove to be the most effective the solution to poverty is to abolish it directly by a now widely discussed measure: the guaranteed income."
                                        </h3>
                                        <p className="section-title-underlined underline-center">
                                            ~ Martin Luther King Jr
                                            <br />
                                            Where Do We Go from Here : Chaos or Community (1967)
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
                                            "Guaranteed income would not only establish freedom as a reality rather than a slogan, it would also establish a principle deeply rooted in Western religious and humanist tradition: man has the right to live, regardless!"
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
                                            "We should have a society that measures progress not just by economic metrics like GDP, but by how many of us have a role we find the meaningful. We should explore ideas like universal basic income to make sure everyone has a cushion to try new ideas."
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
