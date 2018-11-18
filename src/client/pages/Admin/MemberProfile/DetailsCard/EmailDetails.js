import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Auth from 'utils/authHelpers'
import TextField from 'components/ui/TextField'
import { CardContent } from 'components/ui/CardWithTabs'

import { actions as userProfileActions } from 'store/UserProfile'
import EmailTypeDropdown from 'components/EmailTypeDropdown';
import noop from 'lodash/noop'

const EmailComponent = props => {
    const { email, error, onClickDelete, onClickUpdate } = props
    return (
        <Fragment>
            <div className="email-item mb-3">
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        <p>Email Type </p>
                    </div>
                    <div className='col-md-8 text-right'>
                        <div
                            className={`badge badge-pill ${email.primary ? 'badge-info' : 'badge-light'}`}
                            onClick={email.primary ? null : () => onClickUpdate(email.id)}>
                            Primary
                        </div>
                        <div
                            className={`badge badge-pill ${email.verified ? 'badge-success' : 'badge-light'}`}>
                            Verified
                        </div>
                    </div>
                </div>
                <div className='row no-gutters mt-1'>
                    <div className='col-md-5'>
                        <p>{email.email}</p>
                    </div>
                    <div className='col-md-7 text-right'>
                        <div className='badge badge-pill badge-warning'>Edit</div>
                        {!email.primary && (
                            <div
                                className="badge badge-delete badge-pill badge-danger"
                                onClick={() => onClickDelete(email.id)}>
                                <i className='fa fa-trash' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {email.id === error.id && (
                <p className="text-danger">{error.error}</p>
            )}
        </Fragment>
    )
}

const EmailEditComponent = props => {
    const {
        emailValue,
        isEditing,
        onClickAddNew,
        onClickCancel,
        onChangeEmailInput,
        emailInputError,
        onClickSave
    } = props
    return (
        <div className="email-item">
            {isEditing ? (
                <Fragment>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex flex-1 align-items-center'>
                            <div className='email-icon'>
                                <i className='fa fa-envelope-o' />
                            </div>
                            <EmailTypeDropdown
                                className='email-add-type-dropdown'
                                onChange={noop}
                            />
                        </div>
                        <div className='badge badge-pill badge-success' onClick={onClickSave}>Save</div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex flex-1 align-items-center'>
                            <TextField
                                id="email"
                                placeholder='Email'
                                className={`${emailInputError ? 'mb-3' : 'mb-1'}`}
                                onChange={onChangeEmailInput}
                                errorState={emailInputError}
                                value={emailValue}
                            />
                        </div>
                        <div className='badge badge-pill badge-danger' onClick={onClickCancel}>Cancel</div>
                    </div>
                </Fragment>
            ) : (
                    <div className="text-center">
                        <div className='badge badge-pill badge-light' onClick={onClickAddNew}>Add More</div>
                    </div>
                )}
        </div>
    )
}

class EmailDetails extends Component {
    state = {
        isEditing: false,
        emailError: {
            id: null,
            error: ''
        },
        emailInput: '',
        emailInputError: null,
    }

    componentDidMount = () => {
        this.props
            .fetchEmails(Auth.getToken())
            .then(res => { })
            .catch(res => { })
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
        this.setState({ isEditing: true })
    }

    onClickAddNewCancel = () => {
        this.setState({ isEditing: false })
    }

    onClickDelete = emailID => {
        this.props
            .deleteEmail({
                email_id: emailID,
                access_token: Auth.getToken()
            })
            .then(res => { })
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
            .then(res => { })
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
            <CardContent className='details-section'>
                <div className="title">My Emails</div>
                <br />
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
                    emailValue={this.state.emailInput}
                    isEditing={this.state.isEditing}
                    onClickAddNew={this.onClickAddNew}
                    onClickCancel={this.onClickAddNewCancel}
                    onChangeEmailInput={this.onChangeEmailInput}
                    onClickSave={this.onClickSave}
                    emailInputError={this.state.emailInputError}
                />
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
)(EmailDetails)
