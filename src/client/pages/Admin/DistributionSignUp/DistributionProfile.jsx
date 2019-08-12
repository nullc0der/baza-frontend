import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'components/ui/CardWithTabs'

import EditBar from './EditBar'
import ContactDetails from './ContactDetails'
import AddressDetails from './AddressDetails'
import Documents from './Documents'
import OtherInfo from './OtherInfo'

class DistributionProfileCard extends Component {
    render() {
        const { distributionProfile } = this.props
        return (
            <Card
                className="distribution-profile-card"
                id="applicationProfileCard">
                <CardHeader title="Application Profile" />
                <CardBody>
                    <div className="row">
                        <div className="col-md-12">
                            <EditBar />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <ContactDetails
                                contactDetails={
                                    distributionProfile.contact_data
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <AddressDetails
                                addressDetails={
                                    distributionProfile.address_data
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <Documents
                                document={
                                    distributionProfile.additional_data.photo
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <OtherInfo
                                otherInfo={distributionProfile.additional_data}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default DistributionProfileCard
