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
    const { email, error, onClickEdit, onClickUpdate } = props
    return (
        <Fragment>
            <div className="email-item mb-3">
                <div>
                    <div>
                        <p>Email Type </p>
                    </div>
                    <div>
                        <p>{email.email}</p>
                    </div>
                    {email.id === error.id && (
                        <p className="text-danger">{error.error}</p>
                    )}
                    <div className='mt-1 d-flex align-items-center justify-content-between'>
                        <div>
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
                        <div>
                            <div className='badge badge-pill badge-warning' onClick={onClickEdit}>Edit</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const EmailEditComponent = props => {
    const {
        emailValue,
        isEditing,
        isEditable,
        onClickAddNew,
        onClickCancel,
        onClickDelete,
        onChangeEmailInput,
        emailInputError,
        onClickSave,
        email,
        onClickUpdate
    } = props
    return (
        <div className="email-item">
            {isEditing || isEditable ? (
                <Fragment>
                    <div>
                        <div className='d-flex flex-1 align-items-center'>
                            <div className='email-icon'>
                                <i className='fa fa-envelope-o' />
                            </div>
                            <EmailTypeDropdown
                                className='email-add-type-dropdown'
                                onChange={noop}
                            />
                        </div>
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
                    </div>
                    <div className='d-flex align-items-center mb-2 justify-content-between'>
                        <div className='flex-1'>
                            {isEditable && <div
                                className={`badge badge-pill ${email.primary ? 'badge-info' : 'badge-light'}`}
                                onClick={email.primary ? null : () => onClickUpdate(email.id)}>
                                Primary
                            </div>}
                            {isEditable && <div
                                className={`badge badge-pill ${email.verified ? 'badge-success' : 'badge-light'}`}>
                                Verify
                            </div>}
                        </div>
                        <div>
                            {isEditable && !email.primary && (
                                <div
                                    className="badge badge-delete badge-pill badge-dark"
                                    onClick={() => onClickDelete(email.id)}>
                                    <i className='fa fa-trash' />
                                </div>
                            )}
                            <div className='badge badge-pill badge-dark' onClick={onClickSave}>
                                <i className='fa fa-check' />
                            </div>
                            <div className='badge badge-pill badge-dark' onClick={onClickCancel}>
                                <i className='fa fa-remove' />
                            </div>
                        </div>
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
        editableIndex: null
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

    setEditable = (email, editableIndex) => {
        this.setState({
            editableIndex,
            isEditing: true,
            emailInput: email.email
        })
    }

    cancelEditable = () => {
        this.setState({
            editableIndex: null,
            isEditing: false,
            emailInput: '',
            emailInputError: ''
        })
    }

    render() {
        return (
            <CardContent className='details-section'>
                <div className="title">My Emails</div>
                <br />
                {this.props.emails.map((x, i) => (
                    this.state.editableIndex === i
                        ? <EmailEditComponent
                            key={i}
                            email={x}
                            emailValue={this.state.emailInput}
                            isEditable={true}
                            onChangeEmailInput={this.onChangeEmailInput}
                            onClickSave={this.onClickUpdate}
                            onClickDelete={this.onClickDelete}
                            onClickCancel={this.cancelEditable}
                            emailInputError={this.state.emailInputError} />
                        : <EmailComponent
                            email={x}
                            key={i}
                            onClickEdit={() => this.setEditable(x, i)}
                            onClickDelete={this.onClickDelete}
                            onClickUpdate={this.onClickUpdate}
                            error={this.state.emailError} />
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
