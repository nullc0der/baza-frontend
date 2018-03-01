import React, { Component } from 'react'
import classnames from 'classnames'

import s from './DistributionSignUp.scss'

import ProfileDetails from './ProfileDetails'
import ProfilePhotos from './ProfilePhotos'
import ProfileDocuments from './ProfileDocuments'
import DatabaseInformation from './DatabaseInformation'
import AccountDetails from './AccountDetails'

export default class DistributionSignUpPage extends Component {
  render() {
    const cx = classnames(s.container)
    return (
      <div className={cx}>
        <ProfileDetails />
        <ProfilePhotos />
        <ProfileDocuments />
        <DatabaseInformation
          title="USER DATABASE INFORMATION"
          primary
          valid
          geoIPValid
        />
        <DatabaseInformation
          title="INFORMATION FROM GEOIP DATABASE"
          geoIPValid
        />
        <AccountDetails />
      </div>
    )
  }
}
