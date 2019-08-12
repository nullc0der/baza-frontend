import React, { Component } from 'react'

import DistributionSignupInfoCard from './DistributionSignupInfoCard'

class ContactDetails extends Component {
    render() {
        const { contactDetails } = this.props
        return (
            <DistributionSignupInfoCard
                title="Contact Details"
                className="contact-details">
                <div className="text-box">
                    <div className="title">Email</div>
                    <div className="content-with-badge">
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
