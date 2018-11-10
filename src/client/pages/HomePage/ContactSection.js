import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'
import { landingContact } from 'api/landing-contact'
import TextField from 'components/ui/TextField'

class ContactSection extends Component {
    state = {
        inputValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        errorState: {
            name: null,
            email: null,
            subject: null,
            message: null,
            nonField: null
        },
        sentMessage: false
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    onSubmitClick = e => {
        e.preventDefault()
        landingContact(this.state.inputValues)
            .then(response => {
                this.setState({
                    sentMessage: true,
                    inputValues: {
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    },
                    errorState: {
                        name: null,
                        email: null,
                        subject: null,
                        message: null,
                        nonField: null
                    }
                })
            })
            .catch(responseData => {
                this.setState({
                    errorState: {
                        name: get(responseData, 'name', null),
                        email: get(responseData, 'email', null),
                        subject: get(responseData, 'subject', null),
                        message: get(responseData, 'message', null),
                        nonField: get(responseData, 'non_field_errors', null)
                    }
                })
            })
    }

    render() {
        const { className, id } = this.props
        const cx = classnames('contact-section bg-light', className)
        return (
            <div className={cx} id={id}>
                <div className="page-section container">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-lg-6 col-xl-5">
                            <div className="pr-0 pr-md-4 pr-lg-4 pr-xl-4">
                                <img
                                    className="img-fluid contact-img"
                                    alt="Contact Us"
                                    src="/public/img/contact.svg"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-7">
                            <h3 className="text-center mb-3 pt-4 pt-md-0 pt-lg-0 pt-xl-0">
                                Contact
                            </h3>
                            <form className="form contact-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextField
                                            className="input-contact-name"
                                            label="Name"
                                            id="name"
                                            errorState={this.state.errorState.name}
                                            value={this.state.inputValues.name}
                                            onChange={this.onInputChange}
                                            icon={
                                                <i className="material-icons">
                                                    perm_identity
                                                </i>
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            className="input-contact-email"
                                            label="Email"
                                            id="email"
                                            errorState={this.state.errorState.email}
                                            value={this.state.inputValues.email}
                                            onChange={this.onInputChange}
                                            icon={
                                                <i className="material-icons">
                                                    mail_outline
                                                </i>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            className="input-contact-subject"
                                            label="Subject"
                                            id="subject"
                                            errorState={
                                                this.state.errorState.subject
                                            }
                                            value={
                                                this.state.inputValues.subject
                                            }
                                            onChange={this.onInputChange}
                                            icon={
                                                <i className="material-icons">
                                                    create
                                                </i>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            className="input-contact-message"
                                            label="Message"
                                            id="message"
                                            errorState={
                                                this.state.errorState.message
                                            }
                                            value={
                                                this.state.inputValues.message
                                            }
                                            onChange={this.onInputChange}
                                            icon={
                                                <i className="material-icons">
                                                    drafts
                                                </i>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4 justify-content-end">
                                    <div className="col-md-6">
                                        {this.state.sentMessage && (
                                            <p>
                                                Thank you for contacting us, we
                                                will get back to you shortly
                                            </p>
                                        )}
                                        <button className="btn btn-block btn-dark"
                                            onClick={this.onSubmitClick}>
                                            SEND
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactSection
