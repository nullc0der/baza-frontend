import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SwipeableViews from 'react-swipeable-views'

import Dialog from 'components/ui/Dialog'

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
    completedTabs: '',
    errorTabs: '',
    isDonor: false
  }

  closeAdminSignUpDialog = () => {
    const { pathname, hash } = this.props.location
    this.props.navigate(pathname + (hash || '').replace('#!admin-signup', ''))
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
    console.log('handle submit logic here')
  }
  toggleDonorStatus = () => {
    this.setState({ isDonor: !this.state.isDonor })
  }

  render() {
    const { className } = this.props
    const cx = classnames(s.container, className)
    return (
      <Dialog
        isOpen={true}
        className={cx}
        onRequestClose={this.closeAdminSignUpDialog}>
        <AdminSignUpTabs
          completedTabs={this.state.completedTabs}
          errorTabs={this.state.errorTabs}
          selectedIndex={this.state.selectedIndex}
          onTabClick={this.switchTab}
        />
        <SwipeableViews
          index={this.state.selectedIndex}
          onChangeIndex={this.changeSwipeIndex}>
          <NameAddressSection />
          <EmailSection />
          <MobileSection />
          <DocumentsSection />
          <FinishSection />
        </SwipeableViews>
        <AdminSignUpFooter
          isDonor={this.state.isDonor}
          showSkip={this.state.selectedIndex < 4}
          toggleDonorStatus={this.toggleDonorStatus}
          onSkipClick={this.onSkipClick}
          onSubmitClick={this.onSubmitClick}
        />
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
