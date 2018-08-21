import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

import SwipeableViews from 'react-swipeable-views'

import Dialog from 'components/ui/Dialog'

import {
    checkCompletedSteps,
    submitNameAddress
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
        errorState: {}
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
        this.setState({ selectedIndex })
    }

    changeSwipeIndex = selectedIndex => {
        this.setState({ selectedIndex })
    }

    onSkipClick = () => {
        const { selectedIndex } = this.state
        this.setState({ selectedIndex: selectedIndex + 1 })
    }

    onSubmitClick = () => {
        switch (this.state.selectedIndex) {
            case 0:
                this.submitNameAddress()
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
            this.setState({
                completedTabs: response.data.completed_steps.map(x => Number(x)),
                status: response.data.status,
                selectedIndex: response.data.next_step.index,
                isSkippable: response.data.next_step.is_skippable
            })
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
                                onChangeIndex={this.changeSwipeIndex}>
                                <NameAddressSection
                                    selectedCountry={this.state.selectedCountry}
                                    onCountrySelect={this.onCountrySelect}
                                    onInputChange={this.onInputChange}
                                    errorState={this.state.errorState}
                                />
                                <EmailSection />
                                <MobileSection />
                                <DocumentsSection />
                            </SwipeableViews>
                            <AdminSignUpFooter
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
