import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'

import { actions as userProfileActions } from 'store/UserProfile'

import {
    Card,
    CardHeader,
    CardBody,
    CardContent
} from 'components/ui/CardWithTabs'
import PhoneNumberField from 'components/ui/PhoneNumberField'

const PhoneField = props => {
    const { phoneNumber, onClickDelete, onClickSetPrimary } = props

    const icons = {
        home: 'fa fa-home',
        emergency: 'fa fa-exclamation-triangle',
        office: 'fa fa-building',
        mobile: 'fa fa-mobile'
    }

    const badgeClass = {
        home: 'badge-info',
        emergency: 'badge-danger',
        office: 'badge-success',
        mobile: 'badge-warning'
    }

    return (
        <div className="phone-number">
            <span>
                {phoneNumber.phone_number}{' '}
                <div
                    className={`text-capitalize badge ${
                        badgeClass[phoneNumber.phone_number_type]
                    }`}>
                    <i className={icons[phoneNumber.phone_number_type]} />{' '}
                    {phoneNumber.phone_number_type}
                </div>
                {!phoneNumber.primary && (
                    <div
                        className="badge badge-info"
                        onClick={() => onClickSetPrimary(phoneNumber.id)}>
                        <i className="fa fa-check" title="set primary" />
                    </div>
                )}
                <div
                    className="badge badge-warning"
                    onClick={() => onClickDelete(phoneNumber.id)}>
                    <i className="fa fa-trash" title="delete" />
                </div>
            </span>
        </div>
    )
}

const PhoneAddField = props => {
    const {
        onPhoneInputChange,
        onPhoneTypeClick,
        phoneTypeSelected,
        onClickSave,
        errors
    } = props
    return (
        <div className="phone-input mt-2">
            <PhoneNumberField
                onChange={onPhoneInputChange}
                errorState={errors.phoneNumber}
            />
            <div className="row no-gutters text-center mt-2">
                <div
                    className={`badge ${
                        !!(phoneTypeSelected === 'home')
                            ? 'badge-info'
                            : 'badge-light'
                    } col mt-1 mb-1`}
                    onClick={() => onPhoneTypeClick('home')}>
                    <i className="fa fa-home" /> Home
                </div>
                <div
                    className={`badge ${
                        !!(phoneTypeSelected === 'office')
                            ? 'badge-success'
                            : 'badge-light'
                    } col mt-1 mb-1`}
                    onClick={() => onPhoneTypeClick('office')}>
                    <i className="fa fa-building" /> Office
                </div>
                <div
                    className={`badge ${
                        !!(phoneTypeSelected === 'emergency')
                            ? 'badge-danger'
                            : 'badge-light'
                    } col mt-1 mb-1`}
                    onClick={() => onPhoneTypeClick('emergency')}>
                    <i className="fa fa-asterisk" /> Emergency
                </div>
                <div
                    className={`badge ${
                        !!(phoneTypeSelected === 'mobile')
                            ? 'badge-warning'
                            : 'badge-light'
                    } col mt-1 mb-1`}
                    onClick={() => onPhoneTypeClick('mobile')}>
                    <i className="fa fa-mobile" /> Mobile
                </div>
            </div>
            <div className="row no-gutters">
                {errors.phoneNumberType && (
                    <div className="col">
                        <p className="text-danger">
                            Please select phone number type
                        </p>
                    </div>
                )}
            </div>
            <div
                className="btn btn-block btn-sm btn-dark"
                onClick={onClickSave}>
                Save
            </div>
        </div>
    )
}

class DetailsCard extends Component {
    state = {
        phoneNumber: '',
        phoneNumberType: '',
        addPhoneNumberShown: false,
        phoneNumberError: null,
        phoneNumberTypeError: null
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
            .then(res => {})
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
        this.setState({
            addPhoneNumberShown: true
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
        const activities = [
            {
                label: 'Join date',
                icon: 'fa-plus',
                value: new Date(
                    get(this.props.profile.user, 'date_joined', null)
                ).toLocaleString()
            },
            {
                label: 'Last login',
                icon: 'fa-clock-o',
                value: get(this.props.profile.user, 'last_login', null)
                    ? new Date(
                          get(this.props.profile.user, 'last_login', null)
                      ).toLocaleString()
                    : 'No last login data'
            }
        ]

        return (
            <Card className="details-card">
                <CardHeader title="DETAILS" subtitle="" />
                <CardBody>
                    <CardContent>
                        <div className="details-section">
                            <div className="title">CONTACT</div>
                            <div className="details-list phone-section mt-2">
                                {this.props.phoneNumbers.map((x, i) => (
                                    <PhoneField
                                        key={i}
                                        phoneNumber={x}
                                        onClickDelete={this.onClickDelete}
                                        onClickSetPrimary={
                                            this.onClickSetPrimary
                                        }
                                    />
                                ))}
                                {this.state.addPhoneNumberShown && (
                                    <PhoneAddField
                                        phoneTypeSelected={
                                            this.state.phoneNumberType
                                        }
                                        onPhoneInputChange={
                                            this.onChangePhoneNumber
                                        }
                                        onPhoneTypeClick={
                                            this.onClickPhoneNumberType
                                        }
                                        onClickSave={this.onClickSave}
                                        errors={{
                                            phoneNumber: this.state
                                                .phoneNumberError,
                                            phoneNumberType: this.state
                                                .phoneNumberTypeError
                                        }}
                                    />
                                )}
                                {!this.state.addPhoneNumberShown && (
                                    <div
                                        className="add-new"
                                        onClick={this.onClickAdd}>
                                        <i className="fa fa-plus" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="details-section mt-2">
                            <div className="title">ACTIVITIES</div>
                            <div className="details-list">
                                {activities.map(this.renderOneDetailItem)}
                            </div>
                        </div>
                    </CardContent>
                </CardBody>
            </Card>
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
)(DetailsCard)
