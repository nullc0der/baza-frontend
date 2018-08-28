import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import includes from 'lodash/includes'

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
    uploadSignupImage
} from 'api/distribution-signup'

import s from './AdminSignUp.scss'

import AdminSignUpTabs from './AdminSignUpTabs'
import AdminSignUpFooter from './AdminSignUpFooter'

import NameAddressSection from './NameAddressSection'
import EmailSection from './EmailSection'
import MobileSection from './MobileSection'
import DocumentsSection from './DocumentsSection'
import FinishSection from './FinishSection'

class AdminSignUpDialog extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    state = {
        selectedIndex: 0,
        completedTabs: [],
        errorTabs: [],
        isDonor: false,
        status: 'pending',
        isSkippable: false,
        selectedCountry: '',
        inputValues: {},
        errorState: {},
        infoText: {
            'message': '',
            'type': 'success'
        },
        signupImage: null,
        showEmailTryAgain: false,
        showPhoneTryAgain: false
    }

    componentDidMount = () => {
        checkCompletedSteps()
            .then(response => {
                this.setState({
                    completedTabs: response.data.completed_steps.map(x => Number(x)),
                    status: response.data.status,
                    selectedIndex: response.data.next_step.index,
                    isSkippable: response.data.next_step.is_skippable
                })
            })
            .catch(responseData => { console.log(responseData) })
    }

    closeAdminSignUpDialog = () => {
        const { pathname, hash } = this.props.location
        this.props.navigate(pathname + (hash || '').replace('#!baza-signup', ''))
    }

    switchTab = (tab, selectedIndex) => {
        if (includes(this.state.completedTabs, 0)) {
            this.setState({ selectedIndex })
        }
    }

    changeSwipeIndex = selectedIndex => {
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
                console.log("Nothing matched")
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
                console.log("Nothing matched")
        }
    }
    toggleDonorStatus = () => {
        this.setState({ isDonor: !this.state.isDonor })
    }

    onCountrySelect = (item) => {
        this.setState({
            selectedCountry: item
        })
    }

    onInputChange = (id, value) => {
        this.setState(prevState => ({
            inputValues: {
                ...prevState.inputValues,
                [id]: value
            }
        }))
    }

    setStepData = (data) => {
        this.setState({
            completedTabs: data.completed_steps.map(x => Number(x)),
            status: data.status,
            selectedIndex: data.next_step.index,
            isSkippable: data.next_step.is_skippable,
            infoText: {
                'message': '',
                'type': 'success'
            }
        })
    }

    submitNameAddress = () => {
        submitNameAddress(
            this.state.inputValues.firstName,
            this.state.inputValues.lastName,
            this.state.inputValues.refCode || '',
            this.state.selectedCountry,
            this.state.inputValues.city,
            this.state.inputValues.state,
            this.state.inputValues.houseNo,
            this.state.inputValues.streetName,
            this.state.inputValues.zipCode,
            this.state.inputValues.birthDate
        ).then(response => {
            this.setStepData(response.data)
        }).catch(responseData => {
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
                    birthDate: get(responseData, 'birthdate', null)
                }
            })
        })
    }

    skipEmail = () => {
        skipEmail().then(response => {
            this.setStepData(response.data)
        }).catch((responseData => {
            this.setState({
                infoText: {
                    'message': 'Unknown error occured',
                    'type': 'danger'
                }
            })
        }))
    }

    sendVerificationCode = () => {
        sendVerificationCode(this.state.inputValues.email).then(response => {
            this.setState({
                infoText: {
                    'message': 'Verfication email sent, please check inbox',
                    'type': 'success'
                },
                showEmailTryAgain: true
            })
        }).catch(responseData => {
            this.setState({
                errorState: {
                    email: get(responseData, 'email', null)
                }
            })
        })
    }

    sendVerificationCodeAgain = () => {
        sendVerificationCodeAgain().then(response => {
            this.setState({
                infoText: {
                    'message': 'Verfication email sent again, please check inbox',
                    'type': 'success'
                }
            })
        }).catch(responseData => this.setState({
            infoText: {
                'message': 'Unknown error occured',
                'type': 'danger'
            }
        }))
    }

    submitVerificationCode = () => {
        validateEmailCode(this.state.inputValues.verificationCode).then(response => {
            this.setStepData(response.data)
        }).catch((responseData => {
            this.setState({
                errorState: {
                    verificationCode: get(responseData, 'code', null)
                }
            })
        }))
    }

    skipPhone = () => {
        skipPhone().then(response => {
            this.setStepData(response.data)
        }).catch((responseData => {
            this.setState({
                infoText: {
                    'message': 'Unknown error occured',
                    'type': 'danger'
                }
            })
        }))
    }

    sendPhoneVerificationCode = () => {
        sendPhoneVerificationCode(this.state.inputValues.phoneNumber).then(response => {
            this.setState({
                infoText: {
                    'message': 'Verfication sms sent, please check inbox',
                    'type': 'success'
                },
                showPhoneTryAgain: true
            })
        }).catch(responseData => {
            this.setState({
                errorState: {
                    phoneNumber: get(responseData, 'phone', null)
                }
            })
        })
    }

    sendPhoneVerificationCodeAgain = () => {
        sendPhoneVerificationCodeAgain().then(response => {
            this.setState({
                infoText: {
                    'message': 'Verfication sms sent again, please check inbox',
                    'type': 'success'
                }
            })
        }).catch(responseData => this.setState({
            infoText: {
                'message': 'Unknown error occured',
                'type': 'danger'
            }
        }))
    }

    submitPhoneVerificationCode = () => {
        validatePhoneCode(this.state.inputValues.smsVerificationCode).then(response => {
            this.setStepData(response.data)
        }).catch((responseData => {
            this.setState({
                errorState: {
                    smsVerificationCode: get(responseData, 'code', null)
                }
            })
        }))
    }

    addSignupImage = (image) => {
        this.setState({
            signupImage: image
        })
    }

    removeSignupImage = () => {
        this.setState({
            signupImage: null
        })
    }

    submitSignupImage = () => {
        uploadSignupImage(this.state.signupImage).then(response => {
            this.setStepData(response.data)
        }).catch(responseData => {
            this.setState({
                infoText: {
                    'message': 'Unknown error occured',
                    'type': 'danger'
                }
            })
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
                {
                    isEqual(this.state.completedTabs, [0, 1, 2, 3]) ?
                        <FinishSection
                            status={this.state.status}
                        /> :
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
                                disabled={!(includes(this.state.completedTabs, 0))}>
                                <NameAddressSection
                                    selectedCountry={this.state.selectedCountry}
                                    onCountrySelect={this.onCountrySelect}
                                    onInputChange={this.onInputChange}
                                    errorState={this.state.errorState}
                                />
                                <EmailSection
                                    onInputChange={this.onInputChange}
                                    errorState={this.state.errorState}
                                    sendCode={this.sendVerificationCode}
                                    sendCodeAgain={this.sendVerificationCodeAgain}
                                    showEmailTryAgain={this.state.showEmailTryAgain}
                                />
                                <MobileSection
                                    onInputChange={this.onInputChange}
                                    errorState={this.state.errorState}
                                    sendCode={this.sendPhoneVerificationCode}
                                    sendCodeAgain={this.sendPhoneVerificationCodeAgain}
                                    showPhoneTryAgain={this.state.showPhoneTryAgain}
                                />
                                <DocumentsSection
                                    addSignupImage={this.addSignupImage}
                                    removeSignupImage={this.removeSignupImage}
                                />
                            </SwipeableViews>
                            <AdminSignUpFooter
                                infoText={this.state.infoText}
                                isDonor={this.state.isDonor}
                                showSkip={this.state.isSkippable}
                                toggleDonorStatus={this.toggleDonorStatus}
                                onSkipClick={this.onSkipClick}
                                onSubmitClick={this.onSubmitClick}
                            />
                        </Fragment>
                }
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    location: state.router.location
})

const mapDispatchToProps = dispatch => ({
    navigate(url) {
        return dispatch(push(url))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignUpDialog)
