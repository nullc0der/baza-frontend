import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { CardContent } from 'components/ui/CardWithTabs'
import PhoneNumberField from 'components/ui/PhoneNumberField'
import PhoneTypeDropdown from 'components/PhoneTypeDropdown'
import TextField from 'components/ui/TextField'

import { sendPhoneVerification, validatePhone } from 'api/user'

import s from './DetailsCard.scss'

import { actions as userProfileActions } from 'store/UserProfile'

const PhoneVerificationField = props => {
    const {
        phoneNumber,
        verificationFieldValue,
        verificationFieldError,
        onClickCancel,
        onClickVerify,
        onClickResend,
        onVerificationFieldUpdate
    } = props
    const cx = classnames(s.phoneField, 'phone-number')

    return (
        <div className={cx}>
            <TextField
                id="verificationField"
                label={`Enter the verification code sent to ${phoneNumber}`}
                value={verificationFieldValue}
                onChange={onVerificationFieldUpdate}
                errorState={verificationFieldError}
            />
            <div
                className={`d-flex align-items-center justify-content-between ${
                    verificationFieldError ? 'mt-3' : 'mt-1'
                }`}>
                <div className="badge badge-warning" onClick={onClickResend}>
                    Resend Code
                </div>
                <div className="flex-1" />
                <div
                    className="badge badge-pill badge-dark badge-dense"
                    onClick={onClickVerify}
                    title="Submit">
                    <i className="fa fa-check" />
                </div>
                <div
                    className="badge badge-pill badge-dark badge-dense"
                    onClick={onClickCancel}
                    title="cancel">
                    <i className="fa fa-times" />
                </div>
            </div>
        </div>
    )
}

const PhoneField = props => {
    const {
        phoneNumber,
        onClickEdit,
        onClickSetPrimary,
        onClickVerification
    } = props

    const cx = classnames(s.phoneField, 'phone-number')

    return (
        <div className={cx}>
            <div className="phone-type-col">
                <i className="fa fa-phone" />
                <span className="ml-2 text-capitalize">
                    {phoneNumber.phone_number_type}
                </span>
            </div>
            <div className="phone-number-value">
                {phoneNumber.phone_number_country_code +
                    phoneNumber.phone_number}{' '}
            </div>
            <div className="d-flex align-items-center justify-content-between mt-1">
                <div>
                    <div
                        className={`badge ${
                            phoneNumber.primary ? 'badge-info' : 'badge-light'
                        }`}
                        onClick={() =>
                            !phoneNumber.primary &&
                            onClickSetPrimary(phoneNumber.id)
                        }>
                        Primary
                    </div>
                    <div
                        className={`badge ${
                            phoneNumber.verified
                                ? 'badge-success'
                                : 'badge-light'
                        }`}
                        onClick={() =>
                            !phoneNumber.verified &&
                            onClickVerification(phoneNumber.id)
                        }>
                        {phoneNumber.verified ? 'Verified' : 'Verify'}
                    </div>
                </div>
                <div className="badge badge-warning" onClick={onClickEdit}>
                    {' '}
                    Edit{' '}
                </div>
            </div>
        </div>
    )
}

class PhoneAddField extends Component {
    state = {
        phoneTypeSelected: null,
        phoneNumber: null,
        phoneNumberDialCode: null
    }

    componentWillReceiveProps = nextProps => {}

    render() {
        const {
            isNew = false,
            onPhoneInputChange,
            onPhoneTypeClick,
            phoneTypeSelected,
            phoneNumberValue,
            phoneNumberDialCodeValue,
            onClickSave,
            onClickCancel,
            onClickDelete,
            errors
        } = this.props

        const phoneType = this.state.phoneTypeSelected || phoneTypeSelected
        const phoneNumber = this.state.phoneNumber || phoneNumberValue
        const phoneNumberDialCode = this.state.phoneNumberDialCode || phoneNumberDialCodeValue

        return (
            <div className="phone-add-field phone-input mt-2">
                <div className="d-flex align-items-center">
                    <div className="phone-icon">
                        <i className="fa fa-phone" />
                    </div>
                    <PhoneTypeDropdown
                        className="phone-type-dropdown flex-1"
                        value={phoneType}
                        onChange={onPhoneTypeClick}
                        errorState={
                            errors.phoneNumberType &&
                            'Please select phone number type'
                        }
                    />
                </div>
                <div className="d-flex align-items-center">
                    <PhoneNumberField
                        showIcon={false}
                        label=""
                        phoneNumber={phoneNumber}
                        dialCode={phoneNumberDialCode}
                        className="phone-number-field"
                        placeholder="Phone Number"
                        onChange={onPhoneInputChange}
                        errorState={errors.phoneNumber}
                        disabled={!isNew}
                    />
                </div>
                <div
                    className={`d-flex align-items-center justify-content-between ${
                        errors.phoneNumber ? 'mt-3' : 'mt-1'
                    } `}>
                    <div className="flex-1" />
                    <div>
                        {typeof onClickDelete === 'function' && (
                            <div
                                className="badge badge-pill badge-dark badge-dense"
                                onClick={onClickDelete}
                                title="Delete">
                                <i className="fa fa-trash-o" />
                            </div>
                        )}
                        <div
                            className="badge badge-pill badge-dark badge-dense"
                            onClick={onClickSave}
                            title="Save">
                            <i className="fa fa-check" />
                        </div>
                        <div
                            className="badge badge-pill badge-dark badge-dense"
                            onClick={onClickCancel}
                            title="Cancel">
                            <i className="fa fa-remove" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class PhoneDetails extends Component {
    state = {
        phoneNumber: '',
        phoneNumberDialCode: '',
        phoneNumberType: '',
        verificationFieldValue: '',
        addPhoneNumberShown: false,
        phoneNumberError: null,
        phoneNumberTypeError: null,
        verificationFieldError: null,
        editableIndex: null,
        verificationIndex: null
    }

    componentDidMount() {
        this.props
            .fetchPhoneNumbers()
            .then(res => {})
            .catch(res => {})
    }

    onClickSave = () => {
        this.props
            .savePhoneNumber({
                phone_number: this.state.phoneNumber,
                phone_number_country_code: this.state.phoneNumberDialCode,
                phone_number_type: this.state.phoneNumberType
            })
            .then(res => {
                this.setState({
                    addPhoneNumberShown: false,
                    phoneNumber: '',
                    phoneNumberType: ''
                })
            })
            .catch(res => {
                this.setState({
                    phoneNumberError: get(res, 'phone_number', null),
                    phoneNumberTypeError: get(res, 'phone_number_type', null)
                })
            })
    }

    onClickDelete = phoneNumberID => {
        this.props
            .deletePhoneNumber({
                id: phoneNumberID
            })
            .then(res => {
                this.cancelEditable()
            })
            .catch(res => {})
    }

    onClickSetPrimary = phoneNumberID => {
        this.props
            .updatePhoneNumber({
                id: phoneNumberID,
                primary: true
            })
            .then(res => {})
            .catch(res => {})
    }

    onChangePhoneNumber = (id, data) => {
        this.setState({
            phoneNumber: data.phoneNumber,
            phoneNumberDialCode: data.phoneNumberDialCode
        })
    }

    onClickPhoneNumberType = numberType => {
        this.setState({
            phoneNumberType: numberType
        })
    }

    onClickUpdate = phoneNumberID => {
        this.props
            .updatePhoneNumber({
                id: phoneNumberID,
                phone_number_type: this.state.phoneNumberType
            })
            .then(res => {
                this.cancelEditable()
            })
            .catch(res => {
                this.setState({
                    error: get(res, 'non_field_errors', ''),
                    phoneNumberTypeError: get(res, 'phone_number_type', null)
                })
            })
    }

    onClickAdd = () => {
        this.setState({ addPhoneNumberShown: true })
    }

    onClickAddCancel = () => {
        this.setState({ addPhoneNumberShown: false })
    }

    setEditable = (phone, editableIndex) => {
        this.setState({
            editableIndex,
            phoneNumberType: phone.phone_number_type,
            phoneNumber: phone.phone_number,
            phoneNumberDialCode: phone.phone_number_country_code
        })
    }

    onClickPhoneNumberType = value => {
        this.setState({
            phoneNumberType: value
        })
    }

    cancelEditable = () => {
        this.setState({
            editableIndex: null,
            phoneNumber: '',
            phoneNumberType: '',
            phoneNumberError: null,
            phoneNumberTypeError: null
        })
    }

    onClickVerification = phoneNumberID => {
        sendPhoneVerification(phoneNumberID)
            .then(() =>
                this.setState({
                    verificationIndex: phoneNumberID,
                    verificationFieldValue: '',
                    verificationFieldError: null
                })
            )
            .catch(() => {})
    }

    onPhoneVerificationCancel = () => {
        this.setState({
            verificationIndex: null,
            verificationFieldValue: '',
            verificationFieldError: null
        })
    }

    onPhoneVerificationFieldUpdate = (id, value) => {
        this.setState({
            verificationFieldValue: value
        })
    }

    onPhoneVerificationVerify = () => {
        validatePhone({
            verification_code: this.state.verificationFieldValue
        })
            .then(res => {
                this.onPhoneVerificationCancel()
                this.props.updatePhoneNumberSuccess(res)
            })
            .catch(res => {
                this.setState({
                    verificationFieldError: get(res, 'verification_code', null)
                })
            })
    }

    render() {
        return (
            <CardContent>
                <div className="details-section">
                    <div className="title">CONTACT</div>
                    <div className="details-list phone-section mt-2">
                        {this.props.phoneNumbers.map((x, i) =>
                            this.state.editableIndex === i ? (
                                <PhoneAddField
                                    key={i}
                                    phoneNumberValue={this.state.phoneNumber}
                                    phoneNumberDialCodeValue={this.state.phoneNumberDialCode}
                                    phoneTypeSelected={
                                        this.state.phoneNumberType
                                    }
                                    onPhoneInputChange={
                                        this.onChangePhoneNumber
                                    }
                                    onPhoneTypeClick={
                                        this.onClickPhoneNumberType
                                    }
                                    onClickDelete={() =>
                                        this.onClickDelete(x.id)
                                    }
                                    onClickSave={() => this.onClickUpdate(x.id)}
                                    onClickCancel={this.cancelEditable}
                                    errors={{
                                        phoneNumber: this.state
                                            .phoneNumberError,
                                        phoneNumberType: this.state
                                            .phoneNumberTypeError
                                    }}
                                />
                            ) : this.state.verificationIndex === x.id ? (
                                <PhoneVerificationField
                                    key={i}
                                    phoneNumber={x.phone_number}
                                    verificationFieldValue={
                                        this.state.verificationFieldValue
                                    }
                                    verificationFieldError={
                                        this.state.verificationFieldError
                                    }
                                    onClickCancel={
                                        this.onPhoneVerificationCancel
                                    }
                                    onClickVerify={
                                        this.onPhoneVerificationVerify
                                    }
                                    onClickResend={() =>
                                        this.onClickVerification(x.id)
                                    }
                                    onVerificationFieldUpdate={
                                        this.onPhoneVerificationFieldUpdate
                                    }
                                />
                            ) : (
                                <PhoneField
                                    key={i}
                                    phoneNumber={x}
                                    onClickEdit={() => this.setEditable(x, i)}
                                    onClickDelete={this.onClickDelete}
                                    onClickSetPrimary={this.onClickSetPrimary}
                                    onClickVerification={
                                        this.onClickVerification
                                    }
                                />
                            )
                        )}
                        {this.state.addPhoneNumberShown && (
                            <PhoneAddField
                                isNew={true}
                                phoneTypeSelected={this.state.phoneNumberType}
                                onPhoneInputChange={this.onChangePhoneNumber}
                                onPhoneTypeClick={this.onClickPhoneNumberType}
                                onClickSave={this.onClickSave}
                                onClickCancel={this.onClickAddCancel}
                                errors={{
                                    phoneNumber: this.state.phoneNumberError,
                                    phoneNumberType: this.state
                                        .phoneNumberTypeError
                                }}
                            />
                        )}
                        {!this.state.addPhoneNumberShown && (
                            <div
                                className="text-center"
                                onClick={this.onClickAdd}>
                                <span className="badge badge-light">
                                    Add More
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state => ({
    phoneNumbers: state.UserProfile.phoneNumbers,
    profile: state.UserProfile.profile
})

const mapDispatchToProps = dispatch => ({
    fetchPhoneNumbers() {
        return dispatch(userProfileActions.fetchProfilePhoneNumbers())
    },
    savePhoneNumber(datas) {
        return dispatch(userProfileActions.saveProfilePhoneNumber(datas))
    },
    deletePhoneNumber(datas) {
        return dispatch(userProfileActions.deleteProfilePhoneNumber(datas))
    },
    updatePhoneNumber(datas) {
        return dispatch(userProfileActions.updateProfilePhoneNumber(datas))
    },
    updatePhoneNumberSuccess(response) {
        return dispatch(
            userProfileActions.updateProfilePhoneNumbersuccess(response)
        )
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneDetails)
