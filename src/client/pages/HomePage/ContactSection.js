import React from 'react'
import classnames from 'classnames'

import TextField from 'components/ui/TextField'

const ContactSection = (props)=> {
    const cx = classnames('contact-section bg-light', props.className)
    return (
        <div className={cx}>
            <div className='page-section container'>
                <h3 className='text-center mb-3'> Contact </h3>
                <div className='row'>
                    <div className='col-md-6 mx-auto'>
                        <form className='form contact-form'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <TextField
                                        className='input-contact-name'
                                        label='Name'
                                        icon={<i className='material-icons'>perm_identity</i>}/>
                                </div>
                                <div className='col-md-6'>
                                    <TextField
                                        className='input-contact-email'
                                        label='Email'
                                        icon={<i className='material-icons'>mail_outline</i>}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <TextField
                                        className='input-contact-subject'
                                        label='Subject'
                                        icon={<i className='material-icons'>create</i>}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <TextField
                                        className='input-contact-message'
                                        label='Message'
                                        icon={<i className='material-icons'>drafts</i>}/>
                                </div>
                            </div>
                            <div className='row mt-4 justify-content-end'>
                                <div className='col-md-6'>
                                    <button className='btn btn-block btn-dark'> SEND </button>
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