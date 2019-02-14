import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import TwitterLogin from 'react-twitter-auth'
import Config from 'utils/config'
import Auth from 'utils/authHelpers'
import { actions as userProfileActions } from 'store/UserProfile'
import { getSocialAuths, connectOrDisconnectSocialAuth } from 'api/user'

import { CardContent } from 'components/ui/CardWithTabs'
import FacebookLogin from 'components/FacebookLogin'
import GoogleLogin from 'components/GoogleLogin'

class SocialSettings extends Component {
    state = {
        connectedSocials: [],
        notConnectedSocials: [],
        socialError: ''
    }

    componentDidMount() {
        getSocialAuths(Auth.getToken())
            .then(res => {
                this.setConnectedAndNotConnectedSocials(res.data)
            })
            .catch(res => { })
    }

    setConnectedAndNotConnectedSocials = resData => {
        const notConnectedSocials = []
        const hasTwitter = resData.filter(x => x.provider === 'twitter')
        const hasGoogle = resData.filter(x => x.provider === 'google-plus')
        const hasFacebook = resData.filter(x => x.provider === 'facebook')
        if (!hasTwitter.length) {
            notConnectedSocials.push('twitter')
        }
        if (!hasGoogle.length) {
            notConnectedSocials.push('google-plus')
        }
        if (!hasFacebook.length) {
            notConnectedSocials.push('facebook')
        }
        this.setState({
            connectedSocials: resData,
            notConnectedSocials: notConnectedSocials,
            socialError: ''
        })
    }



    handleSocialConnect = (token, backend) => {
        const datas = {
            req_type: 'connect',
            access_token: Auth.getToken(),
            provider: backend,
            provider_access_token: token
        }
        connectOrDisconnectSocialAuth(datas)
            .then(res => this.setConnectedAndNotConnectedSocials(res.data))
            .catch(err =>
                this.setState({
                    socialError: get(err, 'error', '')
                })
            )
    }

    handleTwitterConnect = res => {
        if (res.status === 200) {
            res.json().then(data => {
                this.setConnectedAndNotConnectedSocials(data)
            })
        } else {
            res.json().then(data => {
                this.setState({
                    socialError: get(data, 'error', '')
                })
            })
        }
    }

    onClickDisconnect = (id, provider) => {
        const datas = {
            req_type: 'disconnect',
            access_token: Auth.getToken(),
            provider: provider,
            association_id: id
        }
        connectOrDisconnectSocialAuth(datas)
            .then(res => this.setConnectedAndNotConnectedSocials(res.data))
            .catch(err =>
                this.setState({
                    socialError: get(err, 'error', '')
                })
            )
    }

    render() {
        const twitterLoginUrl = Config.get('API_ROOT') + '/profile/socialauths/connecttwitter/'
        const twitterRequestTokenUrl = Config.get('API_ROOT') + '/auth/twitter/getrequesttoken/'
        return (
            <CardContent>
                <div className="details-section">
                    <div className="title">Social Accounts</div>
                    <br />
                    <div className="social-accounts-list">
                        {!!this.state.connectedSocials &&
                            this.state.connectedSocials.map((x, i) => (
                                <div
                                    className={`social-account account-${
                                        x.provider
                                        }`}
                                    onClick={() =>
                                        this.onClickDisconnect(x.id, x.provider)
                                    }
                                    key={i}>
                                    <div className="social-account-icon">
                                        <i className={`fa fa-${x.provider}`} />
                                    </div>
                                    <div className="social-account-name text-capitalize">
                                        {x.provider.split('-')[0]}
                                    </div>
                                </div>
                            ))}
                        {!!this.state.notConnectedSocials &&
                            this.state.notConnectedSocials.map((x, i) => {
                                return x === 'google-plus' ? (
                                    <GoogleLogin
                                        key={i}
                                        tag="div"
                                        handleGoogleLogin={
                                            this.handleSocialConnect
                                        }>
                                        <div
                                            className="social-account account-new"
                                            key={i}>
                                            <div className="social-account-icon">
                                                <i className="fa fa-google" />
                                            </div>
                                            <div className="social-account-name">
                                                Google
                                            </div>
                                        </div>
                                    </GoogleLogin>
                                ) : x === 'facebook' ? (
                                    <FacebookLogin
                                        key={i}
                                        tag="div"
                                        handleFacebookLogin={
                                            this.handleSocialConnect
                                        }>
                                        <div
                                            className="social-account account-new"
                                            key={i}>
                                            <div className="social-account-icon">
                                                <i className="fa fa-facebook" />
                                            </div>
                                            <div className="social-account-name">
                                                Facebook
                                            </div>
                                        </div>
                                    </FacebookLogin>
                                ) : (
                                            <TwitterLogin
                                                key={i}
                                                tag="div"
                                                loginUrl={twitterLoginUrl}
                                                requestTokenUrl={twitterRequestTokenUrl}
                                                customHeaders={{
                                                    'access-token': Auth.getToken()
                                                }}
                                                onSuccess={this.handleTwitterConnect}
                                                onFailure={err => console.log(err)}>
                                                <div
                                                    className="social-account account-new"
                                                    key={i}>
                                                    <div className="social-account-icon">
                                                        <i className="fa fa-twitter" />
                                                    </div>
                                                    <div className="social-account-name">
                                                        Twitter
                                            </div>
                                                </div>
                                            </TwitterLogin>
                                        )
                            })}
                    </div>
                    {!!this.state.socialError && (
                        <p className="text-danger">{this.state.socialError}</p>
                    )}
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    emails: state.UserProfile.profileEmails
})

const mapDispatchToProps = dispatch => ({
    fetchEmails(access_token) {
        return dispatch(userProfileActions.fetchProfileEmails(access_token))
    },
    saveEmail(datas) {
        return dispatch(userProfileActions.saveProfileEmail(datas))
    },
    deleteEmail(datas) {
        return dispatch(userProfileActions.deleteProfileEmail(datas))
    },
    updateEmail(datas) {
        return dispatch(userProfileActions.updateProfileEmail(datas))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialSettings)
