import React, { Component } from 'react'

import MyGroups from './MyGroups'
import JoinedGroups from './JoinedGroups'
import SubscribedGroups from './SubscribedGroups'
import MyApps from './MyApps'
import MyAds from './MyAds'
import SwipeableCard from 'components/ui/SwipeableCard';

const CARD_TABS = [
  { label: 'My Groups' },
  { label: 'Joined Groups' },
  { label: 'Subscribed Groups' },
  { label: 'My Apps' },
  { label: 'My Ads' }
]
export default class MySelectionCard extends Component {
  state = {
    searchValue: ''
  }

  onSearchValueChange = e => {
    const searchValue = e.target.value
    this.setState({ searchValue })
  }
  onSearchIconClick = () => {
    console.log('searching with: ', this.state.searchValue)
  }
  render() {
    return (
      <SwipeableCard
        className='my-selection-card'
        headerTitle='MY SELECTION'
        hasSearch
        searchPlaceholder='Search Here'
        searchValue={this.state.searchValue}
        onSearchChange={this.onSearchValueChange}
        onSearchIconClick={this.onSearchIconClick}
        tabs={CARD_TABS}>
        <MyGroups />
        <JoinedGroups />
        <SubscribedGroups />
        <MyApps />
        <MyAds />
      </SwipeableCard>
    )
  }
}
