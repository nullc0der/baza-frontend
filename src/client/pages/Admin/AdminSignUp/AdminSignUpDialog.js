import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dialog from 'components/ui/Dialog'

import s from './AdminSignUp.scss'

import AdminSignUpTabs from './AdminSignUpTabs'
import AdminSignUpFooter from './AdminSignUpFooter'

class AdminSignUpDialog extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  state = {
    selectedTab: 0,
    completedTabs: '',
    errorTabs: ''
  }

  closeAdminSignUpDialog = () => {
    const { pathname, hash } = this.props.location
    this.props.navigate(pathname + (hash || '').replace('#!admin-signup', ''))
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
          selectedIndex={this.state.selectedTab}
        />
        <h3> Admin SignUp </h3>
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
