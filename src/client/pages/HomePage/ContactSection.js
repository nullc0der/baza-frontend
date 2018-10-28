import React from 'react'
import classnames from 'classnames'

import TextField from 'components/ui/TextField'

const ContactSection = props => {
    const cx = classnames('contact-section bg-light', props.className)
    return (
        <div className={cx} id={props.id}>
            <div className="page-section container">
                <div className="row align-items-center">
                    <div className="col-md-6 col-lg-6 col-xl-5">
                        <div className="pr-0 pr-md-4 pr-lg-4 pr-xl-4">
                            <img
                                className="img-fluid"
                                alt="Contact Us"
                                src="/public/img/contact.svg"
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-7">
                        <h3 className="text-center mb-3 pt-4 pt-md-0 pt-lg-0 pt-xl-0">
                            {' '}
                            Contact{' '}
                        </h3>
                        <form className="form contact-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField
                                        className="input-contact-name"
                                        label="Name"
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
                                    <button className="btn btn-block btn-dark">
                                        {' '}
                                        SEND{' '}
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

export default ContactSection
