import React, { Component } from 'react'
import classnames from 'classnames'
import {connect}  from 'react-redux'
import {push} from 'react-router-redux'

import Dialog from 'components/ui/Dialog'
import TextField from 'components/ui/TextField'

import s from './Donation.scss'

class DonationDialog extends Component {
    closeDonationDialog = ()=> {
        const {pathname, hash} = this.props.location
        this.props.navigate(pathname + (hash || '').replace('#!donate', ''))
    }
    
    render(){
        const cx = classnames(s.donationDialog, 'donation-dialog')

        return (
            <Dialog 
                className={cx}
                isOpen={true}
                title={
                    <p className='text-center'>
                        We Thank You for Your
                        <br/> Support!
                    </p>
                }
                onRequestClose={this.closeDonationDialog}>
                <div className='donate-buttons flex-horizontal align-items-center justify-content-between'>
                    <button className='btn btn-outline-dark btn-responsive'> $5 </button>
                    <button className='btn btn-outline-dark btn-responsive'> $10 </button>
                    <button className='btn btn-outline-dark btn-responsive'> $15 </button>
                    <button className='btn btn-outline-dark btn-responsive'> $20 </button>
                    <button className='btn btn-outline-dark btn-responsive'> $25 </button>
                </div>
                <div className='row mb-1'>
                    <div className='col-md-5 mt-4'>
                        <p className='font-weight-bold mb-3'>Your Details</p>
                        <TextField
                            label='Your Name'
                            className='mb-3'
                            icon={<i className='material-icons'>perm_identity</i>}/>
                        <TextField
                            label='Email'
                            className='mb-3'
                            icon={<i className='material-icons'>mail_outline</i>}/>
                        <TextField
                            label='Phone no.'
                            className='mb-3'
                            icon={<i className='material-icons'>phone</i>}/>
                        <button className='btn btn-dark btn-block mt-3 mb-2'>
                            SUBMIT
                        </button>
                        <div className='form-check form-check-inline'>
                            <input className="form-check-input" type="checkbox" id="add_to_newsletter" value="add_to_newsletter"/>
                            <label className="form-check-label" htmlFor="add_to_newsletter"> Yes! Add me to your newsletter list </label>
                        </div>
                    </div>
                    <div className='col-md-7 mt-3'>
                        <div className='well p-2'>
                            <p className='font-weight-bold mb-3'> Payment Details </p>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <TextField label='Credit Card Number'/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='row'>
                                        <div className='col-md-6 mt-3'>
                                            <TextField label='Month'/>        
                                        </div>
                                        <div className='col-md-6 mt-3'>
                                            <TextField label='Year'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='row'>
                                        <div className='col-md-6 mt-3'>
                                            <TextField label='CVV'/>        
                                        </div>
                                        <div className='col-md-6 mt-3'>
                                            <TextField label='ZipCode'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 mt-3'>
                                    <TextField label='Billing Address'/>
                                </div>
                            </div>
                            <div className='row pb-3'>
                                <div className='col-md-6 mt-3'>
                                    <TextField label='City'/>
                                </div>
                                <div className='col-md-6 mt-3'>
                                    <TextField label='Select State'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-horizontal align-content-center justify-content-center mt-2'>
                    <div className='payment-image payment-image-ssl'></div>
                    <div className='payment-image payment-image-stripe'></div>
                </div>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    location: state.router.location
})

const mapDispatchToProps = dispatch => ({
    navigate(url){ return dispatch(push(url)) }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DonationDialog)