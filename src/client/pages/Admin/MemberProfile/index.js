import React, { Component } from 'react'
import classnames from 'classnames'

import s from './MemberProfile.scss'

import ProfileCard from './ProfileCard'
import DocumentsCard from './DocumentsCard'
import DetailsCard from './DetailsCard'
import MySelectionCard from './MySelectionCard'
import SettingsCard from './SettingsCard'
import ReferencesCard from './ReferencesCard'
import TrustMeter from './TrustMeter'
import TasksList from './TasksList'
import JustDonatedCard from './JustDonatedCard'

export default class MemberProfile extends Component {
  render() {
    const cx = classnames(s.container)
    return (
      <div className={cx}>
        <div className="row align-stretch">
          <div className="col-md-4">
            <JustDonatedCard />
          </div>
          <div className="col-md-4">
            <TrustMeter />
          </div>
          <div className="col-md-4">
            <TasksList />
          </div>

        </div>
        <div className="row mt-3 align-stretch">
          <div className="col-md-4">
            <ProfileCard />
          </div>
          <div className="col-md-8 mt-3 mt-md-0 mt-lg-0 mt-xl-0">
            <DocumentsCard />
          </div>
        </div>
        <div className="row my-3 align-stretch">
          <div className="col-md-4">
            <DetailsCard />
          </div>
          <div className="col-md-8 mt-3 mt-md-0 mt-lg-0 mt-xl-0">
            <MySelectionCard />
          </div>
        </div>
        <div className="row my-3 align-stretch">
          <div className="col-md-7">
            <SettingsCard />
          </div>
          <div className="col-md-5 mt-3 mt-md-0 mt-lg-0 mt-xl-0">
            <ReferencesCard />
          </div>
        </div>
      </div>
    )
  }
}
