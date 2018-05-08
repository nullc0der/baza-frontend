import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardContent
} from 'components/ui/CardWithTabs'

const CONTACT_DETAILS = [
  { label: 'Phone Office', icon: 'fa-building', value: '9999999999' },
  { label: 'Phone Home', icon: 'fa-building', value: '9999999999' },
  { label: 'Phone Mobile', icon: 'fa-building', value: '9999999999' },
  { label: 'Phone Emergency', icon: 'fa-building', value: '9999999999' }
]

const ACTIVITIES_DETAILS = [
  { label: 'Activation Date', icon: 'fa-building', value: '22 Mar 2016' },
  { label: 'References', icon: 'fa-building', value: '1' }
]

export default class DetailsCard extends Component {
  renderOneDetailItem = (detail, index) => {
    return (
      <div className="detail-item" key={index}>
        <div className="label">
          <i className={`fa ${detail.icon}`} />
          <span className="ml-1">{detail.label}</span>
        </div>
        <div className="value">{detail.value}</div>
      </div>
    )
  }

  render() {
    return (
      <Card className="details-card">
        <CardHeader title="DETAILS" subtitle="" />
        <CardBody>
          <CardContent>
            <div className="details-section">
              <div className="title">CONTACT</div>
              <div className="details-list ml-1">
                {CONTACT_DETAILS.map(this.renderOneDetailItem)}
              </div>
            </div>
            <div className="details-section mt-2">
              <div className="title">ACTIVITIES</div>
              <div className="details-list ml-1">
                {ACTIVITIES_DETAILS.map(this.renderOneDetailItem)}
              </div>
            </div>
          </CardContent>
        </CardBody>
      </Card>
    )
  }
}
