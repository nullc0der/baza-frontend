import React, { Component } from 'react'
import { CardContent } from 'components/ui/CardWithTabs'

const GROUPS_LIST = [
  {
    name: 'Group Name',
    category: 'Group Category',
    image: 'https://api.adorable.io/avatars/512/nanu1@adorable.io.png'
  },
  {
    name: 'Group Name',
    category: 'Group Category',
    image: 'https://api.adorable.io/avatars/512/nanu2@adorable.io.png'
  },
  {
    name: 'Group Name',
    category: 'Group Category',
    image: 'https://api.adorable.io/avatars/512/nanu3@adorable.io.png'
  },
  {
    name: 'Group Name',
    category: 'Group Category',
    image: 'https://api.adorable.io/avatars/512/nanu4@adorable.io.png'
  }
]

const GroupItem = props => (
  <div className="group-item">
    <div className="group-image">
      <img className="img-fluid" alt="" src={props.image} />
    </div>
    <div className="group-details flex-vertical">
      <div className="group-name">{props.name}</div>
      <div className="group-category flex-1">{props.category}</div>
      <div className="group-delete-btn">
        <i className="fa fa-trash" />
      </div>
    </div>
  </div>
)

export default class MyGroups extends Component {
  render() {
    return (
      <CardContent className="my-groups-content">
        <div className="groups-list">
          {GROUPS_LIST.map((group, index) => (
            <GroupItem
              key={index}
              image={group.image}
              name={group.name}
              category={group.category}
            />
          ))}
        </div>
      </CardContent>
    )
  }
}
