import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
  Card,
  CardHeader,
  CardHeaderTabs,
  CardOptionsDropdown,
  CardBody
} from 'components/ui/CardWithTabs'

import ProfileImages from './ProfileImages'
import HeaderImages from './HeaderImages'
import MyPhotos from './MyPhotos'
import MyDocuments from './MyDocuments'
import Community from './Community'
import SharedDocs from './SharedDocs'

const DOCUMENT_CARD_HEADER_OPTIONS = [{ label: 'Refresh' }]
const DOCUMENT_CARD_TABS = [
  { label: 'Profile Images' },
  { label: 'Header Images' },
  { label: 'My Photos' },
  { label: 'My Documents' },
  { label: 'Community' },
  { label: 'Shared Docs' }
]
export default class DocumentsCard extends Component {
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
      <Card className="documents-card">
        <CardHeader title="DOCUMENTS">
          <CardOptionsDropdown options={DOCUMENT_CARD_HEADER_OPTIONS} />
          <CardHeaderTabs
            onTabClick={this.onTabClick}
            selectedIndex={this.state.selectedTabIndex}
            tabs={DOCUMENT_CARD_TABS}
          />
        </CardHeader>
        <CardBody>
          <SwipeableViews
            index={this.state.selectedTabIndex}
            onChangeIndex={this.changeSwipeIndex}>
            <ProfileImages />
            <HeaderImages />
            <MyPhotos />
            <MyDocuments />
            <Community />
            <SharedDocs />
          </SwipeableViews>
        </CardBody>
      </Card>
    )
  }
}
