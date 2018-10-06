import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import TwitterLogin from 'react-twitter-auth'

import Auth from 'utils/authHelpers'
import { actions as userProfileActions } from 'store/UserProfile'
import { getSocialAuths, connectOrDisconnectSocialAuth } from 'api/user'

import { CardContent } from 'components/ui/CardWithTabs'
import TextField from 'components/ui/TextField'
import FacebookLogin from 'components/FacebookLogin'
import GoogleLogin from 'components/GoogleLogin'

const EmailComponent = props => {
    const { email, error, onClickDelete, onClickUpdate } = props
    return (
        <Fragment>
            <div className="flex-horizontal align-items-center email-item">
                <p>{email.email}</p>
                <div
                    className={`badge badge-pull ${
                        email.primary ? 'badge-info' : 'badge-light'
                    }`}
                    onClick={
                        email.primary ? null : () => onClickUpdate(email.id)
                    }>
                    Primary
                </div>
                <div
                    className={`badge badge-pull ${
                        email.verified ? 'badge-success' : 'badge-light'
                    }`}>
                    Verified
                </div>
                {!email.primary && (
                    <div
                        className="badge badge-pull badge-danger"
                        onClick={() => onClickDelete(email.id)}>
                        Delete
                    </div>
                )}
            </div>
            {email.id === error.id && (
                <p className="text-danger">{error.error}</p>
            )}
        </Fragment>
    )
}

const EmailEditComponent = props => {
    const {
        isEditing,
        onClickAddNew,
        onChangeEmailInput,
        emailInputError,
        onClickSave
    } = props
    return (
        <div className="email-item">
            {isEditing ? (
                <Fragment>
                    <TextField
                        id="email"
                        label="Email"
                        className={`${emailInputError ? 'mb-3' : 'mb-1'}`}
                        onChange={onChangeEmailInput}
                        errorState={emailInputError}
                    />
                    <div
                        className="btn btn-block btn-sm btn-dark"
                        onClick={onClickSave}>
                        Save
                    </div>
                </Fragment>
            ) : (
                <div className="add-new" onClick={onClickAddNew}>
                    <i className="fa fa-plus" />
                </div>
            )}
        </div>
    )
}

class SocialSettings extends Component {
    state = {
        isEditing: false,
        emailError: {
            id: null,
            error: ''
        },
        emailInput: '',
        emailInputError: null,
        connectedSocials: [],
        notConnectedSocials: [],
        socialError: ''
    }

    componentDidMount() {
        this.props
            .fetchEmails(Auth.getToken())
            .then(res => {})
            .catch(res => {})
        getSocialAuths(Auth.getToken())
            .then(res => {
                this.setConnectedAndNotConnectedSocials(res.data)
            })
            .catch(res => {})
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

    onChangeEmailInput = (id, value) => {
        this.setState({
            emailInput: value
        })
    }

    onClickSave = () => {
        const datas = {
            email: this.state.emailInput,
            access_token: Auth.getToken()
        }
        this.props
            .saveEmail(datas)
            .then(res => {
                this.setState({
                    isEditing: false
                })
            })
            .catch(res => {
                this.setState({
                    emailInputError: get(res, 'email', null)
                })
            })
    }

    onClickAddNew = () => {
        this.setState({
            isEditing: true
        })
    }

    onClickDelete = emailID => {
        this.props
            .deleteEmail({
                email_id: emailID,
                access_token: Auth.getToken()
            })
            .then(res => {})
            .catch(res => {
                this.setState({
                    emailError: {
                        id: emailID,
                        error: get(res, 'error', '')
                    }
                })
            })
    }

    onClickUpdate = emailID => {
        this.props
            .updateEmail({
                email_id: emailID,
                access_token: Auth.getToken()
            })
            .then(res => {})
            .catch(res => {
                this.setState({
                    emailError: {
                        id: emailID,
                        error: get(res, 'error', '')
                    }
                })
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
        const twitterLoginUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000/api/v1/profile/socialauths/connecttwitter/'
                : '/api/v1/profile/socialauths/connecttwitter/'
        const twitterRequestTokenUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000/api/v1/auth/twitter/getrequesttoken/'
                : '/api/v1/auth/twitter/getrequesttoken/'
        return (
            <CardContent>
                <div className="settings-section">
                    <div className="section-title">Social Accounts</div>
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
                <div className="settings-section">
                    <div className="section-title">My Emails</div>
                    {this.props.emails.map((x, i) => (
                        <EmailComponent
                            email={x}
                            key={i}
                            onClickDelete={this.onClickDelete}
                            onClickUpdate={this.onClickUpdate}
                            error={this.state.emailError}
                        />
                    ))}
                    <EmailEditComponent
                        isEditing={this.state.isEditing}
                        onClickAddNew={this.onClickAddNew}
                        onChangeEmailInput={this.onChangeEmailInput}
                        onClickSave={this.onClickSave}
                        emailInputError={this.state.emailInputError}
                    />
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
