import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import get from 'lodash/get'

import TwitterLogin from 'react-twitter-auth'
import FacebookLogin from 'components/FacebookLogin'
import Config from 'utils/config'
import Auth from 'utils/authHelpers'
import { connectOrDisconnectSocialAuth } from 'api/user'

import { actions as hashtagActions } from 'store/HashTag'

import s from './HashTag.scss'

class NotConnectedDialog extends Component {
    static propTypes = {
        className: PropTypes.string,
        provider: PropTypes.object.isRequired
    }

    state = {
        connectRequested: false,
        isLoading: false,
        hasError: false
    }

    handleSocialConnect = (token, backend) => {
        const datas = {
            req_type: 'connect',
            access_token: Auth.getToken(),
            provider: backend,
            provider_access_token: token
        }

        this.setState({ isLoading: true, hasError: false })
        connectOrDisconnectSocialAuth(datas).then(() => {
            this.setState({ isLoading: false })
            this.props.fetchProviders()
        }).catch(err =>
            this.setState({
                isLoading: false,
                hasError: get(err, 'error', '')
            })
        )
    }

    handleTwitterConnect = res => {
        this.setState({ isLoading: true, hasError: false })
        if (res.status === 200) {
            res.json().then(data => {
                this.setState({ isLoading: false })
                this.props.fetchProviders()
            })
        } else {
            res.json().then(data => {
                this.setState({
                    isLoading: false,
                    hasError: get(data, 'error', '')
                })
            })
        }
    }

    renderConnectButton = () => {
        const { provider } = this.props
        const { isLoading } = this.state

        const _button = (
            <div className={`btn btn-provider ${provider.className}`} onClick={this.onConnectClick}>
                <div className='provider-icon'>
                    <i className={`fa fa-${provider.icon}`} />
                </div>
                <div className='provider-name'>
                    Connect to {provider.name}
                    {isLoading && <i className='fa fa-spinner fa-pulse fa-fw' />}
                </div>
            </div>
        )

        const twitterLoginUrl = Config.get('API_ROOT') + '/profile/socialauths/connecttwitter/'
        const twitterRequestTokenUrl = Config.get('API_ROOT') + '/auth/twitter/getrequesttoken/'

        return (
            provider.name === 'Twitter'
                ? <TwitterLogin
                    tag="div"
                    loginUrl={twitterLoginUrl}
                    requestTokenUrl={twitterRequestTokenUrl}
                    customHeaders={{
                        'access-token': Auth.getToken()
                    }}
                    onSuccess={this.handleTwitterConnect}
                    onFailure={err => console.error(err)}> {_button} </TwitterLogin>
                : <FacebookLogin
                    tag="div"
                    handleFacebookLogin={
                        this.handleSocialConnect
                    }> {_button} </FacebookLogin>
        )
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
                    {this.renderConnectButton()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    fetchProviders() {
        return dispatch(hashtagActions.fetchProviders())
    },
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
