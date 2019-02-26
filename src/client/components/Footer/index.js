import React, { Component } from 'react'
import classnames from 'classnames'

import SocialLink from 'components/SocialLink'

import s from './Footer.scss'

const FOOTER_LINKS = [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms and Conditions', href: '/terms-of-service/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' },
    { label: 'Donate', href: '#!donate' }
]

const SOCIAL_LINKDATAS = [
    { iconName: 'fa fa-facebook', url: 'https://www.facebook.com/' },
    { iconName: 'fa fa-instagram', url: 'https://www.instagram.com/' },
    { iconName: 'fa fa-twitter', url: 'https://www.twitter.com/' },
    { iconName: 'fa fa-linkedin', url: 'https://www.linkedin.com/' }
]

export default class Footer extends Component {
    render() {
        const cx = classnames(s.container, 'app-footer bg-dark py-4')
        return (
            <div className={cx}>
                <div className="footer-inner text-center">
                    <p className="footer-copyright-info">
                        &copy; 2018 Baza Foundation
                    </p>
                    <ul className="list-inline">
                        {FOOTER_LINKS.map((x, i) => (
                            <li className="list-inline-item" key={i}>
                                <a className="footer-link" href={x.href}>
                                    {' '}
                                    {x.label}{' '}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className="list-inline mt-2">
                        {SOCIAL_LINKDATAS.map((x, i) => (
                            <li className="list-inline-item no-border" key={i}>
                                <SocialLink linkData={x} />
                            </li>
                        ))}
                    </ul>
                    <ul className="list-inline mt-1">
                        <li className="list-inline-item no-border">
                            <a
                                href="https://www.trackico.io/"
                                target="_blank"
                                title="TrackICO">
                                <img
                                    border="0"
                                    src="https://www.trackico.io/static/img/partner_logo_white.png"
                                    alt="TrackICO - provider of information about the best ICOs and STOs"
                                    className="trackico-logo"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
