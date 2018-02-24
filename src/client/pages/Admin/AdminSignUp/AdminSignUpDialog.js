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

class AdminSignUpDialog extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  state = {
    selectedIndex: 0,
    completedTabs: '',
    errorTabs: ''
  }

  closeAdminSignUpDialog = () => {
    const { pathname, hash } = this.props.location
    this.props.navigate(pathname + (hash || '').replace('#!admin-signup', ''))
  }

  switchTab = (tab, selectedIndex) => {
    this.setState({ selectedIndex })
  }

  changeSwipeIndex = index => {
    this.setState({ index })
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
        </SwipeableViews>
        <AdminSignUpFooter />
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
