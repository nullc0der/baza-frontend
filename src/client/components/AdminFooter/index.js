import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import classnames from 'classnames'

import Config from 'utils/config'

import s from './AdminFooter.scss'

const SITE_TYPE_TEXT_AND_COLOR = {
    local: {
        text: 'local',
        color: 'yellow'
    },
    beta: {
        text: 'beta',
        color: 'red'
    },
    live: {
        text: 'live',
        color: 'green'
    }
}

export default class Footer extends Component {
    render() {
        const { className } = this.props
        const cx = classnames(
            s.container,
            className,
            'ui-footer',
            'a-stretch',
            'flex-horizontal'
        )
        const release = Config.get('RELEASE')
        const releaseCodename = Config.get('RELEASE_CODENAME')
        const siteType = Config.get('SITE_TYPE')
        return (
            <div className={cx}>
                <div className="flex-horizontal a-center flex-1">
                    <b>Copyright &copy; 2014-2018 Baza.&nbsp;</b>
                    <span>All rights reserved.</span>
                    <span className="badge badge-pill pill-blue pill-powered">
                        Powered by Ekata
                    </span>
                    <span>
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            className="link">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a
                            href="https://policies.google.com/terms"
                            target="_blank"
                            className="link">
                            Terms of Service
                        </a>{' '}
                        apply.
                    </span>
                </div>
                <div className="flex-horizontal a-center">
                    <div
                        className={`badge badge-pill pill-${SITE_TYPE_TEXT_AND_COLOR[siteType].color} pill-site-type`}>
                        {SITE_TYPE_TEXT_AND_COLOR[siteType].text}
                    </div>
                    <div className="badge badge-pill pill-blue">
                        {releaseCodename}
                    </div>
                    <b>v{release}</b>
                </div>
            </div>
        )
    }
}
