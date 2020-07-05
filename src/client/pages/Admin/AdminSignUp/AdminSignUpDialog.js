import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import includes from 'lodash/includes'
import { DateTime } from 'luxon'

import SwipeableViews from 'react-swipeable-views'

import Dialog from 'components/ui/Dialog'

import {
    checkCompletedSteps,
    submitNameAddress,
    skipEmail,
    sendVerificationCode,
    validateEmailCode,
    sendVerificationCodeAgain,
    skipPhone,
    sendPhoneVerificationCode,
    validatePhoneCode,
    sendPhoneVerificationCodeAgain,
    uploadSignupImage,
    toggleDonor,
    getUserInfoTabData,
} from 'api/distribution-signup'

import { MatomoContext } from 'context/Matomo'

import s from './AdminSignUp.scss'

import AdminSignUpTabs from './AdminSignUpTabs'
import AdminSignUpFooter from './AdminSignUpFooter'

import NameAddressSection from './NameAddressSection'
import EmailSection from './EmailSection'
import MobileSection from './MobileSection'
import DocumentsSection from './DocumentsSection'
import FinishSection from './FinishSection'

import { actions as commonActions } from 'store/Common'
import { actions as messengerActions } from 'store/Messenger'

class AdminSignUpDialog extends Component {
    static propTypes = {
        className: PropTypes.string,
    }
    static contextType = MatomoContext

    state = {
        selectedIndex: 0,
        completedTabs: [],
        errorTabs: [],
        errorFields: [],
        invalidationComment: '',
        handlingStaff: {},
        isDonor: false,
        status: 'pending',
        referralCode: '',
        isSkippable: false,
        inputValues: {},
        errorState: {},
        infoText: {
            message: '',
            type: 'success',
        },
        signupImage: null,
        showEmailTryAgain: false,
        showPhoneTryAgain: false,
        smsInfo: {
            sentAt: null,
            sentCount: 0,
        },
    }

    componentDidMount = () => {
        checkCompletedSteps()
            .then((response) => {
                this.setState({
                    completedTabs: response.data.completed_steps.map((x) =>
                        Number(x)
                    ),
                    errorTabs: response.data.invalidated_steps.map((x) =>
                        Number(x)
                    ),
                    errorFields: response.data.invalidated_fields,
                    invalidationComment: response.data.invalidation_comment,
                    status: response.data.status,
                    referralCode: response.data.referral_code,
                    selectedIndex: response.data.next_step.index,
                    isSkippable: response.data.next_step.is_skippable,
                    handlingStaff: response.data.handling_staff,
                    isDonor: response.data.is_donor,
                    inputValues: {
                        refCode: this.getReferralCode(this.props.location.hash),
                    },
                })
                this.setUserInfoData()
            })
            .catch((responseData) => {
                console.log(responseData)
            })
        this.context.trackEvent({
            category: 'Dialog',
            action: 'Click',
            name: 'Distribution Signup',
        })
    }

    getReferralCode = (hash) => {
        if (hash.split('?').length > 1) {
            const referralCodeChunk = hash.split('?')[1]
            return referralCodeChunk.split('=')[1]
        }
        return ''
    }

    getReferralURL = () => {
        if (this.state.referralCode.length) {
            return `${window.location.protocol}//${window.location.host}/profile${window.location.hash}?referral-code=${this.state.referralCode}`
        }
        return ''
    }

    closeAdminSignUpDialog = () => {
        const { pathname, hash } = this.props.location
        this.props.navigate(
            pathname + (hash || '').replace('#!baza-registration', '')
        )
    }

    switchTab = (tab, selectedIndex) => {
        if (includes(this.state.completedTabs, 0)) {
            this.setState({ selectedIndex })
        }
    }

    changeSwipeIndex = (selectedIndex) => {
        if (includes(this.state.completedTabs, 0)) {
            this.setState({ selectedIndex })
        }
    }

    onSkipClick = () => {
        const { selectedIndex } = this.state
        switch (selectedIndex) {
            case 1:
                this.skipEmail()
                break
            case 2:
                this.skipPhone()
                break
            default:
                console.log('Nothing matched')
        }
    }

    onSubmitClick = () => {
        switch (this.state.selectedIndex) {
            case 0:
                this.submitNameAddress()
                break
            case 1:
                this.submitVerificationCode()
                break
            case 2:
                this.submitPhoneVerificationCode()
                break
            case 3:
                this.submitSignupImage()
                break
            default:
                console.log('Nothing matched')
        }
    }

    toggleDonorStatus = () => {
        toggleDonor()
            .then((response) =>
                this.setState({
                    isDonor: response.data.is_donor,
                })
            )
            .catch((responseData) => console.log(responseData))
    }

    onInputChange = (id, value) => {
        this.setState((prevState) => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value,
            },
        }))
    }

    onRefCodeInputChange = (id, value) => {
        if (value.indexOf('?') !== -1) {
            const inputChunk = value.split('?')[1]
            value = inputChunk.split('=')[1] || value
        }
        value = value.replace(
            /[^abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ2-9-]/g,
            ''
        )
        value =
            value.toUpperCase() === 'baz'.toUpperCase()
                ? value.concat('-')
                : value
        this.setState((prevState) => ({
            inputValues: {
                ...prevState.inputValues,
                refCode: value,
            },
        }))
    }

    setStepData = (data) => {
        this.setState({
            completedTabs: data.completed_steps.map((x) => Number(x)),
            errorTabs: data.invalidated_steps.map((x) => Number(x)),
            errorFields: data.invalidated_fields,
            invalidationComment: data.invalidation_comment,
            handlingStaff: data.handling_staff,
            status: data.status,
            isDonor: data.is_donor,
            selectedIndex: data.next_step.index,
            isSkippable: data.next_step.is_skippable,
            infoText: {
                message: '',
                type: 'success',
            },
        })
    }

    submitNameAddress = () => {
        submitNameAddress(
            this.state.inputValues.firstName,
            this.state.inputValues.lastName,
            this.state.inputValues.refCode.toUpperCase() || '',
            this.state.inputValues.country,
            this.state.inputValues.city,
            this.state.inputValues.state,
            this.state.inputValues.houseNo,
            this.state.inputValues.streetName,
            this.state.inputValues.zipCode,
            this.state.inputValues.birthDate
        )
            .then((response) => {
                this.setStepData(response.data)
            })
            .catch((responseData) => {
                this.setState({
                    errorState: {
                        firstName: get(responseData, 'first_name', null),
                        lastName: get(responseData, 'last_name', null),
                        refCode: get(responseData, 'referral_code', null),
                        country: get(responseData, 'country', null),
                        city: get(responseData, 'city', null),
                        state: get(responseData, 'state', null),
                        houseNo: get(responseData, 'house_number', null),
                        streetName: get(responseData, 'street_name', null),
                        zipCode: get(responseData, 'zip_code', null),
                        birthDate: get(responseData, 'birthdate', null),
                    },
                })
            })
    }

    skipEmail = () => {
        skipEmail()
            .then((response) => {
                this.setStepData(response.data)
            })
            .catch((responseData) => {
                this.setState({
                    infoText: {
                        message: 'Unknown error occured',
                        type: 'danger',
                    },
                })
            })
    }

    sendVerificationCode = () => {
        sendVerificationCode(this.state.inputValues.email)
            .then((response) => {
                this.setState({
                    infoText: {
                        message: 'Verfication email sent, please check inbox',
                        type: 'success',
                    },
                    showEmailTryAgain: true,
                })
            })
            .catch((responseData) => {
                this.setState({
                    errorState: {
                        email: get(responseData, 'email', null),
                    },
                })
            })
    }

    sendVerificationCodeAgain = () => {
        sendVerificationCodeAgain()
            .then((response) => {
                this.setState({
                    infoText: {
                        message:
                            'Verfication email sent again, please check inbox',
                        type: 'success',
                    },
                })
            })
            .catch((responseData) =>
                this.setState({
                    infoText: {
                        message: 'Unknown error occured',
                        type: 'danger',
                    },
                })
            )
    }

    submitVerificationCode = () => {
        validateEmailCode(this.state.inputValues.verificationCode)
            .then((response) => {
                this.setStepData(response.data)
            })
            .catch((responseData) => {
                this.setState({
                    errorState: {
                        verificationCode: get(responseData, 'code', null),
                    },
                })
            })
    }

    skipPhone = () => {
        skipPhone()
            .then((response) => {
                this.setStepData(response.data)
            })
            .catch((responseData) => {
                this.setState({
                    infoText: {
                        message: 'Unknown error occured',
                        type: 'danger',
                    },
                })
            })
    }

    sendPhoneVerificationCode = () => {
        sendPhoneVerificationCode({
            phone_number: this.state.inputValues.phoneNumber.phoneNumber,
            phone_number_dial_code: this.state.inputValues.phoneNumber
                .phoneNumberDialCode,
        })
            .then((response) => {
                this.setState({
                    infoText: {
                        message: 'Verfication sms sent, please check inbox',
                        type: 'success',
                    },
                    showPhoneTryAgain: true,
                    smsInfo: {
                        sentAt: DateTime.local(),
                        sentCount: 1,
                    },
                })
            })
            .catch((responseData) => {
                this.setState({
                    errorState: {
                        phoneNumber: get(responseData, 'phone', null),
                    },
                })
            })
    }

    sendPhoneVerificationCodeAgain = () => {
        sendPhoneVerificationCodeAgain()
            .then((response) => {
                this.setState({
                    infoText: {
                        message:
                            'Verfication sms sent again, please check inbox',
                        type: 'success',
                    },
                    smsInfo: {
                        sentAt: this.state.smsInfo.sentAt,
                        sentCount: this.state.smsInfo.sentCount + 1,
                    },
                })
                if (this.state.smsInfo.sentCount > 3) {
                    this.setState({
                        infoText: {
                            message:
                                'You have exceeded maximum limit of SMS send request please wait till counter expires',
                            type: 'danger',
                        },
                    })
                }
            })
            .catch((responseData) =>
                this.setState({
                    infoText: {
                        message: 'Unknown error occured',
                        type: 'danger',
                    },
                })
            )
    }

    submitPhoneVerificationCode = () => {
        validatePhoneCode(this.state.inputValues.smsVerificationCode)
            .then((response) => {
                this.setStepData(response.data)
            })
            .catch((responseData) => {
                this.setState({
                    errorState: {
                        smsVerificationCode: get(responseData, 'code', null),
                    },
                })
            })
    }

    addSignupImage = (image) => {
        this.setState({
            signupImage: image,
        })
    }

    removeSignupImage = () => {
        this.setState({
            signupImage: null,
        })
    }

    submitSignupImage = () => {
        uploadSignupImage(this.state.signupImage)
            .then((response) => {
                this.setStepData(response.data)
            })
            .catch((responseData) => {
                this.setState({
                    infoText: {
                        message: 'Unknown error occured',
                        type: 'danger',
                    },
                })
            })
    }

    onSMSCountDownExpiry = () => {
        this.setState({
            smsInfo: {
                sentAt: null,
                sentCount: 0,
            },
            showPhoneTryAgain: false,
            infoText: {
                message: '',
                type: 'success',
            },
        })
    }

    setUserInfoData = () => {
        if (includes(this.state.errorTabs, 0)) {
            getUserInfoTabData()
                .then((response) => {
                    this.setState({
                        inputValues: {
                            firstName: get(response.data, 'first_name', ''),
                            lastName: get(response.data, 'last_name', ''),
                            refCode: get(response.data, 'referral_code', ''),
                            country: get(response.data, 'country', ''),
                            city: get(response.data, 'city', ''),
                            state: get(response.data, 'state', ''),
                            houseNo: get(response.data, 'house_number', ''),
                            streetName: get(response.data, 'street_name', ''),
                            zipCode: get(response.data, 'zip_code', ''),
                            birthDate: get(response.data, 'birthdate', ''),
                        },
                    })
                })
                .catch((responseData) => console.log(responseData))
        }
    }

    initChat = (e, toUser) => {
        e.preventDefault()
        this.props.initChat(toUser).then((res) => {
            this.props.openMiniChat(res.data.room.id)
        })
    }

    render() {
        const { className } = this.props
        const cx = classnames(s.container, className)
        return (
            <Dialog
                isOpen={true}
                className={cx}
                onRequestClose={this.closeAdminSignUpDialog}>
                {isEqual(this.state.completedTabs.sort(), [0, 1, 2, 3]) &&
                !this.state.errorTabs.length ? (
                    <FinishSection
                        status={this.state.status}
                        referralURL={this.getReferralURL()}
                        isDonor={this.state.isDonor}
                        toggleDonorStatus={this.toggleDonorStatus}
                        addNotification={this.props.addNotification}
                        closeDialog={this.closeAdminSignUpDialog}
                    />
                ) : (
                    <Fragment>
                        <AdminSignUpTabs
                            completedTabs={this.state.completedTabs}
                            errorTabs={this.state.errorTabs}
                            selectedIndex={this.state.selectedIndex}
                            onTabClick={this.switchTab}
                        />
                        <SwipeableViews
                            index={this.state.selectedIndex}
                            onChangeIndex={this.changeSwipeIndex}
                            disabled={!includes(this.state.completedTabs, 0)}>
                            <NameAddressSection
                                onInputChange={this.onInputChange}
                                inputValues={this.state.inputValues}
                                errorState={this.state.errorState}
                                onRefCodeInputChange={this.onRefCodeInputChange}
                                invalidatedFields={this.state.errorFields}
                            />
                            <EmailSection
                                onInputChange={this.onInputChange}
                                errorState={this.state.errorState}
                                inputValues={this.state.inputValues}
                                sendCode={this.sendVerificationCode}
                                sendCodeAgain={this.sendVerificationCodeAgain}
                                showEmailTryAgain={this.state.showEmailTryAgain}
                                invalidatedFields={this.state.errorFields}
                            />
                            <MobileSection
                                onInputChange={this.onInputChange}
                                errorState={this.state.errorState}
                                inputValues={this.state.inputValues}
                                sendCode={this.sendPhoneVerificationCode}
                                sendCodeAgain={
                                    this.sendPhoneVerificationCodeAgain
                                }
                                showPhoneTryAgain={this.state.showPhoneTryAgain}
                                smsSentAt={this.state.smsInfo.sentAt}
                                smsSentCount={this.state.smsInfo.sentCount}
                                onSMSCountDownExpiry={this.onSMSCountDownExpiry}
                                invalidatedFields={this.state.errorFields}
                            />
                            <DocumentsSection
                                addSignupImage={this.addSignupImage}
                                removeSignupImage={this.removeSignupImage}
                            />
                        </SwipeableViews>
                        <AdminSignUpFooter
                            infoText={this.state.infoText}
                            invalidationComment={this.state.invalidationComment}
                            showDonor={includes(this.state.completedTabs, 0)}
                            isDonor={this.state.isDonor}
                            showSkip={this.state.isSkippable}
                            handlingStaff={this.state.handlingStaff}
                            toggleDonorStatus={this.toggleDonorStatus}
                            onSkipClick={this.onSkipClick}
                            onSubmitClick={this.onSubmitClick}
                            initChat={this.initChat}
                        />
                    </Fragment>
                )}
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.router.location,
})

const mapDispatchToProps = (dispatch) => ({
    navigate(url) {
        return dispatch(push(url))
    },
    addNotification(notification) {
        return dispatch(commonActions.addNotification(notification))
    },
    initChat(toUser) {
        return dispatch(messengerActions.initChat(toUser))
    },
    openMiniChat(id) {
        return dispatch(messengerActions.openMiniChat(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignUpDialog)
