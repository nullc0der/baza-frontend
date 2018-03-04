import React, { Component } from 'react'
import classnames from 'classnames'

import { connect } from 'react-redux'

// import isBoolean from 'lodash/isBoolean'

import s from './DistributionSignUp.scss'

import ProfileDetails from './ProfileDetails'
import ProfilePhotos from './ProfilePhotos'
import ProfileDocuments from './ProfileDocuments'
import DatabaseInformation from './DatabaseInformation'
import AccountDetails from './AccountDetails'
import EditModeBar from './EditModeBar'

import { actions as distributionActions } from 'store/DistributionSignUp'

class DistributionSignUpPage extends Component {
  toggleEditMode = force => {
    this.props.toggleEditMode(force)
  }

  onSaveEdits = () => {
    // save the store
    console.log('will save edits now')
    this.props.saveAccount().then(this.props.toggleEditMode)
  }

  onDiscardEdits = () => {
    // discard the edits
    console.log('will discard the edits')
    this.props.discardEdits().then(this.props.toggleEditMode)
  }

  render() {
    const { editMode } = this.props

    const cx = classnames(s.container)

    return (
      <div className={cx}>
        {editMode && (
          <EditModeBar
            onEditClick={this.onSaveEdits}
            onDiscardClick={this.onDiscardEdits}
          />
        )}
        <ProfileDetails
          editMode={editMode}
          onRequestRefresh={this.props.fetchAccount}
          showEditMode={e => this.props.toggleEditMode(true)}
        />
        <ProfilePhotos editMode={editMode} />
        <ProfileDocuments editMode={editMode} />
        <DatabaseInformation
          editMode={editMode}
          title="USER DATABASE INFORMATION"
          primary
          valid
          geoIPValid
        />
        <DatabaseInformation
          editMode={editMode}
          title="INFORMATION FROM GEOIP DATABASE"
          geoIPValid
        />
        <AccountDetails editMode={editMode} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  editMode: state.DistributionSignUp.editMode
})

const mapDispatchToProps = dispatch => ({
  toggleEditMode(force) {
    return dispatch(distributionActions.toggleEditMode(force))
  },
  fetchAccount() {
    return dispatch(distributionActions.fetchAccount())
  },
  saveAccount() {
    return dispatch(distributionActions.saveAccount())
  },
  discardEdits() {
    return dispatch(distributionActions.discardEdits())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DistributionSignUpPage
)
