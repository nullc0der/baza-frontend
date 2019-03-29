import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {
    Card,
    CardHeader,
    CardHeaderTabs,
    CardBody
} from 'components/ui/CardWithTabs'

import ProfileImages from './ProfileImages'
//import HeaderImages from './HeaderImages'
import MyPhotos from './MyPhotos'
import MyDocuments from './MyDocuments'
//import Community from './Community'
//import SharedDocs from './SharedDocs'

const DOCUMENT_CARD_TABS = [
    { label: 'Profile Images' },
    { label: 'My Photos' },
    { label: 'My Documents' }
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
            <Card className="documents-card" id="documents">
                <CardHeader title="DOCUMENTS">
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
                        <MyPhotos />
                        <MyDocuments />
                    </SwipeableViews>
                </CardBody>
            </Card>
        )
    }
}
