import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardOptionsDropdown
} from 'components/ui/CardWithTabs'

import ProfileCardContent from './ProfileCardContent'

export default class ProfileCard extends Component {
  render() {
    const headerOptions = [{ label: 'Refresh' }]
    return (
      <Card className="profile-card">
        <CardHeader title="PROFILE">
          <CardOptionsDropdown options={headerOptions} />
          <div className="profile-image-circle">
            <img
              className="img-fluid"
              alt=""
              src="https://api.adorable.io/avatars/256/nanu@adorable.io.png"
            />
          </div>
        </CardHeader>
        <CardBody>
          <ProfileCardContent />
          <div className="flex-1" />
          <button className="btn btn-primary btn-profile-edit btn-block">
            EDIT
          </button>
        </CardBody>
      </Card>
    )
  }
}
