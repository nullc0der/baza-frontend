import React, { Component } from 'react'
import classnames from 'classnames'

import s from './SocialLink.scss'

class SocialLink extends Component {
    render() {
        const { linkData, className } = this.props
        const cx = classnames(s.container, className, 'social-link')
        return (
            <div className={cx}>
                <i className={linkData.iconName} />
                <a href={`${linkData.url}`} target="_blank">
                    {linkData.linkName}
                </a>
            </div>
        )
    }
}

export default SocialLink
