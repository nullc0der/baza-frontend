import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { CardContent } from 'components/ui/CardWithTabs'
import PhoneNumberField from 'components/ui/PhoneNumberField'
import PhoneTypeDropdown from 'components/PhoneTypeDropdown'
import s from './DetailsCard.scss'

import { actions as userProfileActions } from 'store/UserProfile'

const PhoneField = props => {
    const { phoneNumber, onClickEdit, onClickSetPrimary } = props

    // const icons = {
    //     home: 'fa fa-home',
    //     emergency: 'fa fa-exclamation-triangle',
    //     office: 'fa fa-building',
    //     mobile: 'fa fa-mobile'
    // }

    // const badgeClass = {
    //     home: 'badge-info',
    //     emergency: 'badge-danger',
    //     office: 'badge-success',
    //     mobile: 'badge-warning'
    // }

    const cx = classnames(s.phoneField, 'phone-number')

    return (
        <div className={cx}>
            <div className='phone-type-col'>
                <i className='fa fa-phone' />
                <span className='ml-2 text-capitalize'>{phoneNumber.phone_number_type}</span>
            </div>
            <div className='phone-number-value'>{phoneNumber.phone_number} </div>
            <div className='d-flex align-items-center justify-content-between mt-1'>
                <div>
                    {phoneNumber.primary && (
                        <div
                            className="badge badge-info">
                            Primary
                                {/* <i className="fa fa-check" title="set primary" /> */}
                        </div>
                    )}

                    <div
                        className={`badge ${phoneNumber.verified ? 'badge-success' : 'badge-light'}`}
                        onClick={() => phoneNumber.verified && onClickSetPrimary(phoneNumber.id)}>
                        {phoneNumber.verified ? 'Verified' : 'Unverified'}
                        {/* <i className="fa fa-check" title="set primary" /> */}
                    </div>

                </div>
                <div className="badge badge-warning" onClick={onClickEdit}> Edit </div>
            </div>
        </div>
    )
}



class PhoneAddField extends Component {
    state = {
        phoneTypeSelected: null,
        phoneNumber: null
    }

    componentWillReceiveProps = (nextProps) => {

    }

    render() {
        const {
            onPhoneInputChange,
            onPhoneTypeClick,
            phoneTypeSelected,
            phoneNumberValue,
            onClickSave,
            onClickCancel,
            onClickDelete,
            errors
        } = this.props

        const phoneType = this.state.phoneTypeSelected || phoneTypeSelected
        const phoneNumber = this.state.phoneNumber || phoneNumberValue

        return (
            <div className="phone-add-field phone-input mt-2">
                <div className='d-flex align-items-center'>
                    <div className='phone-icon'>
                        <i className='fa fa-phone' />
                    </div>
                    <PhoneTypeDropdown
                        className='phone-type-dropdown flex-1'
                        value={phoneType}
                        onChange={onPhoneTypeClick}
                    />
                </div>
                <div className='d-flex align-items-center'>
                    <PhoneNumberField
                        showIcon={false}
                        label=''
                        defaultValue={phoneNumber}
                        className='phone-number-field'
                        placeholder='Phone Number'
                        onChange={onPhoneInputChange}
                        errorState={errors.phoneNumber}
                    />
                    <div className="row no-gutters">
                        {errors.phoneNumberType && (
                            <div className="col">
                                <p className="text-danger">
                                    Please select phone number type
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`d-flex align-items-center justify-content-between ${errors.phoneNumber ? 'mt-3' : 'mt-1'} `}>
                    <div className='flex-1' />
                    <div>
                        {typeof onClickDelete === 'function' && <div className='badge badge-pill badge-dark badge-dense' onClick={onClickSave} title='Save'>
                            <i className='fa fa-trash-o' />
                        </div>}
                        <div className='badge badge-pill badge-dark badge-dense' onClick={onClickSave} title='Save'>
                            <i className='fa fa-check' />
                        </div>
                        <div className='badge badge-pill badge-dark badge-dense' onClick={onClickCancel} title='Cancel'>
                            <i className='fa fa-remove' />
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
        phoneNumberType: '',
        addPhoneNumberShown: false,
        phoneNumberError: null,
        phoneNumberTypeError: null,
        editableIndex: null,
    }

    componentDidMount() {
        this.props
            .fetchPhoneNumbers()
            .then(res => { })
            .catch(res => { })
    }

    onClickSave = () => {
        this.props
            .savePhoneNumber({
                phone_number: this.state.phoneNumber,
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
            .then(res => { })
            .catch(res => { })
    }

    onClickSetPrimary = phoneNumberID => {
        this.props
            .updatePhoneNumber({
                id: phoneNumberID,
                primary: true
            })
            .then(res => { })
            .catch(res => { })
    }

    onChangePhoneNumber = (id, value) => {
        this.setState({
            [id]: value
        })
    }

    onClickPhoneNumberType = numberType => {
        this.setState({
            phoneNumberType: numberType
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
            phoneNumber: phone.phone_number
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

    renderOneDetailItem = (detail, index) => {
        return (
            <div className="detail-item" key={index}>
                <div className="label">
                    <i className={`fa ${detail.icon}`} />
                    <span className="ml-1">{detail.label}</span>
                </div>
                <div className="value">{detail.value}</div>
            </div>
        )
    }

    render() {
        return (
            <CardContent>
                <div className="details-section">
                    <div className="title">CONTACT</div>
                    <div className="details-list phone-section mt-2">
                        {this.props.phoneNumbers.map((x, i) => (
                            this.state.editableIndex === i
                                ? <PhoneAddField
                                    key={i}
                                    phoneNumberValue={this.state.phoneNumber}
                                    phoneTypeSelected={this.state.phoneNumberType}
                                    onPhoneInputChange={this.onChangePhoneNumber}
                                    onPhoneTypeClick={this.onClickPhoneNumberType}
                                    onClickDelete={this.onClickDelete}
                                    onClickSave={this.onClickSave}
                                    onClickCancel={this.cancelEditable}
                                    errors={{
                                        phoneNumber: this.state.phoneNumberError,
                                        phoneNumberType: this.state.phoneNumberTypeError
                                    }}
                                />
                                : <PhoneField
                                    key={i}
                                    phoneNumber={x}
                                    onClickEdit={() => this.setEditable(x, i)}
                                    onClickDelete={this.onClickDelete}
                                    onClickSetPrimary={this.onClickSetPrimary}
                                />
                        ))}
                        {this.state.addPhoneNumberShown && (
                            <PhoneAddField
                                phoneTypeSelected={this.state.phoneNumberType}
                                onPhoneInputChange={this.onChangePhoneNumber}
                                onPhoneTypeClick={this.onClickPhoneNumberType}
                                onClickSave={this.onClickSave}
                                onClickCancel={this.onClickAddCancel}
                                errors={{
                                    phoneNumber: this.state.phoneNumberError,
                                    phoneNumberType: this.state.phoneNumberTypeError
                                }}
                            />
                        )}
                        {!this.state.addPhoneNumberShown && (
                            <div
                                className="text-center"
                                onClick={this.onClickAdd}>
                                <span className='badge badge-light'>Add More</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* <div className="details-section mt-2">
                    <div className="title">ACTIVITIES</div>
                    <div className="details-list">
                        {activities.map(this.renderOneDetailItem)}
                    </div>
                </div> */}
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
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneDetails)
