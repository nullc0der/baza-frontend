import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
  Card,
  CardHeader,
  CardHeaderTabs,
  CardSearchBar,
  CardBody
} from 'components/ui/CardWithTabs'

import MyGroups from './MyGroups'
import JoinedGroups from './JoinedGroups'
import SubscribedGroups from './SubscribedGroups'
import MyApps from './MyApps'
import MyAds from './MyAds'

const CARD_TABS = [
  { label: 'My Groups' },
  { label: 'Joined Groups' },
  { label: 'Subscribed Groups' },
  { label: 'My Apps' },
  { label: 'My Ads' }
]
export default class MySelectionCard extends Component {
  state = {
    selectedTabIndex: 0,
    searchValue: ''
  }

  onSearchValueChange = e => {
    const searchValue = e.target.value
    this.setState({ searchValue })
  }
  onSearchIconClick = () => {
    console.log('searching with: ', this.state.searchValue)
  }

  onTabClick = (tab, selectedTabIndex) => {
    this.setState({ selectedTabIndex })
  }
  changeSwipeIndex = selectedTabIndex => {
    this.setState({ selectedTabIndex })
  }
  render() {
    return (
      <Card className="my-selection-card">
        <CardHeader title="MY SELECTION">
          <CardSearchBar
            placeholder="Search Here"
            value={this.state.searchValue}
            onChange={this.onSearchValueChange}
            onSearchClick={this.onSearchIconClick}
          />
          <CardHeaderTabs
            onTabClick={this.onTabClick}
            selectedIndex={this.state.selectedTabIndex}
            tabs={CARD_TABS}
          />
        </CardHeader>
        <CardBody>
          <SwipeableViews
            index={this.state.selectedTabIndex}
            onChangeIndex={this.changeSwipeIndex}>
            <MyGroups />
            <JoinedGroups />
            <SubscribedGroups />
            <MyApps />
            <MyAds />
          </SwipeableViews>
        </CardBody>
      </Card>
    )
  }
}
