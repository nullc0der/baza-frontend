import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
  Card,
  CardHeader,
  CardHeaderTabs,
  CardOptionsDropdown,
  CardBody
} from 'components/ui/CardWithTabs'

import SocialSettings from './SocialSettings'
import PublicVisibility from './PublicVisibility'
import LandingDropdownLinks from './LandingDropdownLinks'

const HEADER_OPTIONS = [{ label: 'Refresh' }]
const CARD_TABS = [
  { label: 'Social Settings' },
  { label: 'Public Visibility' },
  { label: 'Landing Dropdown Links' }
]
export default class SettingsCard extends Component {
  state = {
    selectedTabIndex: 0
  }
  onTabClick = (tab, selectedTabIndex) => {
    this.setState({ selectedTabIndex })
  }
  changeSwipeIndex = selectedTabIndex => {
    this.setState({ selectedTabIndex })
  }
  render() {
    return (
      <Card className="settings-card">
        <CardHeader title="SETTINGS">
          <CardOptionsDropdown options={HEADER_OPTIONS} />
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
            <SocialSettings />
            <PublicVisibility />
            <LandingDropdownLinks />
          </SwipeableViews>
        </CardBody>
      </Card>
    )
  }
}