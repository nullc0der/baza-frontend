import React, { Component } from 'react'
import classnames from 'classnames'

import Header from 'components/Header'

import TextField from 'components/ui/TextField'
import Carousel from 'components/ui/Carousel'

import s from './SignUp.scss'

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default class SignUpPage extends Component {
  state = {
    username: '',
    usernameError: null,
    password: '',
    passwordError: null,
    confirmPassword: '',
    confirmPasswordError: null,
    email: '',
    emailError: null
  }

  updateUsername = username => {
    const state = { username }
    state.usernameError =
      username && username.length >= 6 ? false : 'Minimum 6 characters'
    this.setState(state)
  }

  updatePassword = password => {
    const state = { password }
    state.passwordError =
      password && password.length >= 8 ? false : 'Minimum 8 characters'
    this.setState(state)
  }

  updateConfirmPassword = confirmPassword => {
    const state = { confirmPassword }
    state.confirmPasswordError =
      this.state.password === confirmPassword ? false : 'Passwords do not match'
    this.setState(state)
  }

  updateEmail = email => {
    const state = { email }
    state.emailError = EMAIL_REGEX.test(email) ? false : 'Email is invalid'
    this.setState(state)
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

                <form className="signup-form my-2">
                  <TextField
                    label="Username"
                    className="mt-3"
                    value={this.state.username}
                    errorState={this.state.usernameError}
                    onChange={this.updateUsername}
                    icon={<i className="material-icons">perm_identity</i>}
                  />
                  <TextField
                    label="Password"
                    className="mt-3"
                    value={this.state.password}
                    errorState={this.state.passwordError}
                    onChange={this.updatePassword}
                    icon={<i className="material-icons">lock_outline</i>}
                  />
                  <TextField
                    label="Confirm Password"
                    className="mt-3"
                    value={this.state.confirmPassword}
                    errorState={this.state.confirmPasswordError}
                    onChange={this.updateConfirmPassword}
                    icon={<i className="material-icons">lock_outline</i>}
                  />
                  <TextField
                    label="Email"
                    className="mt-3"
                    value={this.state.email}
                    errorState={this.state.emailError}
                    onChange={this.updateEmail}
                    icon={<i className="material-icons">mail_outline</i>}
                  />

                  <button className="mt-3 btn btn-dark btn-block">
                    {' '}
                    Sign Up{' '}
                  </button>
                  <div className="form-check form-check-inline mt-2 text-left">
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
                  </div>
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
                    <h3> What happens when you become a donor </h3>
                    <p className="section-title-underlined underline-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    <h3> What happens when you become a donor </h3>
                    <p className="section-title-underlined underline-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    <h3> What happens when you become a donor </h3>
                    <p className="section-title-underlined underline-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    <h3> What happens when you become a donor </h3>
                    <p className="section-title-underlined underline-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
