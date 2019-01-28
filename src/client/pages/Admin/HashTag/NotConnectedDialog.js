import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { actions as hashtagActions } from 'store/HashTag'

import s from './HashTag.scss'

class NotConnectedDialog extends Component {
    static propTypes = {
        className: PropTypes.string,
        provider: PropTypes.string.isRequired
    }

    render() {
        const {
            className,
            provider
        } = this.props
        const cx = classnames(s.notConnected, className)
        return (
            <div className={cx}>
                <div className='not-connected-inner'>
                    <div className={`provider-big-icon ${provider.className}`}>
                        <i className={`fa fa-${provider.icon}`} />
                    </div>
                    <br />
                    <p className='flex-1 lead text-center'>
                        Your {provider.name} account is not connected,
                        please connect {provider.name} account to proceed further
                    </p>
                    <div className={`btn btn-provider ${provider.className}`}>
                        <div className='provider-icon'>
                            <i className={`fa fa-${provider.icon}`} />
                        </div>
                        <div className='provider-name'>Connect to {provider.name}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    connectTwitter() {
        return dispatch(hashtagActions.connectTwitter())
    },
    connectFacebook() {
        return dispatch(hashtagActions.connectFacebook())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotConnectedDialog)
