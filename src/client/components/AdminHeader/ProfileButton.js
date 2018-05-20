import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Auth from 'utils/authHelpers'
import Dropdown from 'components/ui/Dropdown'

const SAMPLE_USER = [
    {
        image: '',
        username: 'Joe Smith',
        created_at_text: 'Member since 30 days ago'
    }
]

class HeaderProfileButton extends Component {
    state = {
        isOpen: false
    }

    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    componentDidMount = () => {
        // $(document).on('blur' , '.header-profile-button', this.onBlur)
    }
    componentWillUnmount = () => {
        // $(document).off('blur', '.header-profile-button', this.onBlur)
    }

    onBlur = e => {
        console.log('blurred')
    }

    onClickLogout = e => {
        e.preventDefault()
        const logout = Auth.logout()
        logout.then(response => {
            if (response) {
                this.props.navigate('/')
            }
        })
    }

    getCreatedText = date => {
        const timeDiff = Math.abs(
            new Date().getTime() - new Date(date).getTime()
        )
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
        return `Member since ${diffDays} days ago`
    }

    renderProfile = user => {
        return (
            <div className="profile-menu">
                <div className="flex-vertical a-center j-center blue-container">
                    <div className="profile-icon big no-overflow black-bg">
                        <img alt="" className="img-responsive" src="" />
                    </div>
                    <div className="text-center">
                        {' '}
                        {this.getCreatedText(user.date_joined)}{' '}
                    </div>
                </div>
                <div className="flex-horizontal user-menu j-between">
                    <a className="profile-link" href="#">
                        References
                    </a>
                    <a className="profile-link" href="#">
                        Account
                    </a>
                    <Link className="profile-link" to="/">
                        Landing
                    </Link>
                </div>
                <div className="profile-menu-footer flex-horizontal j-between">
                    <a className="btn footer-btn" href="#">
                        Profile
                    </a>
                    <a
                        className="btn footer-btn"
                        href="#"
                        onClick={this.onClickLogout}>
                        Sign Out
                    </a>
                </div>
            </div>
        )
    }

    render() {
        const { className, user = SAMPLE_USER } = this.props

        const cx = classnames('header-profile-button', className)

        const label = (
            <div className="profile-button flex-horizontal a-center">
                <div className="profile-icon no-overflow">
                    <img alt="" className="img-fluid" src="" />
                </div>
                <div className="profile-username"> {user.username} </div>
            </div>
        )

        return (
            <Dropdown
                id="id-header-profile-dropdown"
                className={cx}
                label={label}
                items={[user]}
                itemRenderer={this.renderProfile}
            />
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    navigate(...args) {
        return dispatch(push(...args))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfileButton)
