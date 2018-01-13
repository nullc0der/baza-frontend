import React, {Component} from 'react'
import classnames from 'classnames'
import Dialog from 'components/ui/Dialog'

import { Link } from 'react-router-dom'

import { push } from 'react-router-redux'
import { connect } from 'react-redux' 

import TextField from 'components/ui/TextField'

import s from './SignUp.scss'

class LoginDialog extends Component {
    
    closeLoginModal = ()=> {
        const {pathname, hash} = this.props.location
        this.props.navigate(pathname + (hash || '').replace('#!login', ''))
    }

    render(){

        const cx = classnames(s.loginDialog, 'login-dialog')

        return (
            <Dialog 
                className={cx}
                isOpen={true}
                title='Welcome Back'
                onRequestClose={this.closeLoginModal}>
                <TextField 
                    id='username'
                    label='Email'
                    className='mb-3'
                    icon={<i className='material-icons'>mail_outline</i>}/>
                <TextField 
                    id='password'
                    type='password'
                    label='Password'
                    className='mb-3'
                    icon={<i className='material-icons'>lock_outline</i>}/>
                <button className='btn btn-dark btn-block'>
                    SUBMIT
                </button>
                <div className='row'>
                    <div className='col-md-6 mt-3 flex-horizontal align-items-center'>
                        <input name='remember_me_check' type='checkbox'/>
                        <label htmlFor='remember_me_check'> Remember Me </label>
                    </div>
                    <div className='col-md-6 mt-3 text-right'>
                        <a href='#' className='font-weight-bold text-dark forgot-password-link'> Forgot Password </a>
                    </div>
                </div>
                <div className='well text-center mt-3'>
                    <p> or login with </p>
                    <ul className='list-inline social-login-list'>
                        <li className='list-inline-item'>
                            <i className='fa fa-google-plus'/>
                        </li>
                        <li className='list-inline-item'>
                            <i className='fa fa-facebook'/>
                        </li>
                        <li className='list-inline-item'>
                            <i className='fa fa-twitter'/>
                        </li>
                    </ul>
                </div>
                <div className='bottom-content text-center'>
                    Login with your registered username & password. 
                    If you are not registered then 
                    <Link 
                        className='text-dark font-weight-bold'
                        to='/signup'> Sign Up </Link>
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
    navigate(...args){
        return dispatch(push(...args))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginDialog)