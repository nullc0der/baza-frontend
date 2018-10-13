import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import Auth from 'utils/authHelpers'

import Header from 'components/Header'
import TextField from 'components/ui/TextField'

import s from './SignUp.scss'

export default class AddSocialEmailPage extends Component {
    state = {
        inputValues: {
            email: ''
        },
        errorText: {
            email: '',
            nonField: ''
        },
        showSuccessText: false
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onEmailSubmit = () => {
        const addEmail = Auth.addEmail(this.state.inputValues.email)
        addEmail
            .then(() => {
                this.setState({
                    showSuccessText: true,
                    inputValues: {
                        email: ''
                    },
                    errorText: {
                        email: '',
                        nonField: ''
                    }
                })
            })
            .catch(responseData => {
                this.setState({
                    errorText: {
                        email: get(responseData, 'email', ''),
                        nonField: get(responseData, 'non_field_errors', '')
                    }
                })
            })
    }

    render() {
        const cx = classnames(s.addSocialEmail, 'add-social-email-page')
        return (
            <div className={cx}>
                <Header invert InCenter />
                <div className="container-fluid page-layer addsocialemail-container">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-sm-12 col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        We couldn't retrive any email from your
                                        social account, <br /> please add an
                                        email below to verify.
                                    </div>
                                    <div className="card-text email-section">
                                        <TextField
                                            id="email"
                                            label="Email"
                                            className="mb-3"
                                            icon={
                                                <i className="material-icons">
                                                    email
                                                </i>
                                            }
                                            onChange={this.onInputChange}
                                            value={this.state.inputValues.email}
                                            errorState={
                                                this.state.errorText.email
                                                    .length
                                                    ? this.state.errorText.email
                                                    : null
                                            }
                                        />
                                        {!!this.state.showSuccessText && (
                                            <div className="well mb-2 error-div">
                                                Email added successfully, we
                                                sent an email containing
                                                verification URL, please verify
                                                your email id.
                                            </div>
                                        )}
                                        <button
                                            className="btn btn-dark btn-block"
                                            onClick={this.onEmailSubmit}>
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
