import React, { Component } from 'react'
import classnames from 'classnames'

import SocialLink from 'components/SocialLink'
import NewsSection from 'components/Footer/NewsSection'
import FaqSection from 'components/Footer/FaqSection'

import s from './Footer.scss'

const FOOTER_LINKS = [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms and Conditions', href: '/terms-of-service/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' },
    { label: 'Donate', href: '#!donate' }
]

const SOCIAL_LINKDATAS = [
    {
        linkName: 'Facebook',
        url: 'https://www.facebook.com/bazafoundation',
        iconName: 'fa fa-fw fa-facebook'
    },
    {
        linkName: 'Instagram',
        url: 'https://www.instagram.com/bazafoundation/',
        iconName: 'fa fa-fw fa-instagram'
    },
    {
        linkName: 'Twitter',
        url: 'https://twitter.com/BazaFoundation',
        iconName: 'fa fa-fw fa-twitter'
    },
    {
        linkName: 'Linkedin',
        url: 'https://www.linkedin.com/company/bazafoundation/',
        iconName: 'fa fa-fw fa-linkedin'
    },
    {
        linkName: 'Reddit',
        url: 'https://www.reddit.com/r/BazaFoundation/',
        iconName: 'fa fa-fw fa-reddit'
    }
]

const DISCUSSION_LINKDATAS = [
    {
        linkName: 'Telegram',
        url: 'https://t.me/bazafoundation',
        iconName: 'fa fa-fw fa-telegram'
    }
]

const ICO_LISTINGS = [
    { linkName: 'TrackICO', url: 'https://www.trackico.io/' },
    {
        linkName: 'AwesomeICOs',
        url: 'https://awesomeicos.com/icos/5152/rating'
    },
    {
        linkName: 'ICOPulse',
        url: 'https://www.icopulse.com/'
    }
]

export default class Footer extends Component {
    render() {
        const cx = classnames(s.container, 'app-footer bg-dark pb-3 pt-6')
        const newsModalClass = classnames(s.newsModal)
        const faqModalClass = classnames(s.faqModal)
        return (
            <div className={cx}>
                <div className="baza-logo">
                    <img
                        className="img-fluid"
                        alt="Baza Logo"
                        src="/public/img/baza_logo.svg"
                    />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 d-flex d-md-block justify-content-between">
                            <div className="social-links">
                                <p className="social-links-title">
                                    SOCIAL LINKS
                                </p>
                                <ul className="list-unstyled">
                                    {SOCIAL_LINKDATAS.map((x, i) => (
                                        <li
                                            className="list-unstyled-item"
                                            key={i}>
                                            <SocialLink linkData={x} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="discussion-links">
                                <p className="discussion-links-title">
                                    Have a Question or Suggestion for us? Talk
                                    to us directly.
                                </p>
                                <ul className="list-unstyled">
                                    {DISCUSSION_LINKDATAS.map((x, i) => (
                                        <li
                                            className="list-unstyled-item"
                                            key={i}>
                                            <SocialLink linkData={x} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 d-flex d-md-block justify-content-between mt-2 mt-md-0">
                            <div className="links-and-downloads">
                                <p className="links-and-downloads-title">
                                    LINKS &amp; DOWNLOADS
                                </p>
                                <ul className="list-unstyled">
                                    {FOOTER_LINKS.map((x, i) => (
                                        <li
                                            key={i}
                                            className="list-unstyled-item">
                                            <a
                                                className="footer-link"
                                                href={x.href}>
                                                {' '}
                                                {x.label}{' '}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="ico-listings">
                                <p className="ico-listings-title">
                                    ICO LISTINGS
                                </p>
                                <ul className="list-unstyled">
                                    {ICO_LISTINGS.map((x, i) => (
                                        <li
                                            key={i}
                                            className="list-unstyled-item">
                                            <a
                                                className="footer-link"
                                                href={x.url}>
                                                {x.linkName}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="list-unstyled-item">
                                        <a
                                            id="cq-verify"
                                            href="https://concourseq.io/"
                                            data-users="puffmushroom"
                                            className="footer-link">
                                            ConcourseQ
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 mt-2 mt-md-0">
                            <FaqSection faqModalClass={faqModalClass} />
                        </div>
                        <div className="col-md-4 mt-2 mt-md-0">
                            <NewsSection newsModalClass={newsModalClass} />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <div className="badge copyright-badge">
                        <p className="footer-copyright-info">
                            &copy; 2019 Baza Foundation
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
