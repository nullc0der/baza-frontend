import React, { Fragment } from 'react'
import TextField from 'components/ui/TextField'

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
            <TextField
                id="phoneNumber"
                label="Phone no."
                className="mb-3"
                icon={<i className="material-icons">phone</i>}
                onChange={props.onInputChange}
                value={props.values.phoneNumber}
                errorState={props.errors.phoneNumber}
            />
        </Fragment>
    )
}

export default ContactInformation
