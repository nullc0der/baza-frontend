import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Link, NavLink } from 'react-router-dom'

import debounce from 'lodash/debounce'
import { scrollToElement } from 'utils/dom'
import Auth from 'utils/authHelpers'

import './Header.scss'

const HEADER_ITEMS_LEFT = [
    { title: 'Home', href: '/#hero-section' },
    { title: 'Features', href: '/#features-section' },
    { title: 'Status', href: '/#status-section' }
]

const HEADER_ITEMS_RIGHT = [
    { title: 'Latest', href: '/#latest-section' },
    { title: 'Login', href: '/profile' },
    { title: 'Contact', href: '/#contact-section' }
]

export default class Header extends Component {
    static propTypes = {
        scrollspy: PropTypes.bool,
        invert: PropTypes.bool,
        inCenter: PropTypes.bool,
        showDonateButton: PropTypes.bool,
        className: PropTypes.string
    }

    state = {
        isFixed: false
    }

    componentDidMount = () => {
        if (this.props.scrollspy) {
            this.startListeningToScroll()
        }
        $('#navbarContentContainer').on(
            'show.bs.collapse',
            this.handleCollapseShow
        )
        $('#navbarContentContainer').on(
            'hidden.bs.collapse',
            this.handleCollapseHidden
        )
    }

    componentWillUnmount = () => {
        if (this._handleScroll) {
            this.stopListeningToScroll()
        }
        $('#navbarContentContainer').off(
            'show.bs.collapse',
            this.handleCollapseShow
        )
        $('#navbarContentContainer').off(
            'hidden.bs.collapse',
            this.handleCollapseHidden
        )
    }

    handleCollapseShow = () => {
        this.navbarWasLight = $('.app-header').hasClass(
            'navbar-light bg-white fixed-top'
        )
        if (!this.navbarWasLight) {
            $('.app-header').addClass('navbar-light bg-white fixed-top')
        }
    }

    handleCollapseHidden = () => {
        if (!this.navbarWasLight) {
            $('.app-header').removeClass('navbar-light bg-white fixed-top')
        }
    }

    startListeningToScroll = () => {
        if (!this._handleScroll) {
            this._handleScroll = debounce(this.handleScroll, 60)
        }

        window.addEventListener('scroll', this._handleScroll, false)
    }

    stopListeningToScroll = () => {
        window.removeEventListener('scroll', this._handleScroll, false)
        this._handleScroll = null // Garbage collection
    }

    handleScroll = () => {
        let top = $(window).scrollTop()
        let threshold = $('.app-header').height()

        // console.log(top, threshold, top >= threshold);

        this.setState({ isFixed: top >= threshold })
    }

    renderOneLink = (item, index) => {
        return (
            <Link className="header-link" to={item.href} key={index}>
                {item.title}
            </Link>
        )
    }

    renderOneBSLink = (item, index) => {
        const cx = classnames('nav-item', {
            active: item.active
        })
        if (item.title === 'Login') {
            if (Auth.isAuthenticated() && Auth.isTokenNotExpired()) {
                item.title = 'Profile'
            }
        }
        return (
            <li className={cx} key={index}>
                <NavLink
                    className="nav-link"
                    to={item.href}
                    onClick={this.handleLinkNavigation}>
                    {item.title}
                </NavLink>
            </li>
        )
    }

    handleLinkNavigation = e => {
        const strip = window.location.origin + '/'
        const href = (e.target.href || '').replace(strip, '')

        const isValid = /^#[a-zA-Z]/.test(href)

        $('.app-header .collapse.show').removeClass('show')

        if (!isValid) return

        const el = document.getElementById(href.substr(1))
        if (el)
            scrollToElement(el, {
                offset: $('.app-header').height() * -1
            })

        // If element is not present, wait for browser to navigate
        // and then scroll again
        setTimeout(() => {
            scrollToElement(href, {
                offset: $('.app-header').height() * -1
            })
        }, 500)
    }

    render() {
        const {
            className,
            inCenter,
            invert = false,
            showDonateButton = false
        } = this.props

        const cx = classnames('app-header navbar navbar-expand-md', className, {
            'in-center': inCenter,
            'navbar-light bg-white': invert || this.state.isFixed,
            'fixed-top': this.state.isFixed
        })

        return (
            <Fragment>
                <nav className={cx} id="app-header">
                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarContentContainer"
                            aria-controls="navbarContentContainer"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <div className="menu-icon" />
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarContentContainer">
                            <ul className="navbar-nav align-items-center">
                                {HEADER_ITEMS_LEFT.map(this.renderOneBSLink)}
                                <li className="nav-item center-icon">
                                    <NavLink
                                        className="nav-link"
                                        to="/"
                                        activeClassName="active"
                                        onClick={this.handleLinkNavigation}>
                                        <img
                                            className="img-fluid"
                                            alt="Baza"
                                            src="/public/img/baza_logo.svg"
                                        />
                                    </NavLink>
                                </li>
                                {HEADER_ITEMS_RIGHT.map(this.renderOneBSLink)}
                            </ul>
                        </div>
                    </div>
                    {showDonateButton && (
                        <Link
                            to="#!donate"
                            className="btn btn-outline-primary btn-rounded donate-button">
                            Donate Now
                        </Link>
                    )}
                </nav>
            </Fragment>
        )
    }
}
