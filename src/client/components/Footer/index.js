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
    {
        iconName: 'fa fa-facebook',
        url: 'https://www.facebook.com/bazafoundation'
    },
    {
        iconName: 'fa fa-instagram',
        url: 'https://www.instagram.com/bazafoundation/'
    },
    { iconName: 'fa fa-twitter', url: 'https://twitter.com/BazaFoundation' },
    {
        iconName: 'fa fa-linkedin',
        url: 'https://www.linkedin.com/company/bazafoundation/'
    },
    {
        iconName: 'fa fa-reddit',
        url: 'https://www.reddit.com/r/BazaFoundation/'
    },
    { iconName: 'fa fa-telegram', url: 'https://t.me/bazafoundation' }
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
                        {SOCIAL_LINKDATAS.map((x, i) => (
                            <li
                                className="list-inline-item no-border social"
                                key={i}>
                                <SocialLink linkData={x} />
                            </li>
                        ))}
                    </ul>
                    <ul className="list-inline mt-2">
                        {FOOTER_LINKS.map((x, i) => (
                            <li className="list-inline-item" key={i}>
                                <a className="footer-link" href={x.href}>
                                    {' '}
                                    {x.label}{' '}
                                </a>
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
                        {/* <li className="list-inline-item no-border">
                            <iframe
                                src="https://awesomeicos.com/icos/5152/rating"
                                frameborder="0"
                                title="AwesomeICOs"
                                className="awesome-ico"
                            />
                        </li> */}
                        <li className="list-inline-item no-border">
                            <a
                                id="cq-verify"
                                href="https://concourseq.io/"
                                data-users="puffmushroom">
                                ConcourseQ
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
