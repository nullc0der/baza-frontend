import React from 'react'
import { CardContent } from 'components/ui/CardWithTabs'

const ProfileDetail = props => (
  <div className={`profile-detail ${props.className}`}>
    <div className="label">{props.label}</div>
    <div className="value">{props.value}</div>
  </div>
)

const ProfileCardContent = props => {
  return (
    <CardContent>
      <div className="row mt-2">
        <div className="col-md-6">
          <ProfileDetail label="Name" value="Sharad Kant Cobain" />
        </div>
        <div className="col-md-6">
          <ProfileDetail
            label="Username"
            value="sharad_kant"
            className="text-right"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6">
          <ProfileDetail label="Gender" value="Male" />
        </div>
        <div className="col-md-6">
          <ProfileDetail
            label="Community"
            value="Ekata Social"
            className="text-right"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <ProfileDetail
            label="About Me"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6">
          <ProfileDetail label="Website" value="https://sharadkant.com" />
        </div>
        <div className="col-md-6">
          <ProfileDetail
            label="Location"
            value="New Delhi, India"
            className="text-right"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <img
            className="img-fluid profile-location-map"
            alt="Location"
            src="https://maps.googleapis.com/maps/api/staticmap?center=Albany,+NY&zoom=13&scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true"
          />
        </div>
      </div>
    </CardContent>
  )
}

export default ProfileCardContent
