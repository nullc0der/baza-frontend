import React, { Component } from 'react'
import classnames from 'classnames'

import s from './MemberProfile.scss'

import ProfileCard from './ProfileCard'
import DocumentsCard from './DocumentsCard'
import DetailsCard from './DetailsCard'

export default class MemberProfile extends Component {
  render() {
    const cx = classnames(s.container)
    return (
      <div className={cx}>
        <div className="row align-stretch">
          <div className="col-md-4">
            <ProfileCard />
          </div>
          <div className="col-md-8">
            <DocumentsCard />
          </div>
        </div>
        <div className="row mt-2 align-stretch">
          <div className="col-md-4">
            <DetailsCard />
          </div>
          <div className="col-md-8" />
        </div>
        <h3>Things</h3>
      </div>
    )
  }
}
