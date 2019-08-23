import React, { Component } from 'react'

import DistributionSignupInfoCard from './DistributionSignupInfoCard'

class ContactDetails extends Component {
    render() {
        const {
            contactDetails,
            editMode,
            selectedDataTypes,
            selectedDataSubtypes,
            editSelectedDataTypes,
            editSelectedDataSubtypes
        } = this.props
        return (
            <DistributionSignupInfoCard
                title="Contact Details"
                className="contact-details"
                editMode={editMode}
                editSelectedDataTypes={() =>
                    editSelectedDataTypes('contacts', ['email', 'phone'])
                }
                inputChecked={selectedDataTypes.indexOf('contacts') > -1}>
                <div className="text-box">
                    <div className="title">Email</div>
                    <div className="content-with-badge">
                        {!!editMode && (
                            <input
                                className="checkbox mr-1"
                                type="checkbox"
                                checked={
                                    selectedDataSubtypes.indexOf('email') > -1
                                }
                                onChange={() =>
                                    editSelectedDataSubtypes('contacts', 'email')
                                }
                            />
                        )}
                        <div className="content">
                            {contactDetails.email ||
                                'No email ID submitted by user while signing up'}
                        </div>
                        {contactDetails.email ? (
                            <span className="badge badge-success">
                                Verified
                            </span>
                        ) : (
                            <span className="badge badge-danger">Skipped</span>
                        )}
                    </div>
                </div>
                <div className="text-box mt-2">
                    <div className="title">Phone</div>
                    <div className="content-with-badge">
                        {!!editMode && (
                            <input
                                className="checkbox mr-1"
                                type="checkbox"
                                checked={
                                    selectedDataSubtypes.indexOf('phone') > -1
                                }
                                onChange={() =>
                                    editSelectedDataSubtypes('contacts', 'phone')
                                }
                            />
                        )}
                        <div className="content">
                            {contactDetails.phone_number ||
                                'No phone number submitted by user while signing up'}
                        </div>
                        {contactDetails.phone_number ? (
                            <span className="badge badge-success">
                                Verified
                            </span>
                        ) : (
                            <span className="badge badge-danger">Skipped</span>
                        )}
                    </div>
                </div>
                {contactDetails.email_used_before && (
                    <div className="alert alert-danger mt-2">
                        Autosignup: This email ID was used by another user in
                        signup process
                    </div>
                )}
                {contactDetails.phone_used_before && (
                    <div className="alert alert-danger">
                        Autosignup: This phone number was used by another user
                        in signup process
                    </div>
                )}
            </DistributionSignupInfoCard>
        )
    }
}

export default ContactDetails
