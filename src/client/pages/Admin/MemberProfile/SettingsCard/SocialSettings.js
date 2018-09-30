import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'

import Auth from 'utils/authHelpers'
import { actions as userProfileActions } from 'store/UserProfile'

import { CardContent } from 'components/ui/CardWithTabs'
import TextField from 'components/ui/TextField'

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
        <div className="flex=horizontal align-items-center email-item">
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
        emailInputError: null
    }

    componentDidMount() {
        this.props
            .fetchEmails(Auth.getToken())
            .then(res => {})
            .catch(res => {})
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

    render() {
        return (
            <CardContent>
                <div className="settings-section">
                    <div className="section-title">Linked Social Accounts</div>
                    <div className="social-accounts-list">
                        <div className="social-account account-facebook">
                            <div className="social-account-icon">
                                <i className="fa fa-facebook" />
                            </div>
                            <div className="social-account-name">Facebook</div>
                        </div>
                        <div className="social-account account-google">
                            <div className="social-account-icon">
                                <i className="fa fa-google-plus" />
                            </div>
                            <div className="social-account-name">Google</div>
                        </div>
                        <div className="social-account account-new">
                            <div className="social-account-icon">
                                <i className="fa fa-plus" />
                            </div>
                            <div className="social-account-name">Add New</div>
                        </div>
                    </div>
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
