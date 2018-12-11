import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import find from 'lodash/find'
import TextField from 'components/ui/TextField'
import { CardContent } from 'components/ui/CardWithTabs'

import Auth from 'utils/authHelpers'

import { actions as userProfileActions } from 'store/UserProfile'
import EmailTypeDropdown from 'components/EmailTypeDropdown'

const EMAIL_TYPE_OPTIONS = [
    { label: 'Home Email', value: 'home' },
    { label: 'Office Email', value: 'office' },
    { label: 'Emergency Email', value: 'emergency' },
    { label: 'Mobile Email', value: 'mobile' }
]

const EmailComponent = props => {
    const { email, error, onClickEdit, onClickSetPrimary } = props
    return (
        <Fragment>
            <div className="email-item mb-3">
                <div>
                    <div>
                        <p>
                            {
                                find(EMAIL_TYPE_OPTIONS, {
                                    value: email.email_type
                                }).label
                            }
                        </p>
                    </div>
                    <div>
                        <p>{email.email}</p>
                    </div>
                    {email.id === error.id && (
                        <p className="text-danger email-item-error">
                            {error.error}
                        </p>
                    )}
                    <div className="mt-1 d-flex align-items-center justify-content-between">
                        <div>
                            <div
                                className={`badge badge-pill ${
                                    email.primary ? 'badge-info' : 'badge-light'
                                }`}
                                onClick={
                                    email.primary
                                        ? undefined
                                        : () =>
                                              onClickSetPrimary(
                                                  email.id,
                                                  !email.primary
                                              )
                                }>
                                Primary
                            </div>
                            <div
                                className={`badge badge-pill ${
                                    email.verified
                                        ? 'badge-success'
                                        : 'badge-light'
                                }`}>
                                Verified
                            </div>
                        </div>
                        <div>
                            <div
                                className="badge badge-pill badge-warning"
                                onClick={onClickEdit}>
                                Edit
                            </div>
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
        emailType,
        isEditing,
        isEditable,
        onClickAddNew,
        onClickCancel,
        onClickDelete,
        onChangeEmailInput,
        emailInputError,
        emailTypeError,
        onClickSave,
        email,
        onClickUpdate,
        onChangeEmailType,
        onClickResendEmailvalidation
    } = props
    return (
        <div className="email-item">
            {isEditing || isEditable ? (
                <Fragment>
                    <div>
                        <div className="d-flex flex-1 align-items-center">
                            <div className="email-icon">
                                <i className="fa fa-envelope-o" />
                            </div>
                            <EmailTypeDropdown
                                className="email-add-type-dropdown"
                                value={emailType}
                                onChange={onChangeEmailType}
                                errorState={emailTypeError}
                            />
                        </div>
                        <div className="d-flex flex-1 align-items-center">
                            <TextField
                                id="email"
                                placeholder="Email"
                                className={`${
                                    emailInputError ? 'mb-3' : 'mb-1'
                                }`}
                                onChange={onChangeEmailInput}
                                errorState={emailInputError}
                                value={emailValue}
                                disabled={isEditable}
                            />
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-2 justify-content-between">
                        <div className="flex-1">
                            {isEditable && (
                                <div
                                    className={`badge badge-pill ${
                                        email.primary
                                            ? 'badge-info'
                                            : 'badge-light'
                                    }`}
                                    onClick={
                                        email.primary
                                            ? undefined
                                            : () => onClickUpdate(email.id)
                                    }>
                                    Primary
                                </div>
                            )}
                            {isEditable && (
                                <div
                                    className={`badge badge-pill ${
                                        email.verified
                                            ? 'badge-success'
                                            : 'badge-warning'
                                    }`}
                                    onClick={() =>
                                        onClickResendEmailvalidation(
                                            email.email,
                                            email.id
                                        )
                                    }>
                                    {email.verified
                                        ? 'Verified'
                                        : 'Send verification'}
                                </div>
                            )}
                        </div>
                        <div>
                            {isEditable && !email.primary && (
                                <div
                                    className="badge badge-delete badge-pill badge-dark"
                                    onClick={() => onClickDelete(email.id)}>
                                    <i className="fa fa-trash" />
                                </div>
                            )}
                            <div
                                className="badge badge-pill badge-dark"
                                onClick={onClickSave}>
                                <i className="fa fa-check" />
                            </div>
                            <div
                                className="badge badge-pill badge-dark"
                                onClick={onClickCancel}>
                                <i className="fa fa-remove" />
                            </div>
                        </div>
                    </div>
                </Fragment>
            ) : (
                <div className="text-center">
                    <div
                        className="badge badge-pill badge-light"
                        onClick={onClickAddNew}>
                        Add More
                    </div>
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
        emailType: '',
        emailTypeError: null,
        editableIndex: null
    }

    componentDidMount = () => {
        this.props
            .fetchEmails()
            .then(res => {})
            .catch(res => {})
    }

    onChangeEmailInput = (id, value) => {
        this.setState({
            emailInput: value
        })
    }

    onChangeEmailType = value => {
        this.setState({
            emailType: value
        })
    }

    onClickSave = () => {
        const datas = {
            email: this.state.emailInput,
            email_type: this.state.emailType
        }
        this.props
            .saveEmail(datas)
            .then(res => {
                this.setState({
                    isEditing: false,
                    emailInput: '',
                    emailInputError: '',
                    emailType: '',
                    emailTypeError: ''
                })
            })
            .catch(res => {
                this.setState({
                    emailInputError: get(res, 'email', null),
                    emailTypeError: get(res, 'email_type', null)
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
                email_id: emailID
            })
            .then(res => {
                this.cancelEditable()
            })
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
                email_type: this.state.emailType
            })
            .then(res => {
                this.cancelEditable()
            })
            .catch(res => {
                this.setState({
                    error: get(res, 'non_field_errors', ''),
                    emailTypeError: get(res, 'email_type', null)
                })
            })
    }

    onClickSetPrimary = (emailID, primary) => {
        this.props
            .updateEmail({
                email_id: emailID,
                primary
            })
            .then(res => {})
            .catch(res => {
                this.setState({
                    emailError: {
                        id: emailID,
                        error: get(res, 'non_field_errors', '')
                    }
                })
            })
    }

    setEditable = (email, editableIndex) => {
        this.setState({
            editableIndex,
            isEditing: true,
            emailInput: email.email,
            emailType: email.email_type
        })
    }

    cancelEditable = () => {
        this.setState({
            editableIndex: null,
            isEditing: false,
            emailInput: '',
            emailInputError: '',
            emailType: '',
            emailTypeError: ''
        })
    }

    onClickResendEmailvalidation = (email, emailID) => {
        Auth.resendEmailValidation(email)
            .then(res =>
                this.setState(
                    {
                        emailError: {
                            id: emailID,
                            error: `A verification email sent to ${email}`
                        }
                    },
                    () => this.cancelEditable()
                )
            )
            .catch(res =>
                this.setState(
                    {
                        emailError: {
                            id: emailID,
                            error: 'Something went wrong, please try later'
                        }
                    },
                    () => this.cancelEditable()
                )
            )
    }

    render() {
        return (
            <CardContent className="details-section">
                <div className="title">My Emails</div>
                <br />
                {this.props.emails.map((x, i) =>
                    this.state.editableIndex === i ? (
                        <EmailEditComponent
                            key={i}
                            email={x}
                            emailValue={this.state.emailInput}
                            isEditable={true}
                            onChangeEmailInput={this.onChangeEmailInput}
                            onClickSave={() => this.onClickUpdate(x.id)}
                            onClickDelete={this.onClickDelete}
                            onClickCancel={this.cancelEditable}
                            emailInputError={this.state.emailInputError}
                            emailType={this.state.emailType}
                            emailTypeError={this.state.emailTypeError}
                            onChangeEmailType={this.onChangeEmailType}
                            onClickResendEmailvalidation={
                                this.onClickResendEmailvalidation
                            }
                        />
                    ) : (
                        <EmailComponent
                            email={x}
                            key={i}
                            onClickEdit={() => this.setEditable(x, i)}
                            onClickDelete={this.onClickDelete}
                            onClickSetPrimary={this.onClickSetPrimary}
                            error={this.state.emailError}
                        />
                    )
                )}
                {this.state.editableIndex === null && (
                    <EmailEditComponent
                        emailValue={this.state.emailInput}
                        isEditing={this.state.isEditing}
                        onClickAddNew={this.onClickAddNew}
                        onClickCancel={this.onClickAddNewCancel}
                        onChangeEmailInput={this.onChangeEmailInput}
                        onClickSave={this.onClickSave}
                        emailInputError={this.state.emailInputError}
                        emailType={this.state.emailType}
                        emailTypeError={this.state.emailTypeError}
                        onChangeEmailType={this.onChangeEmailType}
                    />
                )}
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
