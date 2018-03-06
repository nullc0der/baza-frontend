import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardContent
} from 'components/ui/CardWithTabs'

export default class ReferencesCard extends Component {
  render() {
    return (
      <Card className="references-card">
        <CardHeader title="REFERENCES" subtitle="Following User Verified Me" />
        <CardBody>
          <CardContent>User to verify here</CardContent>
        </CardBody>
      </Card>
    )
  }
}
