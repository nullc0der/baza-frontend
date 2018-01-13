import React, {Component} from 'react'
import classnames from 'classnames'

import Header from 'components/Header'
import Footer from 'components/Footer'

import s from './SignUp.scss'

export default class SignUpPage extends Component {
    render(){
        const cx = classnames(s.container, 'signup-page')
        
        return (
            <div className={cx}>
                <Header invert inCenter />
                Signup
                <Footer />
            </div>
        )
    }
}