import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody
} from 'components/ui/CardWithTabs'

const REFERENCES_LIST = [
  {
    image: 'https://api.adorable.io/avatars/256/nanu1@adorable.io.png',
    name: 'reference1'
  },
  {
    image: 'https://api.adorable.io/avatars/256/nanu2@adorable.io.png',
    name: 'reference2'
  },
  {
    image: 'https://api.adorable.io/avatars/256/nanu3@adorable.io.png',
    name: 'reference3'
  },
  {
    image: 'https://api.adorable.io/avatars/256/nanu4@adorable.io.png',
    name: 'reference4'
  },
  {
    image: 'https://api.adorable.io/avatars/256/nanu5@adorable.io.png',
    name: 'reference5'
  },
  {
    image: 'https://api.adorable.io/avatars/256/nanu6@adorable.io.png',
    name: 'reference6'
  },
  {
    image: 'https://api.adorable.io/avatars/256/nanu7@adorable.io.png',
    name: 'reference7'
  }
]

export default class ReferencesCard extends Component {
  render() {
    return (
      <Card className="references-card">
        <CardHeader title="NETWORK" subtitle="My Connections" />
        <CardBody>
          <div className="references-list">
            {REFERENCES_LIST.map((reference, index) => (
              <div className="reference-item" key={index}>
                <div className="reference-image">
                  <img className="img-fluid" alt="" src={reference.image} />
                </div>
                <div className="reference-name">{reference.name}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    )
  }
}
