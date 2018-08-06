import React, { Fragment } from 'react'
import TextField from 'components/ui/TextField'
import PhoneNumberField from 'components/ui/PhoneNumberField'

const ContactInformation = props => {
    return (
        <Fragment>
            <p className="font-weight-bold mb-3">Your Details</p>
            <TextField
                id="name"
                label="Your Name"
                className="mb-3"
                icon={<i className="material-icons">perm_identity</i>}
                onChange={props.onInputChange}
                value={props.values.name}
                errorState={props.errors.name}
            />
            <TextField
                id="email"
                label="Email"
                className="mb-3"
                icon={<i className="material-icons">mail_outline</i>}
                onChange={props.onInputChange}
                value={props.values.email}
                errorState={props.errors.email}
            />
            <PhoneNumberField
                className="phone-number-field mb-3"
                onChange={props.onInputChange}
                errorState={props.errors.phoneNumber}
            />
        </Fragment>
    )
}

export default ContactInformation
